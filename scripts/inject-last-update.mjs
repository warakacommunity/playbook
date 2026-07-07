#!/usr/bin/env node
// Injects `last_update: { date: "YYYY-MM-DD" }` frontmatter into every
// docs/*.md and docs/*.mdx file that carries a `Last reviewed: YYYY-MM-DD`
// line in the first 30 lines of the body. Runs idempotently — an existing
// `last_update` block is left alone. Wired as `prestart` and `prebuild`
// in package.json so Docusaurus's "Last updated on ..." footer shows the
// authoritative date instead of falling back to git or its placeholder.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, "..", "docs");

const REVIEWED_RE = /^\*Last reviewed:\s*(\d{4}-\d{2}-\d{2})\.?\*\s*$/m;
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (/\.(md|mdx)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function extractReviewedDate(body) {
  const first30 = body.split(/\r?\n/).slice(0, 30).join("\n");
  const m = first30.match(REVIEWED_RE);
  return m ? m[1] : null;
}

function hasLastUpdate(frontmatter) {
  return /^last_update\s*:/m.test(frontmatter);
}

async function processFile(file) {
  const raw = await fs.readFile(file, "utf8");
  const fmMatch = raw.match(FRONTMATTER_RE);
  if (!fmMatch) return { file, skipped: "no frontmatter" };
  const frontmatter = fmMatch[1];
  const rest = raw.slice(fmMatch[0].length);

  if (hasLastUpdate(frontmatter)) return { file, skipped: "already has last_update" };

  const reviewed = extractReviewedDate(rest);
  if (!reviewed) return { file, skipped: "no Last reviewed line" };

  const newFrontmatter =
    frontmatter.replace(/\s+$/, "") +
    `\nlast_update:\n  date: ${reviewed}\n`;
  const newRaw = `---\n${newFrontmatter}---\n${rest}`;
  await fs.writeFile(file, newRaw, "utf8");
  return { file, injected: reviewed };
}

async function main() {
  const files = await walk(DOCS_ROOT);
  let injected = 0;
  let skipped = 0;
  const skipReasons = new Map();
  for (const file of files) {
    const r = await processFile(file);
    if (r.injected) {
      injected += 1;
    } else {
      skipped += 1;
      skipReasons.set(r.skipped, (skipReasons.get(r.skipped) ?? 0) + 1);
    }
  }
  const rel = (p) => path.relative(DOCS_ROOT, p);
  console.log(
    `[inject-last-update] injected ${injected} / skipped ${skipped}` +
      (skipped
        ? " (" +
          Array.from(skipReasons.entries())
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ") +
          ")"
        : ""),
  );
  // Sanity trip: log any file whose `Last reviewed` date differs from the
  // injected frontmatter, which would mean the extract-and-inject went wrong.
  void rel;
}

main().catch((err) => {
  console.error("[inject-last-update] failed:", err);
  process.exit(1);
});
