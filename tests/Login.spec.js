const { test, expect } = require('@playwright/test');

const EMAIL = 'debojeet.bhattacharya@tgmail.com';
const PASSWORD = 'Abcd@1234';

test('UI login to Rahul Shetty client', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');

  const emailInput = page.locator("input[name='userEmail'], input#userEmail, input[placeholder*='Email'], input[type='email']").first();
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill(EMAIL);

  const passInput = page.locator("input[name='userPassword'], input#userPassword, input[placeholder*='Password'], input[type='password']").first();
  await passInput.fill(PASSWORD);

  const loginButton = page.getByRole('button', { name: /login|sign in|sign in|signin|Login/i });
  if (await loginButton.count() > 0) {
    await loginButton.first().click();
  } else {
    await page.locator("button[type='submit'], button:has-text('Login'), button:has-text('Sign In')").first().click();
  }

  // wait for navigation / dashboard indicator
  await page.waitForLoadState('networkidle');

  // verify that Orders / Your Orders is visible as an indication of successful login
  const ordersLocator = page.getByText(/Your Orders|ORDERS|Orders/i).first();
  await expect(ordersLocator).toBeVisible({ timeout: 15000 });
});
