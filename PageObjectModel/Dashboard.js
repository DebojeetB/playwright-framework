class Dashboard{

constructor(page){
    this.page=page;
    this.ProductsText= page.locator(".card-body b");
    this.cartCount= page.locator("[style*=padding-left]");
    this.cart= page.locator("[routerlink*=cart]");
    this.Products= page.locator(".card-body")
    this.checkout= page.locator("text=Checkout");
     }
  
     async searchProduct(productName){

 await this.ProductsText.first().waitFor();

   const titles = await this.ProductsText.allTextContents();
   await console.log(titles); 

   for(let i=0; i< await this.Products.count(); ++i){

      if(await this.Products.nth(i).locator("b").textContent() === productName){

      await this.Products.nth(i).locator("text= Add To Cart").click();
      break;
     }}   
    
     }

     async goToCart(){

        await this.cart.click();
        await this.checkout.click();
     }
    }

   
module.exports= {Dashboard};