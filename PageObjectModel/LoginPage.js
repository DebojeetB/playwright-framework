class LoginPage{

    constructor(page){
 
    this.page= page;
    this.EmailID= page.locator("#userEmail");
    this.Password= page.locator("#userPassword");
    this.LoginClick= page.locator("[value='Login']");
    }

    async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client");
    }

   async LoginScreen(emailID, password){

   await this.EmailID.fill(emailID);
   await this.Password.fill(password);
   await this.LoginClick.click();
    }

}
module.exports= {LoginPage};