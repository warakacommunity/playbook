#!/usr/bin/env node
// Injects / refreshes `last_update: { date, author }` frontmatter in every
// docs/*.md and docs/*.mdx so Docusaurus's "Last updated" footer shows real
// data instead of its "Oct 14, 2018 by Author (Simulated during dev for
// better perf)" dev-mode placeholder.
//
// Author is ALWAYS taken from `git log -1 --format=%an` on the specific file
// (falls back to FALLBACK_AUTHOR if git returns nothing). This keeps
// attribution honest: whoever last committed the file is credited by name.
//
// Date priority:
//   1. `*Last reviewed: YYYY-MM-DD*` line in the first 30 lines of the body
//      (author-set, authoritative for editorial freshness).
//   2. `git log -1 --format=%cs` on the file.
//   3. FALLBACK_DATE.
//
// The script REFRESHES the last_update block on every run (overwrites the
// existing one) so the footer stays in sync with the most recent commit.
// Wired as `prestart` and `prebuild` in package.json.

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

// Strip an existing top-level `last_update:` block (the key line itself
// plus every indented child line following it), AND any orphan
// `  date: ...` / `  author: ...` lines left behind by a previous buggy
// pass (those two keys are only meaningful as children of `last_update:`,
// so at indented top-of-frontmatter position they're always garbage).
// Line-based rather than regex-based, so a missing trailing newline on
// the final indented line doesn't leave junk behind.
function stripExistingLastUpdate(frontmatter) {
  const lines = frontmatter.split(/\r?\n/);
  const out = [];
  let inBlock = false;
  for (const line of lines) {
    if (inBlock) {
      if (/^[ \t]+/.test(line)) continue; // indented child — drop
      inBlock = false;
    }
    if (/^last_update\s*:/.test(line)) {
      inBlock = true;
      continue;
    }
    // Orphan indented date/author line (not under a live last_update block).
    if (/^[ \t]+(?:date|author)\s*:/.test(line)) continue;
    out.push(line);
  }
  return out.join("\n");
}

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

function serializeLastUpdate(date, author) {
  return `last_update:\n  date: ${date}\n  author: ${author}\n`;
}

async function processFile(file) {
  const raw = await fs.readFile(file, "utf8");
  const fmMatch = raw.match(FRONTMATTER_RE);
  const hasFm = Boolean(fmMatch);
  const frontmatter = hasFm ? fmMatch[1] : "";
  const rest = hasFm ? raw.slice(fmMatch[0].length) : raw;

  const reviewed = extractReviewedDate(rest);
  const gitInfo = gitLastUpdateFor(file);

  const date =
    reviewed || (gitInfo && gitInfo.date) || FALLBACK_DATE;
  const author = (gitInfo && gitInfo.author) || FALLBACK_AUTHOR;
  const source = reviewed
    ? gitInfo
      ? "reviewed+git-author"
      : "reviewed"
    : gitInfo
      ? "git"
      : "fallback";

  const block = serializeLastUpdate(date, author);

  // Strip any existing block, then append the fresh one.
  const strippedFm = stripExistingLastUpdate(frontmatter).replace(/\s+$/, "");
  const newFrontmatter = strippedFm ? `${strippedFm}\n${block}` : block;
  const newRaw = `---\n${newFrontmatter}---\n${rest}`;

  if (newRaw === raw) return { file, unchanged: true };
  await fs.writeFile(file, newRaw, "utf8");
  return { file, updated: date, source };
}

async function main() {
  const files = await walk(DOCS_ROOT);
  let updated = 0;
  let unchanged = 0;
  const sourceCounts = new Map();
  for (const file of files) {
    const r = await processFile(file);
    if (r.updated) {
      updated += 1;
      sourceCounts.set(r.source, (sourceCounts.get(r.source) ?? 0) + 1);
    } else {
      unchanged += 1;
    }
  }
  const sourceSummary = Array.from(sourceCounts.entries())
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");
  console.log(
    `[inject-last-update] updated ${updated}${sourceSummary ? ` (${sourceSummary})` : ""} / unchanged ${unchanged}`,
  );
}

main().catch((err) => {
  console.error("[inject-last-update] failed:", err);
  process.exit(1);
});
