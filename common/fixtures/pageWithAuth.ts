import { Page, test as base } from '@playwright/test';
import { SessionManager } from '../utils/SessionManager';


export const test = base.extend<{ pageWithAuth: Page }>({
  pageWithAuth: async ({ page }, use) => {
    const browserName = page.context().browser()?.browserType().name() || 'unknown';
    const sessionManager = SessionManager.getInstance(browserName);
    await sessionManager.ensureAuthenticated(page);
    await use(page);
  },
});
