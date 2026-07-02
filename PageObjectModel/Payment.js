class Payment{

constructor(page){

    this.page= page;
    this.cardDetails= page.locator(".field [type='text']");
    this.EmailVerification= page.locator("[style*='lightgray']");
    this.Country= page.locator("[placeholder='Select Country']");
    this.dropDownValues= page.locator(".ta-results");
    this.SubmitButton= page.locator(".action__submit");
    this.orderID= page.locator(".em-spacer-1 .ng-star-inserted");
   
}

async cardPayment(cardNum, CVV, CardHolderName, EmailID, countryCode, country ){

   await this.cardDetails.nth(0).fill(cardNum);
   await this.cardDetails.nth(1).fill(CVV);   
   await this.cardDetails.nth(2).fill(CardHolderName);

   await this.EmailVerification.textContent();
   
   if(await this.EmailVerification===EmailID){
     await  console.log("Email ID Verification completed.");
   }

   await this.Country.pressSequentially(countryCode, {delay:150});

   await this.dropDownValues.waitFor();
   
   await this.page.locator("//*[text()=' "+ country+"']").click();
  

   await this.SubmitButton.click();
   
   const order= await this.orderID.textContent();
   const OrderID= order.split("|")[1].trim();
     await console.log(OrderID);
     return OrderID;
    }
}
module.exports= {Payment};