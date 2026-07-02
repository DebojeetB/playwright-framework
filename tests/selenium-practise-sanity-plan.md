# Rahul Shetty Selenium Practise Sanity Plan

## Application Overview

Sanity test plan for the Rahul Shetty Selenium Practise storefront at https://rahulshettyacademy.com/seleniumPractise/#/. Includes core validation of page load, search, cart, checkout, and top deals navigation.

## Test Scenarios

### 1. Selenium Practise Sanity

**Seed:** `tests/seed.spec.ts`

#### 1.1. Home page loads and displays key elements

**File:** `tests/selenium-practise-sanity-plan.md`

**Steps:**
  1. -
    - expect: The browser navigates to https://rahulshettyacademy.com/seleniumPractise/#/.
    - expect: The page title and URL are correct.
  2. -
    - expect: The search box is visible.
    - expect: The product listing grid is visible.
    - expect: The cart icon or badge is visible.
    - expect: The header, logo, and footer/navigation elements are visible.
  3. -
    - expect: The page does not show browser errors.
    - expect: Core UI elements are enabled and ready for interaction.

#### 1.2. Product search filters results

**File:** `tests/selenium-practise-sanity-plan.md`

**Steps:**
  1. Enter a product name such as 'tomato' or 'cauliflower' into the search box.
    - expect: Search input accepts text.
  2. Verify that the product listing updates to show only matching items.
    - expect: Displayed products contain the search term.
    - expect: Non-matching products are hidden.
  3. -
    - expect: Search remains responsive and can be cleared or updated.

#### 1.3. Add a product to the cart

**File:** `tests/selenium-practise-sanity-plan.md`

**Steps:**
  1. Choose a visible product and click its 'ADD TO CART' button.
    - expect: The product is added to the cart.
  2. -
    - expect: The cart badge or count increments appropriately.
    - expect: The selected product appears in the cart summary.
  3. -
    - expect: The cart item name, quantity, and price are correct.

#### 1.4. Proceed to checkout

**File:** `tests/selenium-practise-sanity-plan.md`

**Steps:**
  1. Add a product to cart if none exists.
    - expect: Cart contains at least one item.
  2. Click the cart icon and then the Checkout button.
    - expect: The checkout page or modal opens.
  3. -
    - expect: Checkout page shows order summary, total amount, and a checkout action button.

#### 1.5. Navigate to Offers / Top Deals

**File:** `tests/selenium-practise-sanity-plan.md`

**Steps:**
  1. Click the Top Deals, Offers, or equivalent navigation link.
    - expect: The offers page loads successfully.
  2. -
    - expect: Offers page content is visible, including deals or discounted products.
  3. Return to the main shopping page.
    - expect: Navigation back to the home page works correctly.
