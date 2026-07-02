const {test, expect}= require('@playwright/test');
const { log } = require('node:console');

test('First Playwright Test', async ({page})=>
{
   const EmailID= "debojeet.bhattacharya@tgmail.com";
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(EmailID);
   await page.locator("#userPassword").fill("Abcd@1234");
   await page.locator("[value='Login']").click();

   // await page.waitForLoadState('networkidle');/
   await page.locator(".card-body b").first().waitFor();

   const titles = await page.locator(".card-body b").allTextContents();
   await console.log(titles); 

   const Products= await page.locator(".card-body");
   // const Count= await Products.count();

   for(let i=0; i< await Products.count(); ++i){

      if(await Products.nth(i).locator("b").textContent() === "ZARA COAT 3"){

      await Products.nth(i).locator("text= Add To Cart").click();
      break;
     }}

  const cartCount= await page.locator("[style*=padding-left]");

    await expect(cartCount).toBeVisible();
    await page.locator("[routerlink*=cart]").click();


     await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

     await page.locator("text=Checkout").click();

   //   const CVV= await page.locator(".field.small").nth(1);

   //   await CVV.locator(".input").fill("123");

   await page.locator(".field [type='text']").nth(0).fill("1234567890121234");
   await page.locator(".field [type='text']").nth(1).fill("123");   
   await page.locator(".field [type='text']").nth(2).fill("Debojeet");

   const EmailVerification= await page.locator("[style*='lightgray']").textContent();
   
   if(await EmailVerification===EmailID){
     await  console.log("Email ID Verification completed.");
   }

   await page.locator("[placeholder='Select Country']").pressSequentially("IND", {delay:150});

   const dropDownValues= await page.locator(".ta-results");
   await dropDownValues.waitFor();
   await page.locator("//*[text()=' India']").click();
   await console.log(".............Selected India.................");

   // const optionCount= await dropDownValues.locator("button").count();

   // for(let i=0; i<optionCount; ++i){

   //     const text= await dropDownValues.locator("button").nth(i).textContent();
   //     if (text=== " India"){
   //       await dropDownValues.locator("button").nth(i).click();
   //       break;
   //     }}

   await page.locator(".action__submit").click();
   const Or= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

     const ord= Or.split("|");
     const OrderID= ord[1].trim();  
      await console.log(OrderID);
   

   await page.locator("ul [routerlink='/dashboard/myorders']").click();

   const Blink= await page.locator(".blinkingText").textContent();

   await console.log(Blink);

   const OrderItems= await page.locator("[class='ng-star-inserted']");

   const OrderCount= await OrderItems.count();

   await console.log(OrderCount);
   for (let i=0; i<OrderCount; ++i){
      const text= await OrderItems.locator("[scope='row']").nth(i).textContent();
      
      if (text===OrderID){
         await console.log("Order ID matched");
         break;
      }}
           
   await page.pause();

});


