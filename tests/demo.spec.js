const {test,request,expect} = require('@playwright/test');
const testData= require('../DeclaredElementsTestData/TestData.json');
const {demoAPI}= require('../DeclaredElementsTestData/demoAPI');
const {demoConstructor}= require('../DeclaredElementsTestData/demoConstructor');

let token;
let method;

test.beforeAll('Declare Pre-rquisites', async ({})=>{

const APIContext= await request.newContext();
const demoapi= await new demoAPI(APIContext);

token= await demoapi.getToken(testData.loginurl, testData.payload);
})

test.beforeEach('Declare Page', async ({page})=>{

method= await new demoConstructor(page,token);
await method.getPageDetails(testData.dashurl);

})

test('Adding first cartElement', async ({page})=>{

    await console.log(token);
    await page.pause();


})