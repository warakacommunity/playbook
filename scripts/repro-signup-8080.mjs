import { chromium } from 'playwright';
import fs from 'node:fs';

const MAILDIR = '/Users/MacbookPro/Documents/GitHub/label-studio/sent_emails';
const email = `lptest${Date.now()}@example.com`;
const password = 'Testpass123!';
const before = new Set(fs.existsSync(MAILDIR) ? fs.readdirSync(MAILDIR) : []);

const b = await chromium.launch();
const page = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

const fails = [], toasts = new Set(), cerr = [];
page.on('response', async r => { if (r.status() >= 400) { let t=''; try{t=(await r.text()).slice(0,160);}catch{} fails.push(`${r.status()} ${r.request().method()} ${r.url().replace('http://localhost:8080','')} :: ${t.replace(/\s+/g,' ')}`);} });
page.on('console', m => { if (m.type()==='error') cerr.push(m.text().slice(0,160)); });
const grabToasts = async () => { (await page.$$eval('[class*="toast" i],[role="alert"],[role="status"]', els=>els.map(e=>e.textContent.trim()).filter(Boolean)).catch(()=>[])).forEach(t=>toasts.add(t)); };

console.log('signup email:', email);
await page.goto('http://localhost:8080/auth/signup', { waitUntil:'networkidle' }); await page.waitForTimeout(1500);
await page.fill('input[type="email"], input[name="email"]', email);
await page.fill('input[type="password"], input[name="password"]', password);
await grabToasts();
const btn = await page.$('button[type="submit"], button:has-text("Sign up"), button:has-text("Create")');
if (btn) await btn.click();
await page.waitForTimeout(4000);
await grabToasts();
await page.screenshot({ path:'/tmp/repro-after-signup.png' });
console.log('\n--- after SIGNUP ---');
console.log('url:', page.url());
console.log('FAILS:', fails.length? '\n  '+fails.join('\n  '):'none');
console.log('TOASTS:', toasts.size? [...toasts].join(' | '):'none');
console.log('CONSOLE:', cerr.length? '\n  '+cerr.slice(0,5).join('\n  '):'none');

// read the verification email
await new Promise(r=>setTimeout(r,1500));
const newFiles = (fs.existsSync(MAILDIR)?fs.readdirSync(MAILDIR):[]).filter(f=>!before.has(f));
let link = null;
for (const f of newFiles) {
  const body = fs.readFileSync(`${MAILDIR}/${f}`,'utf8');
  const m = body.match(/https?:\/\/[^\s"'<>]*verify-email[^\s"'<>]*/i);
  if (m) { link = m[0].replace(/=\r?\n/g,'').replace(/3D/,''); console.log('\nEMAIL FILE:', f, '\nLINK:', m[0]); break; }
}
if (!link) console.log('\nno verify-email link found in new mail files:', newFiles);

if (link) {
  fails.length=0; cerr.length=0; toasts.clear();
  await page.goto(link, { waitUntil:'networkidle' }).catch(e=>console.log('nav err', e.message));
  await page.waitForTimeout(3000); await grabToasts();
  await page.screenshot({ path:'/tmp/repro-after-verify.png' });
  console.log('\n--- after CLICK VERIFY LINK ---');
  console.log('final url:', page.url());
  console.log('FAILS:', fails.length? '\n  '+fails.join('\n  '):'none');
  console.log('TOASTS:', toasts.size? [...toasts].join(' | '):'none');
  console.log('CONSOLE:', cerr.length? '\n  '+cerr.slice(0,5).join('\n  '):'none');
}
await b.close(); console.log('\nDONE');
