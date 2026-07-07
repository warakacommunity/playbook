#!/usr/bin/env node
// Injects `last_update: { date: "YYYY-MM-DD", author: "..." }` frontmatter
// into every docs/*.md and docs/*.mdx file so Docusaurus's "Last updated"
// footer shows real data instead of its "Oct 14, 2018 by Author (Simulated
// during dev for better perf)" dev-mode placeholder. Priority for the date:
//   1. `*Last reviewed: YYYY-MM-DD*` line in the first 30 lines of the body
//      (author-set, authoritative).
//   2. `git log -1 --format=%cs %an` on the file (repo-derived).
//   3. FALLBACK_DATE (never expected to trigger for tracked files).
// Runs idempotently — an existing `last_update` block is left alone. Wired
// as `prestart` and `prebuild` in package.json.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DOCS_ROOT = path.resolve(REPO_ROOT, "docs");
const FALLBACK_DATE = "2026-07-07";
const FALLBACK_AUTHOR = "AfriPlaybook contributors";

const REVIEWED_RE = /^\*Last reviewed:\s*(\d{4}-\d{2}-\d{2})\.?\*\s*$/m;
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

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

function gitLastUpdateFor(absPath) {
  try {
    const rel = path.relative(REPO_ROOT, absPath);
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cs\x1f%an", "--", rel],
      { cwd: REPO_ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (!out) return null;
    const [date, author] = out.split("\x1f");
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
    return { date, author: author || null };
  } catch {
    return null;
  }
}

async function processFile(file) {
  const raw = await fs.readFile(file, "utf8");
  const fmMatch = raw.match(FRONTMATTER_RE);
  const hasFm = Boolean(fmMatch);
  const frontmatter = hasFm ? fmMatch[1] : "";
  const rest = hasFm ? raw.slice(fmMatch[0].length) : raw;

  if (hasFm && hasLastUpdate(frontmatter)) {
    return { file, skipped: "already has last_update" };
  }

  const reviewed = extractReviewedDate(rest);
  const gitInfo = reviewed ? null : gitLastUpdateFor(file);

  const date =
    reviewed || (gitInfo && gitInfo.date) || FALLBACK_DATE;
  const author = (gitInfo && gitInfo.author) || FALLBACK_AUTHOR;
  const source = reviewed ? "reviewed" : gitInfo ? "git" : "fallback";

  const lastUpdateBlock = `last_update:\n  date: ${date}\n  author: ${author}\n`;

  const newFrontmatter = hasFm
    ? frontmatter.replace(/\s+$/, "") + `\n${lastUpdateBlock}`
    : lastUpdateBlock;
  const newRaw = `---\n${newFrontmatter}---\n${rest}`;

  await fs.writeFile(file, newRaw, "utf8");
  return { file, injected: date, source };
}

async function main() {
  const files = await walk(DOCS_ROOT);
  let injected = 0;
  let skipped = 0;
  const sourceCounts = new Map();
  for (const file of files) {
    const r = await processFile(file);
    if (r.injected) {
      injected += 1;
      sourceCounts.set(r.source, (sourceCounts.get(r.source) ?? 0) + 1);
    } else {
      skipped += 1;
    }
  }
  const sourceSummary = Array.from(sourceCounts.entries())
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");
  console.log(
    `[inject-last-update] injected ${injected}${sourceSummary ? ` (${sourceSummary})` : ""} / skipped ${skipped}`,
  );
}

main().catch((err) => {
  console.error("[inject-last-update] failed:", err);
  process.exit(1);
});
