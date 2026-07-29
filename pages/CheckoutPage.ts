import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillPersonalInfo(firstName = 'Test', lastName = 'User', zip = '12345') {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }

  async verifyOverviewPage() {
    await expect(this.page.locator('.title')).toHaveText('Checkout: Overview');
  }

  async finishOrder() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async verifyCompletePage() {
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }
}
