// spec: tests/selenium-practise-sanity-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://rahulshettyacademy.com/seleniumPractise/#/';
const OFFERS_URL = 'https://rahulshettyacademy.com/seleniumPractise/#/offers';

test.describe('Selenium Practise Sanity', () => {
  test('Home page loads and displays key elements', async ({ page }) => {
    // 1. Navigate to https://rahulshettyacademy.com/seleniumPractise/#/.
    const errors = [];
    page.on('pageerror', error => errors.push(error));
    await page.goto(BASE_URL);

    // 2. Verify the page title and URL are correct.
    await expect(page).toHaveURL(/seleniumPractise\/#\//);
    await expect(page).toHaveTitle(/GreenKart|Rahul Shetty|Vegetables|Fruits/i);

    // 3. Verify the search box is visible.
    const searchInput = page.locator('input.search-keyword');
    await expect(searchInput).toBeVisible();

    // 4. Verify the product listing grid is visible.
    const productsGrid = page.locator('.products');
    await expect(productsGrid).toBeVisible();

    // 5. Verify the cart icon or badge is visible.
    const cartInfo = page.locator('.cart-info');
    await expect(cartInfo).toBeVisible();

    // 6. Verify the header, logo, and footer/navigation elements are visible.
    await expect(page.locator('.brand')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // 7. Verify the page does not show browser errors.
    expect(errors).toHaveLength(0);
  });

  test('Product search filters results', async ({ page }) => {
    // 1. Enter 'tomato' into the search box.
    await page.goto(BASE_URL);
    const searchInput = page.locator('input.search-keyword');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('tomato');

    // 2. Verify the search input accepts text.
    await expect(searchInput).toHaveValue(/tomato/i);

    // 3. Verify the product listing updates to show only matching items.
    const visibleProducts = page.locator('.products .product:visible');
    const visibleCount = await visibleProducts.count();
    expect(visibleCount).toBeGreaterThan(0);
    const visibleTitles = await visibleProducts.locator('h4').allTextContents();

    // 4. Verify displayed products contain the search term.
    for (const title of visibleTitles) {
      expect(title.toLowerCase()).toContain('tomato');
    }

    // 5. Verify non-matching products are hidden.
    const allProducts = page.locator('.products .product');
    const totalCount = await allProducts.count();
    for (let i = 0; i < totalCount; ++i) {
      const item = allProducts.nth(i);
      const title = (await item.locator('h4').textContent()).toLowerCase();
      if (!title.includes('tomato')) {
        await expect(item).toBeHidden();
      }
    }
  });

  test('Add a product to the cart', async ({ page }) => {
    // 1. Refresh the page and choose a visible product.
    await page.goto(BASE_URL);
    await page.locator('.product').first().waitFor();
    const firstProduct = page.locator('.product').first();
    const productName = (await firstProduct.locator('h4').textContent()).trim();

    // 2. Click its 'ADD TO CART' button.
    await firstProduct.locator('button:has-text("ADD TO CART")').click();

    // 3. Verify the product is added to the cart.
    const cartCount = page.locator('.cart-info .cart-count');
    await expect(cartCount).toHaveText('1');

    // 4. Verify the cart badge or count increments.
    await expect(cartCount).toBeVisible();

    // 5. Verify the selected product appears in the cart summary.
    await page.locator('.cart-info').click();
    const cartPreview = page.locator('.cart-preview');
    await expect(cartPreview).toBeVisible();
    await expect(cartPreview.locator('.product-name')).toContainText(productName);
  });

  test('Proceed to checkout', async ({ page }) => {
    // 1. Add a product to cart if none exists.
    await page.goto(BASE_URL);
    await page.locator('.product').first().waitFor();
    await page.locator('.product').first().locator('button:has-text("ADD TO CART")').click();

    // 2. Click the cart icon and then the Checkout button.
    await page.locator('.cart-info').click();
    await page.locator('button:has-text("PROCEED TO CHECKOUT")').click();

    // 3. Verify the checkout page or modal opens.
    await expect(page).toHaveURL(/cart/);

    // 4. Verify the checkout page shows order summary, total amount, and a checkout action button.
    await expect(page.locator('span.totAmt')).toBeVisible();
    await expect(page.locator('button:has-text("Place Order")')).toBeVisible();
  });

  test('Navigate to Offers / Top Deals', async ({ page }) => {
    // 1. Click the Top Deals or Offers navigation link.
    await page.goto(BASE_URL);
    const topDealsLink = page.locator('a:has-text("Top Deals")');
    await expect(topDealsLink).toBeVisible();
    await topDealsLink.click();

    // 2. Verify the offers page loads successfully.
    await expect(page).toHaveURL(OFFERS_URL);

    // 3. Verify offers page content is visible, including deals or discounted products.
    await expect(page.locator('.products')).toBeVisible();
    await expect(page.locator('h1, h2, h3, h4')).toContainText(/Top Deals|Deals|Offer/i);

    // 4. Return to the main shopping page and verify navigation back works.
    await page.locator('.brand').click();
    await expect(page).toHaveURL(BASE_URL);
  });
});
