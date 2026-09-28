#!/usr/bin/env node
// Machine-translate playbook chapters into i18n/<locale>/ for native review.
//
// Re-run safe: each translated file records a hash of the English source in
// its frontmatter (source_hash). A file is re-translated only when the English
// changed, or with --force. Output is marked translation_status: machine until
// a reviewer changes it to reviewed.
//
// Usage:
//   node scripts/translate-docs.mjs --locale ha [--tier 1 | --paths docs/a.md ...]
//   node scripts/translate-docs.mjs --locale ha,sw,am --tier 1 --dry-run
//   Options: --force  --concurrency 3  --model gemini-3.1-pro-preview
//
// Credentials: GEMINI_API_KEY (or GOOGLE_API_KEY) in the environment.
// Uses the Gemini REST API directly; no SDK.
//   --list-models   print the Gemini models this key can use, then exit

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import GithubSlugger from "github-slugger";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const LANG = { ha: "Hausa", sw: "Swahili (Kiswahili)", am: "Amharic (አማርኛ)", fr: "French", pt: "Portuguese" };

// Tier 1 = Foundations + templates + glossary. Later tiers add task chapters.
const TIERS = {
  1: [
    "docs/1_introduction",
    "docs/before-you-start",
    "docs/project-management",
    "docs/data-governance",
    "docs/2_data-collection",
    "docs/3_annotation-design",
    "docs/4_data-quality",
    "docs/10_community-collaboration",
    "docs/templates",
    "docs/glossary.md",
  ],
};

// Frontmatter keys whose values are prose and get translated.
const FM_TEXT_KEYS = ["title", "sidebar_label", "description"];

// ---------------------------------------------------------------- args
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
if (flag("list-models")) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?pageSize=100`, { headers: { "x-goog-api-key": (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "") } });
  const j = await r.json();
  for (const m of j.models || []) if ((m.supportedGenerationMethods || []).includes("generateContent")) console.log(m.name.replace("models/", ""));
  process.exit(0);
}

const locales = (opt("locale", "") || "").split(",").filter(Boolean);
if (!locales.length || locales.some((l) => !LANG[l])) {
  console.error(`--locale is required: one or more of ${Object.keys(LANG).join(", ")}`);
  process.exit(1);
}
const MODEL = opt("model", "gemini-3.1-pro-preview");
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const API = "https://generativelanguage.googleapis.com/v1beta";
const CONCURRENCY = Number(opt("concurrency", 3));
const DRY = flag("dry-run");
const FORCE = flag("force");


let files;
if (opt("paths")) {
  const i = argv.indexOf("--paths");
  files = argv.slice(i + 1).filter((a) => !a.startsWith("--"));
} else {
  const tier = TIERS[opt("tier", "1")];
  if (!tier) { console.error("Unknown tier"); process.exit(1); }
  files = tier.flatMap((p) => listDocs(path.join(root, p))).map((f) => path.relative(root, f));
}

function listDocs(p) {
  const st = fs.statSync(p);
  if (st.isFile()) return /\.mdx?$/.test(p) ? [p] : [];
  return fs.readdirSync(p).flatMap((c) => listDocs(path.join(p, c)));
}

// Relative images live next to the English source (docs/<chapter>/images/);
// the translated copy sits under i18n/, so point them back at docs/. Chapter
// links need no rewrite: src/remark/localizeDocLinks.mjs resolves them at build.
function relinkAssets(body, rel, locale) {
  const destDir = path.dirname(path.join("i18n", locale, "docusaurus-plugin-content-docs", "current", path.relative("docs", rel)));
  const srcDir = path.dirname(rel);
  body = body.replace(/(!\[[^\]]*\]\(|src=["'])(?!https?:|\/|pathname:|data:)([^)"'\s]+\.(?:png|jpe?g|gif|svg|webp|mp4|webm))/g, (m, pre, ref) => {
    const target = path.normalize(path.join(srcDir, ref));
    return fs.existsSync(path.join(root, target)) ? pre + path.relative(destDir, target) : m;
  });
  return body;
}

if (flag("relink")) {
  for (const l of locales) for (const rel of files) {
    const dest = path.join(root, "i18n", l, "docusaurus-plugin-content-docs", "current", path.relative("docs", rel));
    if (!fs.existsSync(dest)) continue;
    const cur = fs.readFileSync(dest, "utf8");
    const en = splitFrontmatter(fs.readFileSync(path.join(root, rel), "utf8")).body;
    const { fm: curFm, body: curBody } = splitFrontmatter(cur);
    const next = `---\n${curFm}\n---\n` + relinkAssets(keepAnchors(curBody, en), rel, l);
    if (next !== cur) { fs.writeFileSync(dest, next); console.log(`${l}  ${rel}  relinked`); }
  }
  process.exit(0);
}

if (!DRY && !API_KEY) { console.error("GEMINI_API_KEY (or GOOGLE_API_KEY) is not set"); process.exit(1); }

// ---------------------------------------------------------------- helpers
const sha = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 12);

function splitFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  return m ? { fm: m[1], body: src.slice(m[0].length) } : { fm: "", body: src };
}

// Structural fingerprint: what a translation must leave untouched.
function fingerprint(body) {
  return {
    code: body.match(/```[\s\S]*?```/g) || [],
    urls: (body.match(/https?:\/\/[^\s)>"']+/g) || []).sort(),
    imports: (body.match(/^import .*$/gm) || []).length,
    jsx: (body.match(/<[A-Z][A-Za-z]*/g) || []).length,
    headings: (body.match(/^#{1,6} /gm) || []).length,
    images: (body.match(/!\[[^\]]*\]\([^)]*\)/g) || []).length,
    // Admonition fences (:::note etc.) must survive.
    admonitions: (body.match(/^:::/gm) || []).length,
  };
}

function diffFingerprint(a, b) {
  const out = [];
  if (a.code.length !== b.code.length) out.push(`fenced code blocks: ${a.code.length} vs ${b.code.length}`);
  else a.code.forEach((c, i) => { if (c !== b.code[i]) out.push(`code block ${i + 1} was altered`); });
  if (a.urls.join("\n") !== b.urls.join("\n")) out.push("URLs changed");
  for (const k of ["imports", "jsx", "headings", "images", "admonitions"]) {
    if (a[k] !== b[k]) out.push(`${k}: ${a[k]} vs ${b[k]}`);
  }
  return out;
}

const SYSTEM = `You translate chapters of the AfriPlaybook, a practical guide to building datasets for African languages, from English into a target language. The readers are students, researchers, linguists, and community organisers. Write plainly, in the register a careful local-language newspaper or textbook would use.

