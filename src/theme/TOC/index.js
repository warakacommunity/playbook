import React, { useState, useEffect } from "react";
import TOC from "@theme-original/TOC";
import ReactDOM from "react-dom";
import { StructureEditorContent } from "@site/src/components/StructureEditor";

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
          onClick={() => setEditorOpen(true)}
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
