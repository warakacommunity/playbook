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

test('D18.1 — pending changes section', async ({ page }) => {
  await openEditor(page);
  const footer = page.locator('[class*="leftPanelFooter"]');
  if (await footer.isVisible()) {
    await footer.screenshot({ path: `${OUT}/d18-1-pending-changes.png` });
  } else {
    // Pending section only shows when there are staged changes; capture left panel
    const leftPanel = page.locator('[class*="leftPanel"]').first();
    await leftPanel.screenshot({ path: `${OUT}/d18-1-pending-changes.png` });
  }
});

test('D20.1 — submit PR button', async ({ page }) => {
  await openEditor(page);
  const submitRow = page.locator('[class*="submitRow"]');
  if (await submitRow.isVisible()) {
    await submitRow.screenshot({ path: `${OUT}/d20-1-submit-btn.png` });
  } else {
    const leftPanel = page.locator('[class*="leftPanel"]').first();
    await leftPanel.screenshot({ path: `${OUT}/d20-1-submit-btn.png` });
  }
});

test('D21.1 — PR success confirmation', async ({ page }) => {
  await openEditor(page);
  // The success box only appears after a real PR is created.
  // This screenshot must be taken manually after a successful PR submission.
  // Here we capture the modal state as a placeholder.
  const modal = page.locator('[class*="modal"]').first();
  await modal.screenshot({ path: `${OUT}/d21-1-pr-success.png` });
});
