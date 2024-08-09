# Paylocity Employee Playwright

![GitHub](https://img.shields.io/github/license/Shan-V/paylocity-employee-playwright)
![GitHub last commit](https://img.shields.io/github/last-commit/Shan-V/paylocity-employee-playwright)

This repository contains automated tests for the Paylocity Benefits Dashboard using Playwright. The tests focus on validating the functionality of adding employees, including edge cases like invalid dependent counts.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Configuration](#configuration)
- [Logging & Reporting](#logging--reporting)

## Installation

To get started with this project, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/Shan-V/paylocity-employee-playwright.git
cd paylocity-employee-playwright
npm install
```

## Project Structure

- **`common/`**: Contains shared modules such as fixtures, pages, and utilities.
  - **`fixtures/pageWithAuth.ts`**: Fixture for handling authentication.
  - **`pages/portal/paylocityBenefitsDashboard.ts`**: Page object model for the Paylocity Benefits Dashboard.
  - **`utils/`**: Utility modules including logging (`Logger.ts`) and session management (`SessionManager.ts`).

- **`logs/`**: Directory for storing log files.
- **`playwright-report/`**: Directory for Playwright HTML reports.
- **`setup/`**: Scripts for session setup, such as `session-setup.ts`.
- **`tests/`**: Test cases, such as `add-new-employee.spec.ts`.
- **`playwright.config.ts`**: Configuration for Playwright, including test settings and projects.

## Running Tests

You can run the tests in both headless and headed modes. The following npm scripts are available:

### Default (Headless) Mode

```bash
npm test
```

## Test Scenarios

The test suite currently includes the following scenarios:

- **Positive Test**: Add a new employee with valid details (e.g., David Johns with 1 dependent).
- **Negative Test**: Attempt to add an employee with an excessive number of dependents (e.g., 33).
- **Negative Test**: Attempt to add an employee with an invalid number of dependents (e.g., -1).

Each scenario validates the application's response, ensuring correct behavior under various conditions.

## Configuration

The Playwright configuration is defined in `playwright.config.ts`:

- **Parallel Execution**: Tests run fully in parallel.
- **Retries**: Configurable retry logic for handling flaky tests.
- **Projects**: Different configurations for setup and testing environments (e.g., `chromium` with and without a headless mode).
- **Trace**: Tracing is enabled on the first retry to capture detailed execution logs for debugging.

## Logging & Reporting

- **Logs**: Stored in the `logs/` directory. Each test suite generates a unique log file.
- **Reports**: Playwright generates HTML reports after test execution, accessible via the `playwright-report/` directory.
