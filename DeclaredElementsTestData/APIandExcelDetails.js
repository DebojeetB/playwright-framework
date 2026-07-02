const excelJS= require('exceljs');

class APIandExcelDetails{

constructor(APIContext){

    this.APIContext= APIContext;
}

async getToken(loginURL, loginPayload){

     const loginResponse= await this.APIContext.post(loginURL,{data:loginPayload});

    const jsonResponse= await loginResponse.json();
    const token= jsonResponse.token;
    
    return token;
    
}

async getExcelValue(){

const workBook= new excelJS.Workbook();
await workBook.xlsx.readFile("C:/Users/RDRL/Desktop/PlaywrightData.xlsx");
const workSheet= workBook.getWorksheet("Items");
const itemSelect= workSheet.getRow(2).getCell(2);

return itemSelect;

}
}
module.exports= {APIandExcelDetails};