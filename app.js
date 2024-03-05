const BASEURL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");//select of Dropdowns

const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select")

const msg=document.querySelector(".msg"); 

 
/*
for(code in countryList)
{
    console.log(code,countryList[code]);
}*/



for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption=document.createElement("option");/*the createElement method is used to create a new HTML element.
        //  When you use createElement("option"), it specifically creates an HTML <option> element.*/
        newOption.innerText=currCode;//currencycode
        newOption.value=currCode;

        if(select.name === "from" && currCode === "USD")
        {
            newOption.selected="selected";
        }else if (select.name === "to" && currCode === "INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);//add in select
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);/*evt.target refers to the object that triggered the event.
        the event handler is associated with a <select> element, and evt.target would refer to that specific <select> element.*/

    });
}

const updateFlag=(element) => {
    //console.log(element);
    let currCode=element.value;
    //console.log(currCode);

    let countryCode=countryList[currCode];/*with the help of currencyCode 
                                            we get countyCode*/
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;/* Inside the template literal, ${countryCode} is a placeholder for the value of the variable countryCode.
     This allows dynamic construction of the URL based on the value of countryCode.*/


     /*element = select tag
       parentElement = img tag is the parent of select tag*/

    let img=element.parentElement.querySelector("img");//parent of select
    img.src=newSrc;//change the flag

};


/*Asynchronous functions in JavaScript are used to handle operations that may take some time to complete,
 such as fetching data from an external source, reading files, making network requests, or executing time-consuming computations.*/
const updateExchangeRate = async()=>{
    let amount=document.querySelector(".amount input");

    let amountval=amount.value;

    if(amountval < 1 || amountval ==="")
    {
        amountval=1;
        amount.value="1";
    }
    //  console.log(amountval);
   //console.log(fromCurr,toCurr);

   // Constructing the URL using template literals
    const URL=`${BASEURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
                                           /*URL are consistently in lowercase. This is important for compatibility with APIs 
                                                        or services that may expect lowercase values in their URLs.*/

    // Using the 'fetch' function to make an asynchronous HTTP request
    let response= await fetch(URL);
   // console.log(response);

   // Parsing the response body as JSON
    let data=await response.json();
   // console.log(data);


     // Extracting the exchange rate from the JSON data
   let rate=data[toCurr.value.toLowerCase()];         //This helps avoid issues related to case sensitivity, 
   //console.log(rate);

   // Calculating the final amount after conversion
   let finalAmout=amountval*rate;

   // Updating the content of the 'msg' element with the conversion result
   msg.innerText =`${amountval}${fromCurr.value} = ${finalAmout} ${toCurr.value}`


};
    

btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();   // Its purpose is to prevent the default action associated with the click event
    updateExchangeRate();   

});


window.addEventListener("load", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
    
})