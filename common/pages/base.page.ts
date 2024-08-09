import { Page } from '@playwright/test';
import Logger from '../utils/Logger';

export abstract class BasePage<T> {
  protected readonly _page: Page;
  protected readonly baseUrl: string;
  protected logger: Logger;

  protected constructor(page: Page, baseUrlSuffix?: string) {
    this._page = page;
    this.baseUrl = `https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/${baseUrlSuffix || ''}`;
    this.logger = Logger.getInstance();
  }

  async goTo(url?: string): Promise<T> {
    const fullUrl = url || this.baseUrl;
    this.logger.info(`Navigating to URL: ${fullUrl}`);
    await this._page.goto(fullUrl);
    this.logger.info(`Navigation to URL ${fullUrl} completed.`);
    return this as unknown as T;
  }
}
