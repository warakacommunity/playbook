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

test('D10.1 — upload button in panel header', async ({ page }) => {
  await openEditor(page);
  const uploadBtn = page.locator('[class*="uploadBtn"]');
  await uploadBtn.hover();
  await page.waitForTimeout(150);
  const header = page.locator('[class*="treePanelHeader"]');
  await header.screenshot({ path: `${OUT}/d10-1-upload-btn.png` });
});

test('D11.1 — upload placement panel', async ({ page }) => {
  await openEditor(page);
  // The upload overlay appears after file selection — capture it if visible,
  // otherwise note that this screenshot requires a real file upload.
  const overlay = page.locator('[class*="uploadPreviewPanel"]');
  if (await overlay.isVisible()) {
    await overlay.screenshot({ path: `${OUT}/d11-1-upload-placement.png` });
  } else {
    // Capture the full modal as context
    await page.screenshot({ path: `${OUT}/d11-1-upload-placement.png` });
  }
});
