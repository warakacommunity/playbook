import React, { useState } from "react";
import Layout from "@theme-original/DocItem/Layout";
import Comments from "@site/src/components/Comments";
import { StructureEditorContent } from "@site/src/components/StructureEditor";
import ReactDOM from "react-dom";

export default function LayoutWrapper(props) {
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <>
      <div style={{ marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
        <button
          type="button"
          className="button button--primary"
          onClick={() => setEditorOpen(true)}
          style={{ fontSize: "0.9rem", padding: "0.45rem 1rem" }}
        >
          ⚡ Start Contributing Online
        </button>
      </div>
      <Layout {...props} />
      <Comments />
      {editorOpen && typeof window !== "undefined" &&
        ReactDOM.createPortal(
          <StructureEditorContent onClose={() => setEditorOpen(false)} />,
          document.body,
        )
      }
    </>
  );
}
