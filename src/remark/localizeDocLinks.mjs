// Remark plugin: turn relative links between chapters (../foo/bar.md#x) into
// site URLs (/foo/bar#x). Docusaurus prefixes the locale's base path itself.
//
// Why: Docusaurus resolves file-path links against the loaded doc set of the
// locale being built. With a partly translated site, that set mixes i18n/
// copies and English fallbacks, so a link from a translated page to an
// untranslated one (or the reverse) does not resolve and the build fails.
// URL links resolve regardless of which copy is served at that URL.
//
// The URL is derived by the same rules Docusaurus applies here: a `slug`
// frontmatter wins; otherwise strip numeric prefixes (2_data-collection ->
// data-collection), drop the extension, and map index files to their folder.
// scripts/translate-docs.mjs relies on this too.

import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";

const DOCS = "docs";
const I18N_RE = /^i18n\/([^/]+)\/docusaurus-plugin-content-docs\/current\//;

export function docUrl(docsRelPath) {
  const abs = path.join(DOCS, docsRelPath);
  let slug;
  try {
    const head = fs.readFileSync(abs, "utf8").slice(0, 2000);
    const fm = head.startsWith("---") ? head.split("\n---")[0] : "";
    slug = fm.match(/^slug:\s*(\S+)/m)?.[1];
  } catch {
    return null; // target file does not exist; leave the link alone
  }
  if (slug) return slug;
  const parts = docsRelPath.replace(/\.mdx?$/, "").split("/").map((p) => p.replace(/^\d+_/, ""));
  if (parts[parts.length - 1] === "index") {
    parts.pop();
    return parts.length ? `/${parts.join("/")}/` : "/";
  }
  return `/${parts.join("/")}`;
}

export default function localizeDocLinks() {
  return (tree, file) => {
    const rel = path.relative(process.cwd(), file.path).split(path.sep).join("/");
    const m = rel.match(I18N_RE);
    // Directory of this file expressed under docs/, whichever copy it is.
    const docsDir = path.posix.dirname(m ? rel.replace(I18N_RE, "") : rel.replace(/^docs\//, ""));
    if (!m && !rel.startsWith("docs/")) return;

    visit(tree, ["link", "definition"], (node) => {
      const mm = node.url.match(/^(?!https?:|\/|#|mailto:|pathname:)([^#?]+\.mdx?)(#.*)?$/);
      if (!mm) return;
      const target = path.posix.normalize(path.posix.join(docsDir, mm[1]));
      if (target.startsWith("..")) return;
      const url = docUrl(target);
      if (!url) return;
      node.url = url + (mm[2] || "");
    });
  };
}