Rules that must hold, or the translation is rejected by an automated check:
1. Return the whole document. Do not summarise, shorten, or add commentary.
2. Keep every Markdown and MDX structure exactly: heading levels, lists, tables, links, images, admonitions (:::note ... :::), import lines, and JSX components such as <ChapterMap /> with their props unchanged.
3. Copy fenced code blocks byte for byte. Do not translate code, comments inside code, JSON, YAML, or shell commands.
4. Keep every URL, file path, anchor, and image path unchanged. Translate link text, not link targets.
5. Keep these in English: product and project names (AfriPlaybook, Waraka, Masakhane, AfriAnnotate, Lanfrica, Hugging Face, GitHub, Zenodo, Label Studio), dataset names (MasakhaNER, AfriSenti, NaijaSenti, and similar), licence names (CC BY 4.0, MIT, NOODL), model and library names, and technical identifiers written in code font.
6. Translate technical terms consistently. On first use of a term whose local equivalent is uncommon, give the English in parentheses, for example "lakabi (annotation)". Use the same rendering every time afterwards.
7. Hausa: use standard Boko orthography with hooked letters (ɓ, ɗ, ƙ, ʼy). Amharic: write in Ge'ez script. Swahili: standard Kiswahili sanifu.
8. Keep the author's paragraphing. One English paragraph becomes one translated paragraph.

Input format: a FRONTMATTER section with YAML key: value lines to translate (values only, keep keys and quoting), then a BODY section. Output exactly the same two sections with the same markers, and nothing else.`;

function buildUser(lang, fmPairs, body) {
  const fmLines = fmPairs.map(([k, v]) => `${k}: ${v}`).join("\n") || "(none)";
  return `Target language: ${lang}\n\n===FRONTMATTER===\n${fmLines}\n===BODY===\n${body}`;
}

function parseOutput(text) {
  const m = text.match(/===FRONTMATTER===\n([\s\S]*?)\n?===BODY===\n([\s\S]*)$/);
  if (!m) throw new Error("output missing section markers");
  const fm = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^([a-z_]+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2];
  }
  return { fm, body: m[2].replace(/\s+$/, "") + "\n" };
}

// Translated headings get the English anchor ({#id}) so links such as
// ../foo.md#step-1 keep working in every locale. Headings are matched by order;
// the structure check guarantees the counts agree.
function keepAnchors(translated, english) {
  const slugger = new GithubSlugger();
  const enIds = [];
  let inCode = false;
  for (const line of english.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = line.match(/^(#{1,6})\s+(.*?)\s*(\{#([^}]+)\})?\s*$/);
    if (m) enIds.push(m[4] || slugger.slug(m[2].replace(/[*_`]/g, "")));
  }
  let i = 0; inCode = false;
  return translated.split("\n").map((line) => {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) return line;
    const m = line.match(/^(#{1,6})\s+(.*?)\s*(\{#[^}]+\})?\s*$/);
    if (!m) return line;
    const id = enIds[i++];
    return id ? `${m[1]} ${m[2]} {#${id}}` : line;
  }).join("\n");
}

