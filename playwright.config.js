// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './scripts/screenshots',
  testMatch: '**/*.screenshot.js',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000/MasakhanePlaybook',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  outputDir: 'scripts/screenshots/.results',
  reporter: [['list']],
});
