#!/usr/bin/env node
// sync-annotate-docs.mjs — pull the AfriAnnotate documentation into this
// repo so the playbook build can serve it as a second docs instance at
// /annotate, WITHOUT a separate GitHub build.
//
// This is a LOCAL developer tool, NOT a CI/build step: it reads from the
// sibling ../afriannotate checkout (absent in CI) and writes generated
// files that are committed to THIS repo. Re-run it whenever the upstream
// AfriAnnotate docs change, then commit the result.
//
// What it does, per source .md file under docs-site/docs:
//   1. Substitutes {{brandingVar}} placeholders using the upstream
//      branding.config.js (same source of truth the AfriAnnotate site
//      uses). Unknown / underscore-prefixed keys are left untouched, so
//      Label-Studio-style {{template}} tokens inside code blocks survive.
//   2. Rewrites site-absolute references so they live under the second
//      instance: /img/… -> /annotate-assets/img/…  and every other
//      /internal-doc-path -> /annotate/internal-doc-path.
//   3. Forces `format: md` in the frontmatter so the pages parse as
//      CommonMark (they were authored for Docusaurus `format: md`; the
//      playbook build otherwise defaults to MDX and would choke on raw
//      HTML and stray braces).
//   4. Gives the intro page `slug: /` so /annotate is a real landing route.
// Category files (_category_.json) are brand-substituted too. The upstream
// static/img tree is copied verbatim to static/annotate-assets/img.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SRC_ROOT = path.resolve(REPO_ROOT, "../afriannotate/docs-site");
const SRC_DOCS = path.join(SRC_ROOT, "docs");
const SRC_IMG = path.join(SRC_ROOT, "static", "img");
const BRANDING = path.join(SRC_ROOT, "branding.config.js");

const DEST_DOCS = path.join(REPO_ROOT, "annotate");
const DEST_IMG = path.join(REPO_ROOT, "static", "annotate-assets", "img");

// The landing page (gets slug: /) — relative to SRC_DOCS.
const INTRO_REL = path.join("intro", "index.md");

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

if (!fs.existsSync(SRC_DOCS)) {
  fail(
    `AfriAnnotate source not found at ${SRC_DOCS}.\n` +
      `  Clone/checkout the afriannotate repo as a sibling of this one:\n` +
      `  ${path.resolve(REPO_ROOT, "..")}/afriannotate`,
  );
}

const branding = (await import(pathToFileURL(BRANDING).href)).default;

// ── text transforms ─────────────────────────────────────────────────
function substituteBranding(text) {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key.startsWith("_")) return match;
    const v = branding[key];
    return v === undefined ? match : String(v);
  });
}

// Rewrite one site-absolute path ("/foo/bar") into its /annotate home.
function rewriteAbsolutePath(p) {
  if (p.startsWith("/img/")) return "/annotate-assets/img/" + p.slice("/img/".length);
  // /blog is the playbook's blog (the annotate release-notes blog isn't
  // ported) — leave it pointing there rather than /annotate/blog.
  if (p === "/blog" || p.startsWith("/blog/") || p.startsWith("/blog#")) return p;
  if (p.startsWith("/annotate/") || p.startsWith("/annotate-assets/")) return p;
  return "/annotate" + p;
}

// Resolve a relative doc link (./x, ../x, x) against the SOURCE FILE's
// position in the docs tree and return an absolute /annotate/… link. This
// is necessary because the ported pages were authored for routeBasePath
// "/", where a leading "../" was clamped at the site root; under /annotate
// those same links overclimb. Filesystem-based resolution yields the intended
// target regardless of the URL depth quirks. Returns null when the link
// climbs above the docs root (left untouched for the caller).
function resolveRelativeLink(sourceRel, target) {
  const cut = target.search(/[#?]/);
  const pathPart = cut === -1 ? target : target.slice(0, cut);
  const suffix = cut === -1 ? "" : target.slice(cut);
  if (!pathPart) return null; // pure #anchor / ?query
  const clean = pathPart.replace(/\.mdx?$/, "");
  const dir = path.posix.dirname(sourceRel.split(path.sep).join("/"));
  let resolved = path.posix.normalize(path.posix.join(dir === "." ? "" : dir, clean));
  if (resolved.startsWith("..")) return null;
  resolved = resolved.replace(/\/index$/, ""); // folder index → clean route
  return "/annotate/" + resolved + suffix;
}

// Convert raw-HTML <img>/<a> tags to Markdown equivalents. Docusaurus only
// applies the deploy baseUrl (e.g. /playbook/) to Markdown images (via its
// transformImage plugin) and Markdown links (via <Link>) — raw HTML tags pass
// through verbatim, so a hard-coded /annotate-assets/… src would 404 on the
// GitHub Pages sub-path deploy. Converting them lets baseUrl resolution kick
// in. Cosmetic attributes (class/style/centering wrappers) are dropped; a
// working image beats a styled broken one. Runs BEFORE link rewriting so the
// resulting Markdown paths are normalized like every other link.
function rawHtmlMediaToMarkdown(text) {
  // <img …> → ![alt](src)   (alt falls back to title, then empty)
  text = text.replace(/<img\b[^>]*?\/?>/gi, (tag) => {
    const src = (tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (!src) return tag;
    const alt =
      (tag.match(/\balt\s*=\s*["']([^"']*)["']/i) || [])[1] ??
      (tag.match(/\btitle\s*=\s*["']([^"']*)["']/i) || [])[1] ??
      "";
    return `![${alt}](${src})`;
  });
  // Unwrap a centering <div>…</div> that now holds only a Markdown image, and
  // put it on its own line so CommonMark parses the image (HTML blocks don't
  // parse Markdown inside).
  text = text.replace(
    /<div[^>]*>\s*(!\[[^\]]*\]\([^)]*\))\s*<\/div>/gi,
    "\n\n$1\n\n",
  );
  // <a href="…">label</a> → [label](href)
  text = text.replace(
    /<a\b[^>]*?\bhref\s*=\s*["']([^"']+)["'][^>]*?>([\s\S]*?)<\/a>/gi,
    (m, href, label) => `[${label.replace(/\s+/g, " ").trim()}](${href})`,
  );
  return text;
}

function rewriteLinks(text, sourceRel) {
  // Markdown links and images: [label](target) and ![alt](target).
  text = text.replace(
    /(!?)\[([^\]]*)\]\(([^)]+)\)/g,
    (m, bang, label, inner) => {
      const mt = inner.match(/^(\S+)(\s+.*)?$/); // url + optional "title"
      if (!mt) return m;
      const url = mt[1];
      const rest = mt[2] || "";
      const isImage = bang === "!";
      let newUrl;
      if (/^(https?:|mailto:|tel:|ftp:|#)/.test(url) || url.startsWith("//")) {
        newUrl = url; // external / anchor
      } else if (url.startsWith("/")) {
        newUrl = rewriteAbsolutePath(url); // site-absolute (covers /img images)
      } else if (isImage) {
        newUrl = url; // relative image — leave (colocated or already broken)
      } else {
        newUrl = resolveRelativeLink(sourceRel, url) ?? url; // relative doc link
      }
      return `${bang}[${label}](${newUrl}${rest})`;
    },
  );
  // Raw-HTML src / href attributes pointing at site-absolute paths.
  text = text.replace(/\b(src|href)="(\/[^"]*)"/g, (m, attr, p) => `${attr}="${rewriteAbsolutePath(p)}"`);
  return text;
}

