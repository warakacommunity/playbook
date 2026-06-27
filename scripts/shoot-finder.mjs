import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = new URL('../static/img/screens/', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

// Drop the bogus 404 captures from the exploratory pass.
for (const f of fs.readdirSync(OUT)) {
  if (/^finder-(directory|experts|marketplace|jobs|people|browse|explore|tasks)\.png$/.test(f)) {
    fs.rmSync(`${OUT}${f}`);
  }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1380, height: 920 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

async function shoot(url, name, { full = false, wait = 2200 } = {}) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${OUT}${name}.png`, fullPage: full });
  console.log('shot', name, '->', page.url());
}

await shoot('https://finder.afriannotate.org/', 'finder-people');
await shoot('https://finder.afriannotate.org/', 'finder-people-full', { full: true });
await shoot('https://finder.afriannotate.org/asks', 'finder-asks');
await shoot('https://finder.afriannotate.org/asks', 'finder-asks-full', { full: true });
await shoot('https://finder.afriannotate.org/finder/docs', 'finder-docs');
await shoot('https://label.afriannotate.org/', 'label-login');

await browser.close();
console.log('DONE');
