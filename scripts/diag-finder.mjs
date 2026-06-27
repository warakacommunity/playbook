import { chromium } from 'playwright';

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1400, height: 900 } });
const page = await ctx.newPage();

const fails = [];
const toasts = [];
const consoleErrs = [];

page.on('response', async (r) => {
  const s = r.status();
  if (s >= 400) {
    let body = '';
    try { body = (await r.text()).slice(0, 200); } catch {}
    fails.push(`${s} ${r.request().method()} ${r.url()}  :: ${body.replace(/\n/g, ' ')}`);
  }
});
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrs.push(m.text().slice(0, 200));
});

async function visit(path) {
  fails.length = 0;
  consoleErrs.length = 0;
  await page.goto(`http://localhost:8010${path}`, { waitUntil: 'networkidle', timeout: 30000 }).catch((e) => console.log('nav err', e.message));
  await page.waitForTimeout(2500);
  // grab any visible toast text
  const t = await page.$$eval('[class*="toast" i], [class*="Toast" i], [role="status"], [role="alert"]', els =>
    els.map(e => e.textContent.trim()).filter(Boolean)
  ).catch(() => []);
  console.log(`\n===== ${path} =====`);
  console.log('final url:', page.url());
  console.log('FAILED REQUESTS:', fails.length ? '\n  ' + fails.join('\n  ') : 'none');
  console.log('TOASTS:', t.length ? t.join(' | ') : 'none');
  console.log('CONSOLE ERRORS:', consoleErrs.length ? '\n  ' + consoleErrs.slice(0, 6).join('\n  ') : 'none');
}

await visit('/finder');
await visit('/finder/discover');
await visit('/finder/people');

await b.close();
console.log('\nDONE');
