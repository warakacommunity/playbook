import React from "react";
import Layout from "@theme-original/DocItem/Layout";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import Comments from "@site/src/components/Comments";

// The "Start Contributing Online" action lives at the top of the right-hand
// TOC rail (see src/theme/TOC). This wrapper adds two things on top of the
// original layout:
//   1. WIP mode — when a page's frontmatter has `wip: true` (injected by
//      scripts/mark-draft-chapters.sh for chapters that don't declare
//      `ready: true`), the body is replaced with an "in development"
//      placeholder so drafts stay visible in the sidebar without leaking
//      unfinished content to readers.
//   2. Comments — mounts giscus below the body on non-WIP pages.

function WipPlaceholder({ title }) {
  return (
    <article
      style={{
        padding: "3rem 1.5rem",
        maxWidth: "760px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "1.5rem",
          color: "var(--ifm-heading-color)",
        }}
      >
        {title || "Chapter"}
      </h1>
      <div
        role="note"
        aria-label="In development"
        style={{
          background: "linear-gradient(90deg, #fff4d6 0%, #ffe4a3 100%)",
          color: "#5a3d00",
          border: "1px solid #f0c860",
          borderRadius: 10,
          padding: "1.5rem 1.75rem",
          fontSize: "1.05rem",
          lineHeight: 1.55,
        }}
      >
        <div style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          🚧 In development
        </div>
        <p style={{ margin: 0 }}>
          This chapter is being written. It'll appear here once the authors are
          happy with it. Nothing to see yet — check the sidebar for chapters
          that are ready, or come back later.
        </p>
      </div>
    </article>
  );
}

export default function LayoutWrapper(props) {
  const { frontMatter, metadata } = useDoc();
  const isWip = frontMatter && frontMatter.wip === true;

  if (isWip) {
    return <WipPlaceholder title={frontMatter.title || metadata?.title} />;
  }

  return (
    <>
      <Layout {...props} />
      <Comments />
    </>
  );
}
