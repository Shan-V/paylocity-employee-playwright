import { Page } from '@playwright/test';
import Logger from './Logger';
import { LoginPage } from '../pages/login.page';

const logger = Logger.getInstance();

export class SessionManager {
  private static instances: { [key: string]: SessionManager } = {};

  private constructor(browserName: string) {

  }

  public static getInstance(browserName: string): SessionManager {
    if (!SessionManager.instances[browserName]) {
      SessionManager.instances[browserName] = new SessionManager(browserName);
    }
    return SessionManager.instances[browserName];
  }

  async ensureAuthenticated(page: Page): Promise<void> {

    logger.info('Re-authenticating for %s', page.context().browser()?.browserType().name());
    await this.loginAndSaveAuthState(page);
  }

  private async loginAndSaveAuthState(page: Page): Promise<void> {
    const loginPage = new LoginPage(page);
    await loginPage.login("TestUser407", "k*>#^0O}$5*x");
    await page.waitForURL(/\/Prod\/Benefits/);
    logger.info('Login successful.');
  }
}