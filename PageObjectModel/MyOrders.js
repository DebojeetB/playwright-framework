class MyOrders{

constructor(page){

    this.page=page;
    this.Order= page.locator("ul [routerlink='/dashboard/myorders']");    
    this.text= page.locator(".blinkingText");
    this.OrderItems= page.locator("[class='ng-star-inserted']");
    
}

async myOrders(OrderID){

     await this.Order.click();
     await console.log(await this.text.textContent());

   const OrderCount= await this.OrderItems.count();

   await console.log(OrderCount);

   for (let i=0; i<OrderCount; ++i){
      const text= await this.OrderItems.locator("[scope='row']").nth(i).textContent();
      
      if (text===OrderID){
         await console.log("Order ID matched");
         break;
      }}

    }
}

module.exports= {MyOrders};