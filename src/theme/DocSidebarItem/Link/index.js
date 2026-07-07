import React from "react";
import Link from "@theme-original/DocSidebarItem/Link";
import { useDocById } from "@docusaurus/plugin-content-docs/client";

/**
 * Sidebar link swizzle — tags draft chapters with a subtle "draft"
 * pill so readers can tell at a glance which chapters are ready to
 * open and which are still in development.
 *
 * A chapter is treated as draft when its frontmatter contains
 * `wip: true` (injected by scripts/mark-draft-chapters.sh in CI for
 * every doc that doesn't declare `ready: true`).
 *
 * The check is defensive: sidebar items that are external links,
 * category headers, or unresolvable IDs all fall through to the
 * original Link with no pill.
 */
export default function LinkWrapper(props) {
  const docId = props.item?.docId;
  let isWip = false;

  if (docId) {
    try {
      const doc = useDocById(docId);
      isWip = doc?.frontMatter?.wip === true;
    } catch {
      // Item isn't a resolvable doc — leave isWip false.
    }
  }

  if (!isWip) {
    return <Link {...props} />;
  }

  return (
    <div
      className="playbook-sidebar-draft"
      style={{ position: "relative", opacity: 0.65 }}
    >
      <Link {...props} />
      <span
        aria-label="Draft chapter"
        title="In development"
        style={{
          position: "absolute",
          right: "0.85rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "0.6rem",
          padding: "0.1rem 0.4rem",
          background: "#fff4d6",
          color: "#8a5a00",
          border: "1px solid #f0c860",
          borderRadius: 3,
          fontWeight: 600,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
          pointerEvents: "none",
          lineHeight: 1.4,
        }}
      >
        draft
      </span>
    </div>
  );
}
