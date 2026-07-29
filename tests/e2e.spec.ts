import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import * as dotenv from 'dotenv';

dotenv.config();

const itemName = 'Sauce Labs Backpack';

test.describe('Authentication', () => {
  test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    const credentials = await loginPage.extractCredentails();
    await loginPage.login(
      credentials.extractusername,
      credentials.extractpassword
    );

    await inventoryPage.verifyProductsPage();
  });

  test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'invalid_password');

    await loginPage.expectError('Username and password do not match any user in this service');
  });

  test('Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    const credentials = await loginPage.extractCredentails();
    await loginPage.login(credentials.extractusername, credentials.extractpassword);

    await inventoryPage.verifyProductsPage();
    await loginPage.logout();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});

test.describe('Inventory', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    const credentials = await loginPage.extractCredentails();
    await loginPage.login(credentials.extractusername, credentials.extractpassword);

  });

  test('View products page', async () => {
    await inventoryPage.verifyProductsPage();
  });

  test('Sort products by price low to high', async () => {
    await inventoryPage.verifyProductsPage();
    await inventoryPage.sortProducts('lohi');
    await inventoryPage.verifyProductsSortedByPriceLowToHigh();
  });

  test('Add one item to cart', async ({ page }) => {
    await inventoryPage.addItemByName(itemName);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});

test.describe('Cart', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    const credentials = await loginPage.extractCredentails();
    await loginPage.login(credentials.extractusername, credentials.extractpassword);

  });

  test('Remove item from cart', async () => {
    await inventoryPage.addItemByName(itemName);
    await inventoryPage.openCart();
    await cartPage.removeItemByName(itemName);
    await cartPage.verifyCartEmpty();
  });

  test('Start checkout', async () => {
    await inventoryPage.addItemByName(itemName);
    await inventoryPage.openCart();
    await cartPage.startCheckout();
  });
});

test.describe('Checkout', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    const credentials = await loginPage.extractCredentails();
    await loginPage.login(credentials.extractusername, credentials.extractpassword);

  });

  test('Fill personal info and continue', async () => {
    await inventoryPage.addItemByName(itemName);
    await inventoryPage.openCart();

    await cartPage.startCheckout();

    await checkoutPage.fillPersonalInfo();
    await checkoutPage.verifyOverviewPage();
  });

  test('Review checkout overview', async () => {
    await inventoryPage.addItemByName(itemName);
    await inventoryPage.openCart();

    await cartPage.startCheckout();

    await checkoutPage.fillPersonalInfo();
    await checkoutPage.verifyOverviewPage();
  });

  test('Complete order', async () => {
    await inventoryPage.addItemByName(itemName);
    await inventoryPage.openCart();

    await cartPage.startCheckout();

    await checkoutPage.fillPersonalInfo();
    await checkoutPage.verifyOverviewPage();

    await checkoutPage.finishOrder();
    await checkoutPage.verifyCompletePage();
  });
});