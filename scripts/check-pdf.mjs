// Sanity check for the generated playbook PDF, run in CI before deploy.
// Exits 1 if the file is missing, too small, too short, or lacks text we
// know is in the book, so a broken PDF is never published.
//
// Usage: node scripts/check-pdf.mjs build/downloads/afriplaybook.pdf
import fs from 'node:fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const MIN_BYTES = 1_000_000; // a real build is several MB
const MIN_PAGES = 50;        // the book is well over 100 pages
const MUST_CONTAIN = ['AfriPlaybook', 'Before You Start', 'Project Management'];

const file = process.argv[2];
const fail = (msg) => { console.error(`PDF check failed: ${msg}`); process.exit(1); };

if (!file || !fs.existsSync(file)) fail(`file not found: ${file}`);
const bytes = fs.statSync(file).size;
if (bytes < MIN_BYTES) fail(`only ${bytes} bytes (expected at least ${MIN_BYTES})`);

const pdf = await getDocument({ data: new Uint8Array(fs.readFileSync(file)) }).promise;
if (pdf.numPages < MIN_PAGES) fail(`only ${pdf.numPages} pages (expected at least ${MIN_PAGES})`);

let text = '';
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  text += (await page.getTextContent()).items.map((it) => it.str).join(' ') + '\n';
}
const missing = MUST_CONTAIN.filter((s) => !text.includes(s));
if (missing.length) fail(`missing expected text: ${missing.join(', ')}`);

console.log(`PDF check passed: ${pdf.numPages} pages, ${(bytes / 1e6).toFixed(1)} MB`);
