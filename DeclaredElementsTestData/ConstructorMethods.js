const testData= require('./TestData.json');
class ConstructorMethods{

constructor(page, token){

this.page= page;
this.token= token;
this.cartItem= page.locator(".card-body");
this.goToCart= page.locator("//*[@routerlink='/dashboard/cart']");
this.checkout= page.getByRole('button', {name:'Checkout'});
this.country= page.getByPlaceholder('Select Country');
this.placeOrder=page.locator(".action__submit");

}

async getPageDetails(){

      await this.page.addInitScript(value=>{
      window.localStorage.setItem('token',value)
   }, this.token);

   await this.page.goto(testData.dashurl);
}

async AddToCart(productName){
    const itemName= await this.cartItem.filter({hasText:productName}).getByRole('button', {name:' Add To Cart'});
    await itemName.click();
}

async addCartItems(){

    await this.goToCart.click();
    const price= await this.page.locator(".prodTotal").allTextContents();
    
const priceList= await price.map(price => Number(price.replace(/[^\d]/g, ''))).reduce((sum,price)=>sum+price,0);
const totalCost= Number((await this.page.locator(".totalRow .value").nth(1).textContent()).replace(/[^\d]/g,''));

return{priceList,totalCost};

}

async addMultilpleWindows(){

    const [pageTwo]= await Promise.all([
        this.page.context().waitForEvent('page'),
        await this.page.locator(".blinkingText").click()
    ])
    await pageTwo.waitForLoadState();

    await pageTwo.getByText("Visit FAQ Page").click();
    await pageTwo.locator("[href='/authentication']").click();
    // await this.page.bringToFront(); 

    /*
    The above code (line 52) is used to navigate back to previous tab/parent tab. I have commented it
    because I am running a new test case so anyways the browser would relaunch and the child tab would 
    no longer be visible. 
    */
    
    return pageTwo;
}

async checkOutandValidate(country, countryName){

    await this.goToCart.click();
    await this.checkout.click();
    await this.country.pressSequentially(country);
    await this.page.getByRole('button', {name:countryName}).click();
    await this.placeOrder.click();

}
}
module.exports= {ConstructorMethods};