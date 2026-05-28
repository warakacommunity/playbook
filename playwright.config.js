// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './scripts/screenshots',
  testMatch: '**/*.screenshot.js',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 960, height: 700 },
        deviceScaleFactor: 2,
      },
    },
  ],
  outputDir: 'scripts/screenshots/.results',
  reporter: [['list']],
});
