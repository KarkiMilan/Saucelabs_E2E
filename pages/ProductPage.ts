import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async searchAndAddProduct(productName: string) {
    await this.page.locator(`[data-test="add-to-cart-${productName}"]`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
