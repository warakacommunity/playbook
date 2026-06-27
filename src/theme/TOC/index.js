import React, { useState } from "react";
import TOC from "@theme-original/TOC";
import ReactDOM from "react-dom";
import { StructureEditorContent } from "@site/src/components/StructureEditor";

// Adds the "Start Contributing Online" action to the top of the right-hand
// table-of-contents column, so it sits with the page rail instead of breaking
// the flow above the article body.
export default function TOCWrapper(props) {
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="button button--primary button--sm button--block"
        onClick={() => setEditorOpen(true)}
        style={{
          fontSize: "0.74rem",
          fontWeight: 600,
          padding: "0.4rem 0.7rem",
          marginBottom: "1rem",
        }}
      >
        Start Contributing Online
      </button>
      <TOC {...props} />
      {editorOpen && typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <StructureEditorContent onClose={() => setEditorOpen(false)} />,
          document.body,
        )}
    </>
  );
}
