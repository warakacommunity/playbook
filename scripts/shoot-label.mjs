import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = new URL('../static/img/screens/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const BASE = 'http://localhost:8010';

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const shoot = async (name, { full = false, wait = 1800 } = {}) => {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${OUT}${name}.png`, fullPage: full });
  console.log('shot', name, '->', page.url());
};

// --- Login ---
await page.goto(`${BASE}/user/login/`, { waitUntil: 'networkidle' });
await page.fill('input[name="email"]', 'abumafrim@gmail.com');
await page.click('button.login-button:has-text("Continue")');
await page.waitForSelector('input[name="password"]', { state: 'visible', timeout: 10000 });
await page.fill('input[name="password"]', 'demo1234');
await page.click('button.login-button:has-text("Log in")');
await page.waitForTimeout(4000);
console.log('after login ->', page.url());

// --- Home / dashboard ---
await shoot('label-home');

// --- Create Project flow → labeling template gallery (non-destructive) ---
try {
  await page.click('button:has-text("Create Project"), a:has-text("Create your first project")', { timeout: 8000 });
  await page.waitForTimeout(1800);
  // give the new project a name so the wizard advances
  const nameInput = await page.$('input[placeholder*="Project" i], input[name*="title" i], textarea');
  if (nameInput) await nameInput.fill('Hausa Sentiment Pilot').catch(() => {});
  await shoot('label-create', { wait: 1500 });
  // jump to the Labeling Setup tab / template gallery
  await page.locator('text="Labeling Setup"').first().click({ timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(2500);
  await shoot('label-templates', { wait: 800 });
  // open a category, then a template card → live annotation preview pane
  await page.locator('text="Natural Language Processing"').first().click({ timeout: 6000 }).catch(() => {});
  await page.waitForTimeout(1800);
  await shoot('label-nlp', { wait: 600 });
  // click the first template card in the grid (skill the left rail)
  const card = await page.$('[class*="template" i] [class*="card" i], [class*="grid" i] >> nth=0');
  if (card) await card.click().catch(() => {});
  await page.waitForTimeout(2500);
  await shoot('label-template-preview', { wait: 1500 });
} catch (e) {
  console.log('create-project flow skipped:', e.message);
}

// --- Projects list ---
await page.goto(`${BASE}/projects/`, { waitUntil: 'networkidle' }).catch(() => {});
await shoot('label-projects', { wait: 2200 });

await b.close();
console.log('DONE');
