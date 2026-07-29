import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(baseUrl: string = process.env.BASE_URL || 'https://www.saucedemo.com') {
    await this.page.goto(baseUrl);
  }

  async extractCredentails() {
    return {
      extractusername: process.env.SAUCE_USERNAME || process.env.STANDARD_USER || 'standard_user',
      extractpassword: process.env.SAUCE_PASSWORD || process.env.STANDARD_PASSWORD || 'secret_sauce',
    };
  }

  async login(username: string, password: string) {
    await this.page.locator('[data-test="username"]').fill(username);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async expectError(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }

  async logout() {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('#logout_sidebar_link').click();
  }
}
