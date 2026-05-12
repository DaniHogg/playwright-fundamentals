
# Playwright UI Automation

This repository contains **focused Playwright UI tests** in both JavaScript and Python.

It is intentionally scoped to demonstrate:
- Modern Playwright testing patterns
- Playwright-specific locator strategies
- Cross-browser UI automation using the built-in Playwright test runner
- How the same target can be exercised from JS and Python test suites

> For a production‑ready, multi‑layer automation framework, see:
> **qa-automation-template**


## Why Playwright

This project exists to demonstrate modern UI automation using Playwright,
including features that differ from traditional Selenium-based approaches:

- Built-in auto-waiting
- Role‑ and text‑based locators
- Parallel execution out of the box
- First‑class CI support


## Scope

This repository intentionally keeps the JS and Python suites separate so each language sample stays easy to review.

Its purpose is to show clean, readable Playwright tests.
A production-style framework architecture is implemented separately.


## Prerequisites

- Node.js 18+ installed for the JavaScript suite
- Python 3.11+ installed for the Python suite
- npm or yarn package manager

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Install Python test dependencies if you plan to run the Python suite:
```bash
python -m pip install -r requirements.txt
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in headed mode (browser visible)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests for specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### View test report
```bash
npm run report
```

## Codegen

Generate test code by recording interactions:
```bash
npm run codegen
```

## Project Structure

```
playwright-testing/
├── .github/
│   └── workflows/
│       └── tests.yml          # GitHub Actions CI/CD workflow
├── tests/
│   ├── navigation.spec.ts     # Sample test
│   └── fixtures/              # Shared test fixtures
├── playwright.config.ts       # Playwright configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Project documentation
└── .gitignore               # Git ignore rules
```

## Writing Tests

Tests should be placed in the `tests/` directory with `.spec.js` extension.

Sample test structure:
```typescript
import { test, expect } from '@playwright/test';

test('navigation flow', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

## Configuration

Edit `playwright.config.js` to:
- Add/remove browsers
- Configure timeouts
- Set up test runs in parallel
- Configure reporters
- Add base URL for your application

## CI/CD

GitHub Actions workflow is configured in `.github/workflows/tests.yml` to automatically run tests on push and pull requests.

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Test-Runner](https://playwright.dev/docs/test-runner)

## License

MIT
