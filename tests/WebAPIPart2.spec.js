const {test, expect}=require('@playwright/test');

let webContext;

test.beforeAll(async ({browser})=>{

const context= await browser.newContext();
const page= await context.newPage();

   const EmailID= "debojeet.bhattacharya@tgmail.com";
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(EmailID);
   await page.locator("#userPassword").fill("Abcd@1234");
   await page.locator("[value='Login']").click();

   await expect (page.locator(".card-body b").nth(0)).toBeVisible();
   
   await context.storageState({path : 'state.json'});
   webContext= await browser.newContext({storageState: 'state.json'});

})

test('Second API related TC', async ()=>{

    const page= await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
     await page.locator(".card-body b").first().waitFor();

   const titles = await page.locator(".card-body b").allTextContents();
   await console.log(titles); 
    await page.pause();

})