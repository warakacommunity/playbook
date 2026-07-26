import React, { useState, useEffect } from "react";
import TOC from "@theme-original/TOC";
import ReactDOM from "react-dom";
import { StructureEditorContent } from "@site/src/components/StructureEditor";

// The in-browser editor signs contributors in through a GitHub OAuth App, and
// an OAuth App permits exactly ONE authorization callback URL. The editor runs
// on the canonical playbook URL (waraka.org/playbook) or localhost (device
// flow, no callback). Any other mirror hands the contributor off to this URL
// with a ?contribute=1 flag that auto-opens the editor there.
const EDITOR_ORIGIN = "https://waraka.org";
const EDITOR_BASE = "/playbook";

function isEditorHost() {
  if (typeof window === "undefined") return false;
  return (
    window.location.origin === EDITOR_ORIGIN ||
    window.location.hostname === "localhost"
  );
}

// Adds the Contribute action (and, on template pages, a companion
// Download-as-PDF action) to the top of the right-hand table-of-contents
// column, so they sit with the page rail instead of breaking the flow
// above the article body.
//
// Template pages get BOTH buttons side by side in the same row so
// download + contribute live in the same visual affordance. Non-template
// pages get only Contribute.
function isTemplateOrRetrospective(pathname) {
  const path = (pathname || "").replace(/\/+$/, "");
  if (/\/templates\/[^/]+$/.test(path)) return true;
  if (/\/case-studies\/retrospective-template$/.test(path)) return true;
  return false;
}

export default function TOCWrapper(props) {
  const [editorOpen, setEditorOpen] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsTemplate(isTemplateOrRetrospective(window.location.pathname));
    update();
    // Docusaurus is an SPA — listen for history changes so the button
    // shows / hides correctly on client-side navigation without a page
    // reload.
    const patch = (name) => {
      const original = window.history[name];
      return function () {
        const result = original.apply(this, arguments);
        window.dispatchEvent(new Event("locationchange"));
        return result;
      };
    };
    window.history.pushState = patch("pushState");
    window.history.replaceState = patch("replaceState");
    window.addEventListener("popstate", update);
    window.addEventListener("locationchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("locationchange", update);
    };
  }, []);

  // Arriving via a hand-off link (waraka.org/playbook/…?contribute=1): open the
  // editor automatically so the round-trip from the mirror is seamless.
  useEffect(() => {
    if (!isEditorHost()) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("contribute") === "1") setEditorOpen(true);
  }, []);

  const handleContribute = () => {
    // On the editor host, open in place. On a mirror, redirect to the same
    // chapter on waraka.org/playbook, where GitHub sign-in works.
    if (isEditorHost()) {
      setEditorOpen(true);
      return;
    }
    const qs = window.location.search
      ? `${window.location.search}&contribute=1`
      : "?contribute=1";
    window.location.href = `${EDITOR_ORIGIN}${EDITOR_BASE}${window.location.pathname}${qs}`;
  };

  const handlePdf = () => {
    if (typeof window === "undefined") return;
    // Small delay so any hover state settles before the print dialog
    // steals focus.
    window.setTimeout(() => window.print(), 60);
  };

  return (
    <>
      <div className="toc-actions no-print">
        <button
          type="button"
          className="button button--primary button--sm toc-action-button"
          onClick={handleContribute}
        >
          Contribute
        </button>
        {isTemplate && (
          <button
            type="button"
            className="button button--outline button--sm toc-action-button toc-action-button--secondary"
            onClick={handlePdf}
            title="Save this template as a PDF via your browser's print dialog"
            aria-label="Download this template as PDF"
          >
            Download PDF
          </button>
        )}
      </div>
      <TOC {...props} />
      {editorOpen && typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <StructureEditorContent onClose={() => setEditorOpen(false)} />,
          document.body,
        )}
    </>
  );
}
