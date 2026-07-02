   const {test, expect}= require('@playwright/test');
   const {ParentPOM}= require('../PageObjectModel/ParentPOM');
   const testData= require('../PageObjectModel/ProductAddandPaymentTestData.json');
  
   test.only('First Playwright Test', async ({page})=>
   {    
      const parentPOM= new ParentPOM(page);

      //  1. Below locators are all added in LoginPage.js under PageObjectModel folder........... 
      const loginPage= parentPOM.loginPage();

      await loginPage.goTo();
      await loginPage.LoginScreen(testData.userName,testData.password);

   //  2. Below locators are all added in Dashboard.js under PageObjectModel folder........... 

      const dashboard= parentPOM.dashboard();  
      
      await dashboard.searchProduct(testData.productName);
      await expect(dashboard.cartCount).toBeVisible();
      await dashboard.goToCart();

      //  3. Below locators are all added in Payment.js under PageObjectModel folder........... 

      const payment= parentPOM.payment();

      const OrderID= await payment.cardPayment("1234567890121234","123", "Debojeet", testData.userName, "IND", "India");

      //  4. Below locators are all added in MyOrders.js under PageObjectModel folder........... 
   
         const myOrders= parentPOM.myOrders();

         await myOrders.myOrders(OrderID);


   });


