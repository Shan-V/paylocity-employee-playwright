import { defineConfig, devices } from '@playwright/test';
import * as path from 'node:path';
import * as fs from 'node:fs';


const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function getLogFile(suiteName: string) {
  return path.join(logDir, `${suiteName.replace(/\s+/g, '_')}.log`);
}


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testDir: './setup',
      testMatch: /.*-setup\.ts$/,
      use: {
        headless: true,
      },
    },
    {
      name: 'chromium',
      testDir: './tests',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
      },
      dependencies: ['setup'],
    },
  ],

});
