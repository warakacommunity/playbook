#!/usr/bin/env node
// Injects / refreshes `last_update: { date, author }` frontmatter in every
// docs/*.md and docs/*.mdx so Docusaurus's "Last updated" footer shows real
// data instead of its "Oct 14, 2018 by Author (Simulated during dev for
// better perf)" dev-mode placeholder.
//
// Author: kept from the existing front matter when present (never overwritten);
// otherwise `git log -1 --format=%aN` (mailmap-aware; see .mailmap), else FALLBACK_AUTHOR.
//
// Date rule: the date only changes when the page's content changes.
//   - content unchanged vs the committed (HEAD) version -> keep the existing date
//   - content changed -> today, or the page's `*Last reviewed: YYYY-MM-DD*` line
//     (first 30 lines of the body) when it has one
//   - not tracked yet (new or renamed) -> keep the date it declares, else today
// Only the body is compared; front-matter-only edits do not count as content changes.
//
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
      // --follow + -M100% + --diff-filter=AMC: follow the file across renames and
      // skip pure (100%) renames, so moving a page keeps its real author; a copy,
      // a new file or any content edit still counts as authorship.
      ["log", "-1", "--follow", "-M100%", "--diff-filter=AMC", "--format=%cs\x1f%aN", "--", rel],
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

const TODAY = new Date().toISOString().slice(0, 10);

// The committed (HEAD) version of a file, or null when it is not tracked yet.
function headVersion(absPath) {
  try {
    const rel = path.relative(REPO_ROOT, absPath).split(path.sep).join("/");
    return execFileSync("git", ["show", `HEAD:${rel}`], {
      cwd: REPO_ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

// A file's content for change detection: the body only (everything after the
// front matter), so front-matter-only edits (flags, comments, last_update) never
// move the date.
function contentOf(raw) {
  const m = raw.match(FRONTMATTER_RE);
  // Whitespace-only edits (blank lines, trailing spaces) do not count either.
  return (m ? raw.slice(m[0].length) : raw).replace(/\s+/g, " ").trim();
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

  // A file with no git history yet (new or renamed, not yet committed) keeps
  // whatever last_update it already declares instead of the fallback.
  const existing = {
    date: (frontmatter.match(/^last_update:\s*\n(?:[ \t]+.*\n)*?[ \t]+date:\s*(\S+)/m) || [])[1],
    author: (frontmatter.match(/^last_update:\s*\n(?:[ \t]+.*\n)*?[ \t]+author:\s*(.+?)\s*$/m) || [])[1],
  };
  // The date only moves when the page's body changes, compared with the
  // committed (HEAD) version (front-matter-only edits do not count):
  //   unchanged             -> keep the existing date
  //   changed               -> today (or the page's own "Last reviewed" date)
  //   new / not yet tracked -> keep the date it declares, else today
  const head = headVersion(file);
  const changed = head === null ? null : contentOf(head) !== contentOf(raw);
  const date = changed === false
    ? existing.date || (gitInfo && gitInfo.date) || FALLBACK_DATE
    : changed === true
      ? reviewed || TODAY
      : existing.date || reviewed || TODAY;
  // An author already declared in the front matter is never overwritten (chapter
  // credit stays with whoever it was given to); git only fills it in when missing.
  const author = existing.author || (gitInfo && gitInfo.author) || FALLBACK_AUTHOR;
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
