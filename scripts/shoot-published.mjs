import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = new URL('../static/img/screens/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync('/tmp/ref/', { recursive: true });
const EMAIL = 'contact@abumafrim.com';
const PASS = 'demo1234';

const b = await chromium.launch();
const shoot = async (page, path, name, { full = false, wait = 2200 } = {}) => {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${path}${name}.png`, fullPage: full });
  console.log('shot', name, '->', page.url());
};
async function login(page, base) {
  await page.goto(`${base}/user/login/`, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(1200);
  await page.fill('input[name="email"]', EMAIL);
  await page.click('button.login-button:has-text("Continue")').catch(() => {});
  await page.waitForSelector('input[name="password"]', { state: 'visible', timeout: 10000 }).catch(() => {});
  await page.fill('input[name="password"]', PASS);
  await page.click('button.login-button:has-text("Log in")').catch(() => {});
  await page.waitForTimeout(4500);
  console.log('logged in ->', page.url());
}

// ---------- reference: safeintelligence.ai ----------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('https://safeintelligence.ai/', { waitUntil: 'networkidle' }).catch(() => {});
  await shoot(page, '/tmp/ref/', 'si-hero');
  await shoot(page, '/tmp/ref/', 'si-full', { full: true, wait: 1500 });
  await ctx.close();
}

// ---------- FINDER ----------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await login(page, 'https://finder.afriannotate.org');
  await page.goto('https://finder.afriannotate.org/', { waitUntil: 'networkidle' }).catch(() => {});
  await shoot(page, OUT, 'finder-people');
  await page.goto('https://finder.afriannotate.org/asks', { waitUntil: 'networkidle' }).catch(() => {});
  await shoot(page, OUT, 'finder-asks');
  // member profile
  await page.goto('https://finder.afriannotate.org/', { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(2500);
  const card = await page.$('a[href*="/people/"], a[href*="/profile/"], article a, [class*="card"] a');
  if (card) { await card.click().catch(() => {}); await shoot(page, OUT, 'finder-profile', { wait: 3000 }); }
  await ctx.close();
}

// ---------- LABEL (fresh context) ----------
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await login(page, 'https://label.afriannotate.org');
  await shoot(page, OUT, 'label-home');
  await page.goto('https://label.afriannotate.org/projects/', { waitUntil: 'networkidle' }).catch(() => {});
  await shoot(page, OUT, 'label-projects', { wait: 2800 });
  const projHref = await page.$$eval('a[href*="/projects/"]', (as) =>
    as.map((a) => a.getAttribute('href')).find((x) => /\/projects\/\d+/.test(x)) || null
  ).catch(() => null);
  console.log('project:', projHref);
  if (projHref) {
    const id = projHref.match(/\/projects\/(\d+)/)[1];
    await page.goto(`https://label.afriannotate.org/projects/${id}/data`, { waitUntil: 'networkidle' }).catch(() => {});
    await shoot(page, OUT, 'label-datamanager', { wait: 3200 });
    for (const sel of ['button:has-text("Label All Tasks")', 'button:has-text("Label")', 'table tbody tr', '[class*="dm-row"]']) {
      const el = await page.$(sel);
      if (el) { await el.click().catch(() => {}); break; }
    }
    await shoot(page, OUT, 'label-annotate', { wait: 4500 });
  }
  await ctx.close();
}

await b.close();
console.log('DONE');
