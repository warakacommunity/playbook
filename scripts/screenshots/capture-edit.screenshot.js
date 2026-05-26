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

test('D6.2 — empty editor right panel', async ({ page }) => {
  await openEditor(page);
  const rightPanel = page.locator('[class*="rightPanel"]').first();
  await rightPanel.screenshot({ path: `${OUT}/d6-2-right-panel-empty.png` });
});

test('D7.1 — editor full modal view', async ({ page }) => {
  await openEditor(page);
  const modal = page.locator('[class*="modal"]:not([class*="Header"]):not([class*="Body"])').first();
  await page.screenshot({ path: `${OUT}/d7-1-modal-full.png`, clip: await modal.boundingBox() });
});

test('D9.1 — save button in right panel header', async ({ page }) => {
  await openEditor(page);
  // The save button only appears when a page is open; capture the whole header
  const rightPanelHeader = page.locator('[class*="rightPanelHeader"]');
  if (await rightPanelHeader.isVisible()) {
    await rightPanelHeader.screenshot({ path: `${OUT}/d9-1-save-button.png` });
  } else {
    // Fallback: capture right panel placeholder
    const placeholder = page.locator('[class*="rightPanelPlaceholder"]').first();
    await placeholder.screenshot({ path: `${OUT}/d9-1-save-button.png` });
  }
});
