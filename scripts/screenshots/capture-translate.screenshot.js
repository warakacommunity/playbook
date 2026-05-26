// @ts-check
const { test } = require('@playwright/test');
const path = require('path');

const OUT = path.resolve(__dirname, '../../static/img/screenshots');

async function openEditor(page) {
  await page.goto('/contribute-online');
  await page.evaluate(() => {
    window.localStorage.setItem('gh_token', 'mock_token_for_screenshot');
    window.localStorage.setItem('gh_user', JSON.stringify({
      username: 'demo-contributor',
      avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
    }));
  });
  await page.reload();
  await page.getByRole('button', { name: /Start Contributing Online/i }).click();
  await page.waitForSelector('[class*="modal"]');
  await page.waitForTimeout(500);
}

test('D14.1 — language dropdown closed', async ({ page }) => {
  await openEditor(page);
  // Switch to translate tab if a page is open
  const translateTab = page.locator('[class*="rightPanelTab"]', { hasText: /Translate/i });
  if (await translateTab.isVisible()) {
    await translateTab.click();
    await page.waitForTimeout(200);
    const translatePanel = page.locator('[class*="translatePanel"]');
    await translatePanel.screenshot({ path: `${OUT}/d14-1-lang-dropdown-closed.png` });
  } else {
    await page.screenshot({ path: `${OUT}/d14-1-lang-dropdown-closed.png` });
  }
});

test('D14.2 — language dropdown open', async ({ page }) => {
  await openEditor(page);
  const translateTab = page.locator('[class*="rightPanelTab"]', { hasText: /Translate/i });
  if (await translateTab.isVisible()) {
    await translateTab.click();
    await page.waitForTimeout(200);
    const select = page.locator('[class*="translateLangSelect"]');
    // Click the select to open it
    await select.click();
    await page.waitForTimeout(200);
    const translatePanel = page.locator('[class*="translatePanel"]');
    await translatePanel.screenshot({ path: `${OUT}/d14-2-lang-dropdown-open.png` });
  } else {
    await page.screenshot({ path: `${OUT}/d14-2-lang-dropdown-open.png` });
  }
});
