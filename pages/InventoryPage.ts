import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) { }

  async verifyProductsPage() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.locator('.title')).toHaveText('Products');
  }

  async addItemByName(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: itemName }),
    });

    await item.locator('[data-test^="add-to-cart-"]').click();
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(option);
  }

  async verifyProductsSortedByPriceLowToHigh() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map((price) => Number(price.replace('$', '').trim()));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);
  }
}