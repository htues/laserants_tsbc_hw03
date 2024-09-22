import { test, expect } from '@playwright/test';

test('Search products and verify product details', async ({ page }) => {
  await page.goto('http://localhost:5173/products/products');

  await page.selectOption('#category-filter', 'electronics');
  await page.fill('#price-min', '100');
  await page.fill('#price-max', '500');
  await page.click('#apply-filters');

  await page.waitForSelector('.product-item');
  const productName = await page.textContent('.product-item:first-child .product-name');
  await page.click('.product-item:first-child');

  await page.waitForSelector('.product-details');
  const detailsProductName = await page.textContent('.product-details .product-name');
  expect(detailsProductName).toBe(productName);

  const productPrice = await page.textContent('.product-details .product-price');
  expect(productPrice).toBeTruthy(); // Ensure the product price is displayed
});