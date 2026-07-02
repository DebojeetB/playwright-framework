const {test, expect}= require('@playwright/test');

test('Get By Label', async({browser}) => {

const context= await browser.newContext();
const page= await context.newPage();

await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").click();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("Debojeet");
await page.getByRole("button", {name: 'Submit'}).click();
await expect (page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
await page.getByRole("link", {name: 'Shop'}).click();
await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name:"Add"}).click();












});