// ---------------------------------------------------------------- translate one file
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callModel(lang, fmPairs, body, note) {
  const user = buildUser(lang, fmPairs, body) + (note ? `\n\nA previous attempt failed this check: ${note}. Fix that and return the full document again.` : "");
  const req = {
    systemInstruction: { parts: [{ text: SYSTEM }] },
    contents: [{ role: "user", parts: [{ text: user }] }],
    generationConfig: { temperature: 0.2, maxOutputTokens: 65536 },
    // Chapters on hate speech and content safety quote offensive examples on
    // purpose; the default filters block translating them.
    safetySettings: ["HARM_CATEGORY_HATE_SPEECH", "HARM_CATEGORY_HARASSMENT", "HARM_CATEGORY_SEXUALLY_EXPLICIT", "HARM_CATEGORY_DANGEROUS_CONTENT"]
      .map((category) => ({ category, threshold: "BLOCK_NONE" })),
  };
  for (let attempt = 0; ; attempt++) {
    let r;
    try {
      r = await fetch(`${API}/models/${MODEL}:generateContent`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-goog-api-key": API_KEY },
        body: JSON.stringify(req),
      });
    } catch (e) {
      // Network-level failure (DNS, reset, timeout): back off and retry.
      if (attempt < 6) { await sleep(3000 * 2 ** attempt); continue; }
      throw e;
    }
    if ((r.status === 429 || r.status >= 500) && attempt < 6) { await sleep(3000 * 2 ** attempt); continue; }
    if (!r.ok) throw new Error(`Gemini ${r.status}: ${(await r.text()).slice(0, 300)}`);
    const j = await r.json();
    const cand = j.candidates?.[0];
    if (!cand) throw new Error(`no candidate: ${JSON.stringify(j.promptFeedback || j).slice(0, 300)}`);
    if (cand.finishReason && cand.finishReason !== "STOP") throw new Error(`finishReason ${cand.finishReason}`);
    return (cand.content?.parts || []).map((p) => p.text || "").join("");
  }
}

async function translateFile(rel, locale) {
  const src = fs.readFileSync(path.join(root, rel), "utf8");
  const hash = sha(src);
  const dest = path.join(root, "i18n", locale, "docusaurus-plugin-content-docs", "current", path.relative("docs", rel));

  if (!FORCE && fs.existsSync(dest)) {
    const prev = fs.readFileSync(dest, "utf8");
    if (prev.includes(`source_hash: ${hash}`)) return "up to date";
  }
  if (DRY) return `would translate (${src.split(/\s+/).length} words)`;

  const { fm, body } = splitFrontmatter(src);
  const fmPairs = fm
    .split("\n")
    .map((l) => l.match(/^([a-z_]+):\s*(.+)$/))
    .filter((m) => m && FM_TEXT_KEYS.includes(m[1]))
    .map((m) => [m[1], m[2]]);

  const want = fingerprint(body);
  let out, problems = [];
  for (let attempt = 0; attempt < 2; attempt++) {
    const text = await callModel(LANG[locale], fmPairs, body, problems.join("; "));
    out = parseOutput(text);
    problems = diffFingerprint(want, fingerprint(out.body));
    if (!problems.length) break;
  }
  if (problems.length) throw new Error(`structure check failed: ${problems.join("; ")}`);

  // Rebuild frontmatter: translated text keys, plus provenance fields.
  let newFm = fm
    .split("\n")
    .filter((l) => !/^(translation_status|source_hash|translated_at):/.test(l))
    .map((l) => {
      const m = l.match(/^([a-z_]+):\s*(.+)$/);
      return m && out.fm[m[1]] ? `${m[1]}: ${out.fm[m[1]]}` : l;
    })
    .join("\n");
  newFm += `\ntranslation_status: machine\nsource_hash: ${hash}\ntranslated_at: ${new Date().toISOString().slice(0, 10)}`;

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, `---\n${newFm}\n---\n${relinkAssets(keepAnchors(out.body, body), rel, locale)}`);
  return "translated";
}

// ---------------------------------------------------------------- run
const jobs = locales.flatMap((l) => files.map((f) => [f, l]));
console.log(`${files.length} files × ${locales.length} locale(s) = ${jobs.length} jobs${DRY ? " (dry run)" : ""}`);
let i = 0, failed = 0;
async function worker() {
  while (i < jobs.length) {
    const [rel, locale] = jobs[i++];
    try {
      const r = await translateFile(rel, locale);
      console.log(`${locale}  ${rel}  ${r}`);
    } catch (e) {
      failed++;
      console.error(`${locale}  ${rel}  FAILED: ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: DRY ? 1 : CONCURRENCY }, worker));
if (failed) { console.error(`${failed} job(s) failed`); process.exit(1); }
