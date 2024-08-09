import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage<LoginPage> {
  constructor(page: Page) {
    super(page, 'Prod/Account/LogIn');
  }

  private getUserNameInput = () => this._page.getByLabel('UserName');
  private getPasswordInput = () => this._page.getByLabel('Password');
  private getLoginButton = () => this._page.getByRole('button', { name: 'Log In' })

  async enterUsername(username: string): Promise<LoginPage> {
    this.logger.info(`Attempting to enter username: ${username}`);
    await this.getUserNameInput().fill(username);
    this.logger.info(`Username entered successfully.`);
    return this;
  }

  async enterPassword(password: string): Promise<LoginPage> {
    this.logger.info(`Attempting to enter password.`);
    await this.getPasswordInput().fill(password);
    this.logger.info(`Password entered successfully.`);
    return this;
  }

  async clickLogin(): Promise<LoginPage> {
    this.logger.info('Attempting to click the login button.');
    await this.getLoginButton().click();
    this.logger.info('Login button clicked.');
    return this;
  }

  async login(userName: string, password: string): Promise<LoginPage> {
    this.logger.info(`Initiating login process for username: ${userName}`);
    await this.goTo();
    await this.enterUsername(userName);
    await this.enterPassword(password);
    await this.clickLogin();
    this.logger.info('Login process completed.');
    return this;
  }
}
