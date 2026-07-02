const {expect, test, request}= require('@playwright/test');
const loginPayload= {userEmail: "debojeet.bhattacharya@tgmail.com", userPassword: "Abcd@1234"};
let token;
const fakePayLoadOrders = { data: [], message: "No Orders" };
test.beforeAll('Call API', async ()=>{

const APIContext= await request.newContext();
const loginResponse= await APIContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: loginPayload});
    
const jsonResponse= await loginResponse.json();
 token= await jsonResponse.token;
       
  await console.log(token); 

})

test('Mock API Response', async ({browser})=>{

const context= await browser.newContext();
const page= await context.newPage();

await page.addInitScript(value=>{
    window.localStorage.setItem('token',value)
}, token);

await page.goto('https://rahulshettyacademy.com/client');

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route=>
{
    const response= await page.request.fetch(route.request());
    
   await route.fulfill({
        response,
        body : JSON.stringify(fakePayLoadOrders)
    });
 
});

await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
})