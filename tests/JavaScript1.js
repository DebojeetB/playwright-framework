class JavaScript1{

createArray(){

    console.log("Hello");
}}

const array= new JavaScript1();

array.createArray();

const productPrice= [50,10,100,200,140,55,60]

const discountedPrices= productPrice.map(num=> {

    return num- (num*10/100);
} );
console.log(discountedPrices);

const affordableProducts= discountedPrices.filter(num=>{
    return num<50;
})
console.log(affordableProducts);

const totalCostofDiscountedProducts= affordableProducts.reduce((num,sum) =>{
    return num+sum;
},0);
console.log(totalCostofDiscountedProducts);

const totalCost= productPrice
.map(num=> {return num- (num*10/100)})
.filter(num=> {return num<50})
.reduce((sum,num)=>{return sum+num});

console.log(totalCost);