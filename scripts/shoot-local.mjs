import { chromium } from 'playwright';
import fs from 'node:fs';
const OUT = '/tmp/lp-preview/';
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1380, height: 900 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();
for (const page of ['tool', 'afrifinder']) {
  await p.goto(`http://localhost:3210/${page}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}${page}-hero.png` });
  await p.screenshot({ path: `${OUT}${page}-full.png`, fullPage: true });
  console.log('shot', page);
}
await b.close();
console.log('DONE');
