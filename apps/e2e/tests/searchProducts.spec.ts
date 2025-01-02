import { test, expect } from '@playwright/test';

test('Search products and verify product details', async ({ page }) => {
  // 1. Navigate to the search products page
  await page.goto('http://localhost:5173/products/products');

  // 2. Select filters
  await page.selectOption('sidebar/Categories #category-filter', 'electronics');
  await page.fill('sidebar/Categories #price-min', '100');
  await page.fill('sidebar/Categories #price-max', '500');
  await page.click('sidebar/Categories #apply-filters');

  // 3. Click a product from the results
  await page.waitForSelector('ViewProduct .product-item');
  const productName = await page.textContent('ViewProduct .product-item:first-child .product-name');
  await page.click('ViewProduct .product-item:first-child');

  // 4. Navigate to the details page
  await page.waitForSelector('ProductsDetails .product-details');
  const detailsProductName = await page.textContent('ProductsDetails .product-details .product-name');
  expect(detailsProductName).toBe(productName);

  // Ensure the product price is displayed
  const productPrice = await page.textContent('ProductsDetails .product-details .product-price');
  expect(productPrice).toBeTruthy();

  // Additional assertions for OrderOption
  await page.waitForSelector('ui/header/ActionBar');
  await page.click('ui/header/ActionBar ui/buttons/OrderOption');
  
});