// @ts-check
const { test } = require('@playwright/test');
const path = require('path');

const OUT = path.resolve(__dirname, '../../static/img/screenshots');

async function openModal(page) {
  await page.goto('/contribute-online');
  await page.waitForSelector('[class*="primaryButton"]');
  await page.getByRole('button', { name: /Start Contributing Online/i }).click();
  await page.waitForSelector('[class*="modal"]');
  await page.waitForTimeout(400);
}

test('D1.1 — auth panel initial state', async ({ page }) => {
  await openModal(page);
  const modal = page.locator('[class*="modal"]:not([class*="modalHeader"]):not([class*="modalBody"])').first();
  await modal.screenshot({ path: `${OUT}/d1-1-auth-panel-initial.png` });
});

test('D1.2 — GitHub button hover state', async ({ page }) => {
  await openModal(page);
  const btn = page.locator('[class*="authGitHubBtn"]');
  await btn.hover();
  await page.waitForTimeout(150);
  const authBlock = page.locator('[class*="authBlock"]');
  await authBlock.screenshot({ path: `${OUT}/d1-2-github-btn-hover.png` });
});

test('D1.5 — PAT input field focused', async ({ page }) => {
  await openModal(page);
  const input = page.locator('[class*="authTokenInput"]');
  await input.click();
  await page.waitForTimeout(150);
  const authBlock = page.locator('[class*="authBlock"]');
  await authBlock.screenshot({ path: `${OUT}/d1-5-pat-input-focused.png` });
});
