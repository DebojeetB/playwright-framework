const {LoginPage}= require('../PageObjectModel/LoginPage');
const {Dashboard}= require('../PageObjectModel/Dashboard');
const {Payment}= require('../PageObjectModel/Payment');
const {MyOrders}= require('../PageObjectModel/MyOrders');

class ParentPOM{

constructor(page){
    this.page= page;
    this.loginPageObj= new LoginPage(page);
    this.dashboardObj= new Dashboard(page); 
    this.paymentObj= new Payment(page);
    this.myOrdersObj= new MyOrders(page)
}

loginPage(){
    return this.loginPageObj;
}
dashboard(){
    return this.dashboardObj;
}
payment(){
    return this.paymentObj;
}
myOrders(){
    return this.myOrdersObj;
}

}
module.exports= {ParentPOM};