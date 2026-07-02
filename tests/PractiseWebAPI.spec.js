const {test, expect, request}= require('@playwright/test');
const {JSApiUtils}= require('../Utils/JSApiUtils');
const loginPayload= {userEmail: "debojeet.bhattacharya@tgmail.com", userPassword: "Abcd@1234"};
const orderPayload= {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll('API Automation', async()=>
{
   const APIContext= await request.newContext();
   const jsApiUtils= new JSApiUtils(APIContext, loginPayload);
    response= await jsApiUtils.createOrder(orderPayload);
    
})

   
test('WebAPI Automation', async({page})=>
{
     await page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

       await page.getByRole("button", {name:'  ORDERS'}).click();

      
const orderID= await page.locator(".ng-star-inserted");

// const orderCount= await orderID.count();

for(let i=0; i< await orderID.count();++i){

    const orderText= await orderID.locator("[scope='row']").nth(i).textContent();

    if(orderText==response.OrderId){
        await console.log("Order ID's matched!!")
            break;
    }
}
    






})

