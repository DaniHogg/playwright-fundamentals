const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './test-js',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'https://danihogg.github.io/qa-portfolio-live-site',
    trace: 'retain-on-failure',
  },
});
