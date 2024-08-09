import { test as setup, chromium, firefox, webkit, BrowserType } from '@playwright/test';
import { SessionManager } from '../common/utils/SessionManager';


async function ensureSession(browserType: BrowserType, browserName: string) {
  const browser = await browserType.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const sessionManager = SessionManager.getInstance(browserName);
  await sessionManager.ensureAuthenticated(page);
  await browser.close();
}

setup('authenticate chromium', async () => {
  await ensureSession(chromium, 'chromium');
});

