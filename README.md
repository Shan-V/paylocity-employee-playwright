# Paylocity Employee Playwright

This repository contains automated tests for the Paylocity Benefits Dashboard using Playwright. The tests validate various functionalities such as adding new employees and handling edge cases related to dependent counts.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Configuration](#configuration)
- [Customizing Username and Password](#customizing-username-and-password)
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

### Default (Headed) Mode

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

## Customizing Username and Password

If you want to run the tests using your own username and password, you will need to update the credentials in the `SessionManager.ts` file. This file is responsible for managing the authentication process during the tests.

### How to Update Credentials

1. **Locate the File**: Navigate to the `SessionManager.ts` file in your project directory:
   ```bash
   common/utils/SessionManager.ts
   ```

2. **Update the Credentials**:
   - Open the `SessionManager.ts` file.
   - Look for the method named `loginAndSaveAuthState`. This method currently uses hardcoded credentials for logging in.
   - Replace the existing username and password with your own.

Here’s the relevant code snippet that you need to update:

```typescript
private async loginAndSaveAuthState(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);
    await loginPage.login("TestUser407", "k*@#^00}$5x*"); // Replace these credentials with your own
    await page.waitForURL(/\/Prod\/Benefits/);
    logger.info('Login successful.');
}
```

- **`"TestUser407"`**: Replace this with your username.
- **`"k*@#^00}$5x*"`**: Replace this with your password.

## Logging & Reporting

- **Logs**: Stored in the `logs/` directory. Each test suite generates a unique log file.
- **Reports**: Playwright generates HTML reports after test execution, accessible via the `playwright-report/` directory.
