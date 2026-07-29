import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async verifyItemInCart(itemName: string) {
    await expect(this.page.locator('.cart_item_label')).toContainText(itemName);
  }

  async removeItemByName(itemName: string) {
    const item = this.page.locator('.cart_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: itemName }),
    });

    await item.getByRole('button').click();
  }

  async startCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async verifyCartEmpty() {
    await expect(this.page.locator('.cart_item')).toHaveCount(0);
  }
}
