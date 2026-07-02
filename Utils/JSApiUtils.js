class JSApiUtils{

    constructor(APIContext, loginPayload){

        this.APIContext= APIContext;
        this.loginPayload= loginPayload;
    }

async getToken(){

const loginResponse= await this.APIContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:this.loginPayload});
             
            const jsonResponse= await loginResponse.json();
            const token= await jsonResponse.token;
    
            await console.log(token);

            return token;
}

async createOrder(orderPayload){

    let response={};
    response.token= await this.getToken();
     const orderResponse= await this.APIContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 

           {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }})

            const orderResponseJson= await orderResponse.json();
           const OrderId= await orderResponseJson.orders[0];

           await console.log("Order ID is "+OrderId);
           response.OrderId= OrderId;
           return response;
           
}}

module.exports= {JSApiUtils};