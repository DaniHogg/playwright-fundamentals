# Playwright Project Guidelines

## Project Overview
This repository contains focused Playwright UI tests against a live static site
(https://danihogg.github.io/qa-portfolio-livesite), implemented as **two parallel,
independent suites** in the same repo:

- `test-js/` — plain JavaScript specs (`*.spec.js`) run by `@playwright/test`
  (config: `playwright.config.js`).
- `test-py/` — Python specs (`test_*.py`) run by `pytest` + `pytest-playwright`
  (fixtures/config: `test-py/conftest.py`).

There is **no TypeScript** and **no page object model** in this project yet — tests
call `page`/locators directly. Keep new tests consistent with that (plain JS/Python,
no `.ts` files, no POM layer) unless a page-object layer is explicitly introduced for
both suites at once.

## Test Organization
- JavaScript specs live directly in `test-js/` (not a `tests/` directory), with a
  `test-js/how-to/` subfolder containing numbered walkthrough specs
  (`01-first-test.spec.js`, etc.) for onboarding.
- Python specs live directly in `test-py/`, named `test_*.py`.
- Each suite covers the same scenarios independently (basic, advanced, auth, forms,
  navigation, performance, accessibility, error handling, content interaction,
  dashboard features, project lookup, mediawiki features) — when adding a scenario,
  add it to both `test-js/` and `test-py/` and keep assertions aligned.
- Shared base-path helpers: `test-js/site-path.js` (`toSitePath()`) and the
  `to_site_path` fixture in `test-py/conftest.py`. Always build URLs through these
  helpers rather than hardcoding the site origin, so `BASE_URL`/`SITE_BASE_PATH`
  env vars keep working in CI and locally.
- Use descriptive test names, group related tests with `test.describe()` (JS) or a
  `Test*` class (Python), and keep tests focused and independent.

## Selectors And Assertions
- Prefer stable selectors (id, role, text) — see existing specs for the patterns
  already in use on this site (`#proof-strip`, `#coverage-link`, etc.).
- Use getByRole/getByText/getByLabel-style locators when possible.
- Prefer specific assertions over partial ones, but when a value is derived from
  live, changing data (e.g. counts, pluralization), use a case-insensitive
  regex that tolerates the variation rather than a brittle exact string.
- Verify both positive and negative scenarios where applicable.

## Running Tests
- JS: `npm test` (all), `npm run test:headed`, `npm run test:ui`, `npm run test:debug`,
  `npm run test:chromium` / `test:firefox` / `test:webkit` (single browser),
  `npm run codegen` (record a new test), `npm run report` (open last HTML report).
- Python: `pytest test-py -v` (all), or target a file with
  `pytest test-py/test_basic.py -v`.
- Both suites read `BASE_URL` and `SITE_BASE_PATH` from the environment; see
  `.env.example` for the documented defaults.

## Debugging
- Use `--debug` (`npm run test:debug`) for step-through debugging.
- Enable `--ui` mode (`npm run test:ui`) for interactive test execution.
- Check the HTML report (`npm run report`) and the trace viewer for failures —
  traces, screenshots, and video are all captured `retain-on-failure` /
  `only-on-failure` in `playwright.config.js`.

## CI (`.github/workflows/tests.yml`)
- Tests run on push/PR to `main`/`develop`, on a nightly schedule, and on
  `workflow_dispatch`.
- CI installs Chromium, Firefox, and WebKit and runs the JS suite against
  Chromium + Firefox (`--project=chromium --project=firefox`).
- The Python suite runs with `pytest-xdist` (`-n auto`) plus tracing/screenshot/
  video capture on failure.
- HTML and JSON reports are uploaded as workflow artifacts on every run.

## Dependencies
- JS: `@playwright/test` (see `package.json`).
- Python: `playwright`, `pytest`, `pytest-playwright`, `pytest-xdist`,
  `pytest-rerunfailures` (see `requirements.txt`).

## Resources
- Playwright Docs: https://playwright.dev/
- API Reference: https://playwright.dev/docs/api/class-playwright
- Best Practices: https://playwright.dev/docs/best-practices
