const excelJS= require('exceljs');
const {test, expect}= require('@playwright/test')

async function writeexcelData(searchText, replaceText, updatedValue, sheetNumber, filePath){


const workBook= new excelJS.Workbook();
await workBook.xlsx.readFile(filePath);

const workSheet= workBook.getWorksheet(sheetNumber);

const rowDetails=await readExcelData(workSheet, searchText);

console.log(rowDetails.rowNum, rowDetails.colNum);

const cell1= workSheet.getCell(rowDetails.rowNum, rowDetails.colNum);
cell1.value=replaceText;

const cell2= workSheet.getCell(rowDetails.rowNum, rowDetails.colNum+2);
cell2.value= updatedValue;

await workBook.xlsx.writeFile(filePath);
}

async function readExcelData(workSheet, searchText){

    let rowDetails= {rowNum:1, colNum:1};
    workSheet.eachRow((row, rowNumber)=>{

    row.eachCell((cell, colNumber)=>{

        if(cell.value===searchText){
            
            rowDetails.rowNum= rowNumber;
            rowDetails.colNum=colNumber;
          }
    })
}) 
return rowDetails;
}

test('First Excel Playwright',async({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const waitforDownload= page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();

    const Download= await waitforDownload;

    await Download.saveAs("C:/Users/RDRL/Desktop/download.xlsx");

    await writeexcelData('Banana',"Mausambi","350","Sheet1","C:/Users/RDRL/Desktop/download.xlsx");

    // await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:/Users/RDRL/Desktop/download.xlsx");

    // await expect(page.locator(".Toastify__toast-icon")).toBeVisible();

    await expect(page.getByText('Updated Excel Data Successfully.')).toBeVisible();

    // await page.pause();
})

