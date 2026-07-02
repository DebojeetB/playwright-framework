const {test, expect}= require('@playwright/test');
const { log } = require('node:console');

test('First Playwright Test', async ({browser})=>
{
const context= await browser.newContext();
const page= await context.newPage();

const userName= page.locator("#username");
const password= page.locator("#password");
const login= page.locator("[value='Sign In']");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());

await userName.fill("rahulshetty");
await password.fill("Learning@830$3mK2");
await login.click();

console.log(await page.locator("[style*='block']").textContent());

await userName.fill("");
await userName.fill("rahulshettyacademy");
await login.click();

console.log(await page.locator(".card-body a").first().textContent());

console.log(await page.locator(".card-body a").allTextContents());

});



test.only('Check Radioboxes', async ({browser})=> {

const context= await browser.newContext();
const page= await context.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const radioButton= page.locator(".checkmark").last();
await radioButton.click();

await page.locator("#okayBtn").click();

await expect (radioButton).toBeChecked();
console.log(await radioButton.isChecked());
const userName= page.locator("#username");
const dropdown= page.locator("select.form-control");
await dropdown.selectOption("consult");
const blinkingText= page.locator("[target='_blank']");
await expect(blinkingText).toHaveAttribute("class","blinkingText");

const [page2]= await Promise.all(
    [
    context.waitForEvent("page"),
    blinkingText.click()
    ])

const textMsg= await page2.locator(".red").textContent(); 
console.log(textMsg);

const dummy= textMsg.split("@");
const emailID= dummy[1].split(" ")[0];

await userName.fill(emailID);

await page.pause();

});


















test('Second Playwright Test', async ({page})=>
{
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle("Google");
    console.log(await page.title());

});