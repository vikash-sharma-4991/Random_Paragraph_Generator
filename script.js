const inputNum = document.getElementById("num-input");
const inputOpt = document.getElementById("opt-input");
const genBtn = document.getElementById("gen-btn");
const genContent = document.querySelector(".gen-content");
const copyBtn = document.getElementById("copy-btn");


let count = 5;
let options = "paras";

genBtn.addEventListener("click", () => {
    getValues()
})

function getValues(){
    count = inputNum.value;
    options = inputOpt.value;

    validateValue();

    // console.log(count, options)

    let url = `https://baconipsum.com/api/?type=meat-and-filler&${options}=${count}&start-with-lorem=1`;

    fetchContent(url);
}

async function fetchContent(url){
    let response = await fetch(url);

    if (response.status === 200){
        let data = await response.json();
        // console.log(data);
        displayGenContent(data);
    }else{
        alert("an error occured")
    }
}

function displayGenContent(data){
    let texts = "";
    texts = data.join("<br><br>");

    genContent.innerHTML = texts;
}

function validateValue(){
    let tempCount = "";
    if(count > 100){
        invalidInput();
        count = 100;
        inputNum.value = "100"
    }else if(count<1 || isNaN(count)){
        invalidInput();
        count = 5;
        inputNum.value = "5";
    }
}

function invalidInput(){
    inputNum.style.borderColor = "#ff6a67";

    setTimeout(() => {
        inputNum.style.borderColor = "#d3deb4";
    },3000)
}

copyBtn.addEventListener("click", () => {
    let copyText = genContent.textContent;
    navigator.clipboard.writeText(copyText);
})