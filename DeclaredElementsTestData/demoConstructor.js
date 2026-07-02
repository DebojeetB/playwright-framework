class demoConstructor{

constructor(page,token){

    this.page=page;
    this.token=token;
}

async getPageDetails(url){

    await this.page.addInitScript(value=>{
    window.localStorage.setItem('token',value)
},this.token);

await this.page.goto(url);
}


}

module.exports={demoConstructor};