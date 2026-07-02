const {test, expect}= require('@playwright/test');
test('Frames', async ({page}) =>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator(".displayed-class")).toBeVisible();

await page.locator("#hide-textbox").click();
await expect(page.locator(".displayed-class")).toBeHidden();

await page.locator("#alertbtn").click();
page.on('dialog', dialog=> dialog.accept);

await page.locator("#mousehover").hover();
 


const frame= await page.frameLocator("#courses-iframe");

await frame.locator("li a[href*='consulting']").nth(1).click();

await page.pause();

}
)