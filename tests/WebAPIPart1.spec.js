const {test, expect, request}= require('@playwright/test');
const {APIUtils}= require('../Utils/APIUtils');
const loginPayload= {userEmail: "debojeet.bhattacharya@tgmail.com", userPassword: "Abcd@1234"};
const orderPayload= {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll('API Automation', async() =>
    {
        const APIContext= await request.newContext();
        const apiUtils= new APIUtils(APIContext, loginPayload);
        response= await apiUtils.createOrder(orderPayload);
    } )

  test('WebAPI Automation', async({page})=>{

     await page.addInitScript(value =>
    {
        window.localStorage.setItem('token', value);
    }, response.token);

       await page.goto("https://rahulshettyacademy.com/client");
        
       await page.getByRole("button", {name:'  ORDERS'}).click();

      
const orderID= await page.locator(".ng-star-inserted");

for(let i=0; i< await orderID.count();++i){

    const orderText= await orderID.locator("[scope='row']").nth(i).textContent();
    await console.log("Orders are "+orderText);
    if(orderText==response.orderId){
        await console.log("Order ID's matched!!")
            break;
    }}
    




    }

)