// Force CommonMark parsing via the `mdx.format` frontmatter key (Docusaurus
// reads the format override from frontMatter.mdx.format, NOT a top-level
// `format:` field). This lets the ported pages keep raw HTML (<br>, <div>,
// <university@…>) and stray braces without tripping the MDX/JSX compiler.
function ensureFormatMd(text, rel) {
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  const isIntro = rel === INTRO_REL;
  const mdxBlock = "mdx:\n  format: md";
  if (!fm) {
    // No frontmatter — add one.
    const extra = isIntro ? `${mdxBlock}\nslug: /\n` : `${mdxBlock}\n`;
    return `---\n${extra}---\n\n${text}`;
  }
  let body = fm[1];
  if (!/^mdx:/m.test(body)) body += `\n${mdxBlock}`;
  if (isIntro && !/^slug:/m.test(body)) body += "\nslug: /";
  return text.replace(/^---\n[\s\S]*?\n---/, `---\n${body}\n---`);
}

function transformMarkdown(text, rel) {
  let out = substituteBranding(text);
  out = rawHtmlMediaToMarkdown(out);
  out = rewriteLinks(out, rel);
  out = ensureFormatMd(out, rel);
  return out;
}

// ── fs helpers ──────────────────────────────────────────────────────
function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

let counts = { md: 0, category: 0, other: 0, img: 0 };

function walkDocs(dir, relBase = "") {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.join(relBase, entry.name);
    const dest = path.join(DEST_DOCS, rel);
    if (entry.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      walkDocs(abs, rel);
    } else if (entry.name.endsWith(".md")) {
      const src = fs.readFileSync(abs, "utf8");
      fs.writeFileSync(dest, transformMarkdown(src, rel));
      counts.md++;
    } else if (entry.name === "_category_.json") {
      fs.writeFileSync(dest, substituteBranding(fs.readFileSync(abs, "utf8")));
      counts.category++;
    } else {
      // Colocated asset (rare) — copy verbatim.
      fs.copyFileSync(abs, dest);
      counts.other++;
    }
  }
}

function copyImages(dir, relBase = "") {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.join(relBase, entry.name);
    const dest = path.join(DEST_IMG, rel);
    // Resolve symlinks (upstream symlinks img/templates into the app tree)
    // so we get real files, and recurse into real directories. Some upstream
    // symlinks are dangling — skip them rather than crash.
    let st;
    try {
      st = fs.statSync(abs);
    } catch {
      console.warn(`  ⚠ skipping unresolvable ${path.relative(SRC_ROOT, abs)}`);
      continue;
    }
    if (st.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });
      copyImages(abs, rel);
    } else {
      fs.copyFileSync(abs, dest);
      counts.img++;
    }
  }
}

// ── run ─────────────────────────────────────────────────────────────
console.log(`→ Source: ${SRC_DOCS}`);
rmrf(DEST_DOCS);
rmrf(path.dirname(DEST_IMG)); // static/annotate-assets
fs.mkdirSync(DEST_DOCS, { recursive: true });
fs.mkdirSync(DEST_IMG, { recursive: true });

walkDocs(SRC_DOCS);
copyImages(SRC_IMG);

// Generation marker (plain .txt so Docusaurus never turns it into a route —
// a README.md/index.md here would collide with the intro page's slug: /).
fs.writeFileSync(
  path.join(DEST_DOCS, "GENERATED.txt"),
  "GENERATED — do not edit by hand.\n\n" +
    "These docs are produced by scripts/sync-annotate-docs.mjs from the\n" +
    "sibling ../afriannotate/docs-site/docs checkout. Edit the source there\n" +
    "and re-run the sync script, then commit the result.\n",
);

console.log(
  `✓ Synced ${counts.md} docs, ${counts.category} categories, ${counts.other} colocated assets, ${counts.img} images.`,
);
console.log(`  docs   → ${path.relative(REPO_ROOT, DEST_DOCS)}/`);
console.log(`  images → ${path.relative(REPO_ROOT, DEST_IMG)}/`);
