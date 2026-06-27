import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";
import Giscus from "@giscus/react";

// To activate Giscus:
// 1. Enable Discussions on the repo (Settings → General → Features → Discussions)
// 2. Install the giscus app: https://github.com/apps/giscus
// 3. Visit https://giscus.app and pick "warakacommunity/AfriPlaybook"
// 4. Copy the data-repo-id and data-category-id from the generated snippet
// 5. Paste them below in REPO_ID and CATEGORY_ID
const REPO = "warakacommunity/AfriPlaybook";
const REPO_ID = "R_kgDORJq3oQ";
const CATEGORY = "Comments";
const CATEGORY_ID = "DIC_kwDORJq3oc4C8EW7";

function CommentsImpl() {
  const { colorMode } = useColorMode();
  // Custom giscus themes (terracotta + Exo 2) hosted in /static, referenced by
  // absolute URL so the iframe can fetch them in dev and on the deployed site.
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const THEME_VERSION = "5"; // bump to bust the giscus theme CSS cache
  const theme =
    colorMode === "dark"
      ? `${origin}/giscus-dark.css?v=${THEME_VERSION}`
      : `${origin}/giscus-light.css?v=${THEME_VERSION}`;
  return (
    <Giscus
      repo={REPO}
      repoId={REPO_ID}
      category={CATEGORY}
      categoryId={CATEGORY_ID}
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme}
      lang="en"
      loading="lazy"
    />
  );
}

export default function Comments() {
  if (REPO_ID === "REPLACE_WITH_REPO_ID") {
    return null;
  }
  return (
    <div className="giscus-wrap">
      <div className="giscus-head">
        <span className="giscus-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </span>
        <div className="giscus-head-text">
          <h2 className="giscus-heading">Join the discussion</h2>
          <p className="giscus-sub">
            Spotted an error, have a question, or want to share what worked on a real
            project? Sign in with GitHub to add your voice — every thread lives in the
            open, powered by GitHub Discussions.
          </p>
        </div>
      </div>
      <div className="giscus-embed">
        <BrowserOnly fallback={<div className="giscus-loading">Loading discussion…</div>}>
          {() => <CommentsImpl />}
        </BrowserOnly>
      </div>
    </div>
  );
}
