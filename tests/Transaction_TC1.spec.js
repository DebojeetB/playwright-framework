const {test, expect, request}= require('@playwright/test');
const {APIandExcelDetails}= require('../DeclaredElementsTestData/APIandExcelDetails');
const {ConstructorMethods}= require('../DeclaredElementsTestData/ConstructorMethods');
const testData= require('../DeclaredElementsTestData/TestData.json');

let token;
let methods;

/* What I have done in this code:
1. Created a API and Excel file where I have declared details of API for Login and one excel file from
where I am fetching value of one item that is to be added to cart
2. I have created a Constructor file where I have declared the constructors and different methods to 
execute the test case. Methods contain test steps to perform actions like clicking any item.
 ConstructorMethods file name
 3. In first 2 test cases, I am adding one item each in each execution to cart and then in third test case, 
 I am adding the item from excel file.
*/

test.beforeAll('Generate Token', async({})=>{

  const APIContext= await request.newContext();
  const apiDetail= new APIandExcelDetails(APIContext);

  token=await apiDetail.getToken(testData.loginurl, testData.payload);

})

test.beforeEach(async ({page})=>{

  methods= await new ConstructorMethods(page,token);
  await methods.getPageDetails();

})

test('first Selection from Dashboard', async ({page})=>{

await methods.AddToCart(testData.prod1);

})

test('Second selection from Dashboard', async ({page})=>{

await methods.AddToCart(testData.prod2);

})

test('Third selection from Dashboard', async ({page})=>{

const excel= await new APIandExcelDetails();
const inputValue= await excel.getExcelValue();

await methods.AddToCart(inputValue);


})

test('addToCart', async({page})=>{

await methods.AddToCart(testData.prod1);
const {priceList, totalCost}= await methods.addCartItems();

// await expect(priceList).toBe(totalCost);
// const orderNumbers= await page.locator("tr.ng-star-inserted td.em-spacer-1 label.ng-star-inserted").allTextContents();

})

test('Validate multiple window handles',  async({page})=>{

const pageTwo=await methods.addMultilpleWindows();
})

test('purchase&Validate', async({page})=>{

await methods.AddToCart(testData.prod1);
await methods.checkOutandValidate("aus", " Australia");
await page.locator(".hero-primary").waitFor();
const order= await page.locator("td.em-spacer-1 label").filter({hasText:'|'}).allTextContents();

const orderIDs=await order.map(order => order.replace(/\|/g,'').trim());

await page.locator(".btn").filter({hasText:'  ORDERS'}).click();

await page.getByText("Your Orders").waitFor();

const allOrders= await page.locator("tr th[scope='row']").allTextContents();

await console.log(allOrders);

for(const order of orderIDs){
  expect(allOrders).toContain(order);
}
await console.log("Orders validated successfully");

})



