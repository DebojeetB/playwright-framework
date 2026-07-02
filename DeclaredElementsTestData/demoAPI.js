class demoAPI{

constructor(APIContext){

this.APIContext= APIContext;
// this.loginURL= loginURL;
// this.loginPayload= loginPayload;

}

async getToken(loginURL,loginPayload){

const APIResponse= await this.APIContext.post(loginURL, {data:loginPayload});
const apijson= await APIResponse.json();
const token= apijson.token;
return token;
}
}

module.exports={demoAPI};