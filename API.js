const Base_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// const Base_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json";

const dropdowns = document.querySelectorAll(".dropdown select");//don't use only queryselector beacuse it is for only one not for all so use queryselectorAll
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg =document.querySelector(".msg");
const cont1 = document.querySelector(".container1");
const cont2= document.querySelector(".container2");
const exch = document.querySelector(".fa-solid");

document.addEventListener("load",()=>{
    updateExchangeRate();
})

// for (code in countryList){
//     console.log(code ,countryList[code]);
// }
for(select of dropdowns){
    for(currCode in countryList){
        // console.log(currCode);
        // let newOption = document.querySelector('option');//to access an option beacuse we have to  add all remaining countries code in option
        let newOption = document.createElement('option');//to create/add other country option in html
        newOption.innerText = currCode;
        newOption.value = currCode; // value in option in HTML from countryList
        // console.log(newOption);
        if(select.name === "from" && currCode === 'USD'){//as selected flag with country code initally  which is interface for user during access this website
            newOption.selected = "selected";
        }else if(select.name === 'to' && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);//target shows where change come and evt is an object in eventListner     //function call
    })
}

const updateExchangeRate=async(evt)=>{
    // console.log(evt);
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log('hte amount value is:',amtVal); 
    if(amtVal === "" || amtVal <1){
        amtVal=1;
        amount.value = "1";
    }
    // console.log("to get value for both : ",fromCurr.value.toLowerCase(),toCurr.value.toLowerCase());
//to create URL by using base url by removing /eur/.json
    // const URL = `${Base_URL}/${fromCurr}/${toCurr}.json`;  
    // const URL = `${Base_URL}/${fromCurr.vlaue}/${toCurr.value}.json`;   //it give value in upper case
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(response);
    console.log(data);
    // let rate = data(toCurr.value.toLowerCase());   --->//it give you error data is not function
    let rate = data[toCurr.value.toLowerCase()]; 
    console.log(rate);//exchange rate

    let finalAmount = amtVal*rate;
    // msg.innerText =`1USD =80INR`
    msg.innerText =`${amtVal} ${fromCurr.value}=${finalAmount}${toCurr.value}`
}
const updateFlag = (element)=>{
    console.log(element);
    let currCode=element.value;
    console.log(currCode);//to access country  currency code
    let countryCode = countryList[currCode];
    console.log(countryCode);//to access country code
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;//to access all cur country code
    let image = element.parentElement.querySelector("img");//we have to go in parent of select
    image.src = newSrc;//change sorce into new source
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();//means when refresh the page then all operation are perform by us like as page will not reload
    updateExchangeRate();
})

window.addEventListener("load",()=>{//window is used at the place of document
    updateExchangeRate();
})
// console.log(cont1);
// console.log(cont2);
// exch.addEventListener("click",async()=>{
//     let temp = await cont1;
//     cont1 = await cont2;
//     cont2 = await temp;
// })
