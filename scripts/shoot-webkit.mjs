import { webkit } from 'playwright';
import fs from 'node:fs';

const OUT = new URL('../static/img/screens/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });
const EMAIL = 'contact@abumafrim.com';
const PASS = 'demo1234';

const b = await webkit.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const shoot = async (name, wait = 2600) => {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${OUT}${name}.png` });
  console.log('shot', name, '->', page.url());
};

// login (two-step)
await page.goto('https://finder.afriannotate.org/user/login/', { waitUntil: 'networkidle' }).catch(() => {});
await page.waitForTimeout(1200);
await page.fill('input[name="email"]', EMAIL);
await page.click('button.login-button:has-text("Continue")').catch(() => {});
await page.waitForSelector('input[name="password"]', { state: 'visible', timeout: 10000 }).catch(() => {});
await page.fill('input[name="password"]', PASS);
await page.click('button.login-button:has-text("Log in")').catch(() => {});
await page.waitForTimeout(4500);
console.log('logged in ->', page.url());

await page.goto('https://finder.afriannotate.org/', { waitUntil: 'networkidle' }).catch(() => {});
await shoot('finder-people');
await page.goto('https://finder.afriannotate.org/asks', { waitUntil: 'networkidle' }).catch(() => {});
await shoot('finder-asks');

await b.close();
console.log('DONE');
