// @ts-check
const { test } = require('@playwright/test');
const path = require('path');

const OUT = path.resolve(__dirname, '../../static/img/screenshots');

// Mock a logged-in state and a pre-loaded tree via localStorage so the
// structure panel is visible without a real GitHub round-trip.
async function openModalWithMockAuth(page) {
  await page.goto('/contribute-online');

  await page.evaluate(() => {
    // Minimal mock: token triggers the "authenticated" branch in AuthPanel
    window.localStorage.setItem('gh_token', 'mock_token_for_screenshot');
    window.localStorage.setItem('gh_user', JSON.stringify({
      username: 'demo-contributor',
      avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
    }));
  });

  await page.reload();
  await page.waitForSelector('[class*="primaryButton"]');
  await page.getByRole('button', { name: /Start Contributing Online/i }).click();
  await page.waitForSelector('[class*="modal"]');
  await page.waitForTimeout(500);
}

test('D2.1 — left tree panel overview', async ({ page }) => {
  await openModalWithMockAuth(page);
  const leftPanel = page.locator('[class*="leftPanel"]').first();
  await leftPanel.screenshot({ path: `${OUT}/d2-1-tree-panel-overview.png` });
});

test('D2.2 — add section button highlighted', async ({ page }) => {
  await openModalWithMockAuth(page);
  const addBtn = page.locator('[class*="addSectionBtn"]');
  await addBtn.hover();
  await page.waitForTimeout(150);
  const header = page.locator('[class*="treePanelHeader"]');
  await header.screenshot({ path: `${OUT}/d2-2-add-section-btn.png` });
});

test('D2.3 — inline section name input form', async ({ page }) => {
  await openModalWithMockAuth(page);
  const addBtn = page.locator('[class*="addSectionBtn"]');
  await addBtn.click();
  await page.waitForSelector('[class*="inlineInput"]');
  await page.waitForTimeout(200);
  const treeScroll = page.locator('[class*="treeScroll"]');
  await treeScroll.screenshot({ path: `${OUT}/d2-3-section-inline-form.png` });
});

test('D3.1 — hover page icon on section row', async ({ page }) => {
  await openModalWithMockAuth(page);
  // Hover the first tree row to reveal the add-page icon
  const firstRow = page.locator('[class*="treeRow"]').first();
  await firstRow.hover();
  await page.waitForTimeout(200);
  await firstRow.screenshot({ path: `${OUT}/d3-1-add-page-hover.png` });
});

test('D5.1 — rename/delete actions on row hover', async ({ page }) => {
  await openModalWithMockAuth(page);
  const firstRow = page.locator('[class*="treeRow"]').first();
  await firstRow.hover();
  await page.waitForTimeout(200);
  const nodeActions = page.locator('[class*="nodeActions"]').first();
  await page.locator('[class*="treeScroll"]').screenshot({ path: `${OUT}/d5-1-row-actions.png` });
});
