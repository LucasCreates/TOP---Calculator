const button = document.querySelectorAll("button");
const btn = document.querySelectorAll("[data-number]")
const operand = document.querySelectorAll("[data-operator]")
const equalBtn = document.querySelector("[data-equals]")
const clearBtn = document.querySelector("[data-clear]")
const delBtn = document.querySelector("[data-del]")
const decimalBtn = document.querySelector("[data-decimal]")
const expoBtn = document.querySelector("[data-exponant]")
const squareBtn = document.querySelector("[data-square]")
const plusMinusBtn = document.querySelector("[data-plus-minus]")
const advanceMode = document.querySelector(".advance");
const basicMode = document.querySelector(".basic");
const bracketBtn = document.querySelector("[data-bracket]")
// const br = document.createElement("BR")

let firstValue = "";
let setFirstValue = 0;
let secondValue = "";
let setSecondValue = 0;
let result = 0;
let operator = "";
let setOperator;
let expo;
let advanceOptions = false;
let isBracketSelected = false;
// let expoSpan;

let isOperationComplete = false;
let currentOperation = 0; // this will determine what operation the user is on. 0 = first number, 1 = operand and 2 = second number 3 = operate for results
let isExpoOption = false; // if user has pressed the square button.
let isExpoNumber = false; // when user chooses an exponant number.


const screen = document.querySelector(".screen");
const currentValue = document.querySelector(".current");
const previousValue = document.querySelector(".previous");

const advanceBtn = document.querySelector("#adv")

const backBtn = document.querySelector("#back")

////////////////////////////////////////////////////////////////////////

// Buttons

btn.forEach((button) =>{
    button.addEventListener("click", () => {setNumToScreen(button.textContent)})
})
operand.forEach((op) =>{
    op.addEventListener("click", () => {setOperandScreen(op.value)})
})

equalBtn.addEventListener("click", () => {evaluateOperation()});
decimalBtn.addEventListener("click", () => {decimalPoint(decimalBtn.value)});
clearBtn.addEventListener("click", () => {clearScreen()});
delBtn.addEventListener("click", () => {del()});
expoBtn.addEventListener("click", () => {expoNum()});
plusMinusBtn.addEventListener("click", () => {checkVariables()});
advanceBtn.addEventListener("click", () => {moreOption()})
backBtn.addEventListener("click", () => {moreOption()})
bracketBtn.addEventListener("click", () => {bracket()})

////////////////////////////////////////////////////////////////////////

// Keyboard functionality
function setKeyboard(event){
    let key = event.key
    if(key >= "0" && key <= "9"){setNumToScreen(key)}
    if(key === "+" || key === "-" || key === "*" || key === "/"){setOperandScreen(key)}
    if(key === "Enter"){operate(firstValue, operator, secondValue)}
    if(key === "Escape"){clearScreen()}  
}

window.addEventListener("keydown", setKeyboard)
////////////////////////////////////////////////////////////////////////


function setNumToScreen(value){
        removeZero()
        preventTextExpand()
        
        currentValue.textContent += value;
        if (isExpoNumber){
            setExpoNumber(value)
        }
     
        
}

function setExpoNumber(value){ // this function does the calculation when user selects what exponant number to use.
    currentValue.textContent = currentValue.textContent.toString().slice(0, -1);
    currentValue.textContent = currentValue.textContent.toString().slice(0, -1);
    expo.textContent = value;
    return currentValue.textContent = Math.pow(Number(currentValue.textContent), Number(expo.textContent))
}

function setOperandScreen(value){
        isExpoNumber = false
        firstValue = currentValue.textContent
        operator = value;
        
        currentValue.textContent = "0";
        
        previousValue.textContent = `${firstValue} ${operator}`;
        if(firstValue !== "" && operator !== "") {
            secondValue = currentValue.textContent
            operator = value
            currentValue.textContent = `${secondValue}`;
           
        }
}   
/////////////////////////////////////////////////////////////////

// Evaluate and print to screen functions
function evaluateOperation(){ 
    secondValue = currentValue.textContent
    operate(firstValue, operator, secondValue)
}
function displayResults(){

    if (result == Infinity){
        return impossible();
    }
    return previousValue.textContent = `${firstValue} ${operator} ${secondValue} = ${result}`,
           currentValue.textContent = roundedResult(result)
}

function operate(firstValue, operator, secondValue){
    if (firstValue.includes("(") && firstValue.includes(")")){
        console.log("value has brackets")
        firstValue.toString().slice(0, -1);
        firstValue.toString().slice(0);
    }
    setFirstValue = Number(firstValue) // I've learnt that Number() also takes float operations whereas parseInt does not.
    setSecondValue = Number(secondValue)
        switch (operator){
        case "+":
            add(setFirstValue, setSecondValue);
            break;
        case "-":
            sub(setFirstValue, setSecondValue);
            break;
        case "÷":  
            divide(setFirstValue, setSecondValue);
            break;
        case "x":
            multiply(setFirstValue, setSecondValue);
            break;
        }
  
    return firstValue == 0 && operand == "" && secondValue == 0 ? true : displayResults()  
}
///////////////////////////////////////////////////////////////////





function add(firstNum, secondNum){
    result = firstNum + secondNum;
    return result;
}
function sub(firstNum, secondNum){
    result = firstNum - secondNum;
    return result;
}
function divide(firstNum, secondNum){
  
    result = firstNum / secondNum;
    return result;
    
}
function multiply(firstNum, secondNum){
    result = firstNum * secondNum;
    return result;
}





















function moreOption(){
    if (!advanceOptions){
        basicMode.style.display = "none";
        advanceMode.style.display = "inline";
        advanceOptions = true;
    }
    else {
        basicMode.style.display = "inline";
        advanceMode.style.display = "none";
        advanceOptions = false;
    }
}

//"²"
function expoNum(){
    if(!isExpoOption){
        // expoSpan = document.createElement("span")
        expo = document.createElement("sup")
        expo.classList.add("power")
        expo.textContent = "x";
        isExpoNumber = true;
        currentValue.appendChild(expo)
        
        return  
    }
}

function bracket(){
    removeZero()
    if (!isBracketSelected){
        console.log("bracket working true")
        currentValue.textContent  += "(";
        isBracketSelected = true
        
    }
   
    else{
        currentValue.textContent  += ")";
        console.log("bracket working false")
        isBracketSelected = false
        
    }
   

   

}

// function exponant(number){
//     // currentValue.style.animation = "blinkZero 1s infinite";
  
//    // (${exponant(currentValue.textContent)})
//     return number
//    // currentValue.textContent += "x" 
   
    
    
// }




function removeZero(){ // removes the blinking zero at the start before userinput
    if(currentValue.textContent === "0"){
        currentValue.textContent = "";
        currentValue.style.animation = "none";
        
    }
}

function preventTextExpand(){ // prevents text from expanding outside the div container. However, I aim to fix this with CSS so just a temp fix.
    // previousValue.style.fontSize = "20px"
    if(currentValue.textContent.length > 12){
        previousValue.style.fontSize = "16px"
        currentValue.style.fontSize = "28px";
        
        if(currentValue.textContent.length > 18){
            previousValue.style.fontSize = "12px"
            currentValue.style.fontSize = "20px";
            
        }
    }
}

function roundedResult(result){
   return Math.round(result * 10000000) / 10000000;
}



function decimalPoint(value){
    if(!currentValue.textContent.includes(".")){
       return currentValue.textContent += value;
    } 
    else {return;}
}


function del(){           
    previousValue.textContent = previousValue.textContent.toString().slice(0, -1);
    currentValue.textContent = currentValue.textContent.toString().slice(0, -1);
}


function reset(){
    isOperationComplete = false;
    currentOperation = 0;
    currentValue.textContent = "";
    previousValue.textContent = "";
    currentValue.style.animation ="none";
}




function clearScreen(){
    currentValue.textContent = "0";
    // currentValue.style.animation = "blinkZero 1s infinite";
    currentValue.style.fontSize = "37px";
    previousValue.textContent = "";
    firstValue = "";
    setFirstValue = 0;
    secondValue = "";
    setSecondValue = 0;
    result = 0;
    operator = "";
    setOperator;
    currentOperation = 0;
    isOperationComplete = false;
    isExpoOption = false;
    isExpoNumber = false;


}

function checkVariables(){
    console.log(`firstValue = ${firstValue}`)
    console.log(`operator = ${operator}`)
    console.log(`secondValue = ${secondValue}`)
    console.log(isExpoOption)
    console.log(`result = ${result}`)
 
    // console.log(`currentOperation = ${currentOperation}`)
    // console.log(`isOperationComplete = ${isOperationComplete}`)
    console.log(`setFirstNum = ${setFirstValue}`)
    console.log(`setSecondValue = ${setSecondValue}`)
}


function impossible(){
    let preMessage = "";
    let curMessage = "";
    currentValue.style.animation = "none";
    currentValue.style.fontSize = "12px";
    previousValue.style.fontSize = "12px";
 
    screen.style.overflow = "hidden";
    const cryptic = "afghiopqr:'@#stuvwxyz?;1234590,.<bcde>/~[{]}+=_-jklmn!£$%678^&*()";
    for(i = 0; i <= cryptic.length; i++){
        preMessage += cryptic.charAt(Math.floor(Math.random() * cryptic.length -6))
        curMessage += cryptic.charAt(Math.floor(Math.random() * cryptic.length -6))
        
    }
    return previousValue.textContent = `${preMessage} WARNING ${preMessage}`,
           currentValue.textContent = `${curMessage} OVERLOAD ${curMessage.slice(3, 7)} SELF-DESTRUCT`;
    
    
}

















//// Leaving this here before i delete to make sure i don't mess my code up


        // if(currentValue.textContent == "0"){
        //     currentValue.textContent = "";
        //     currentValue.style.animation ="none";
        // }
        // currentValue.textContent += value
        // firstValue = currentValue.textContent;
        // if(currentValue.textContent.length > 12){
        //     currentValue.style.fontSize = "28px";
        //     if(currentValue.textContent.length > 18){
        //         currentValue.style.fontSize = "20px";
        //         if(currentValue.textContent.length > 25){
        //             currentOperation == 1 // prevents further number input
                    
        //         }
        //     }
        // }






// Old code to compare

//

// for (const btn of button){
//     btn.addEventListener("click", function(e){
       

//         if(isSelectFirstNum && e.target.dataset.number ){
            
//             currentValue.textContent += e.target.dataset.number;
//             if(currentValue.textContent.length > 12){
//                 currentValue.style.fontSize = "30px"
//                 currentValue.style.marginRight = "0px"
//                 if (currentValue.textContent.length > 16){
//                     currentValue.style.fontSize = "20px"
//                     if (currentValue.textContent.length > 24){
//                         isSelectFirstNum = false;
//                     }
//                 }
//             }
  
//             firstNum.push(e.target.dataset.number);   
//             console.log(`firstNum in array form is ${firstNum}`)
//             setFirstNum = parseInt(firstNum.join(""))
//             console.log(`setFirstNum when array is joined is ${setFirstNum}`)
//             isSelectOperator = true;
            
//             // && currentValue.textContent.length < 16
//         }
//         if (isSelectOperator && e.target.dataset.operator){  
//             // operator = e.target.dataset.operator
//             operator.pop();
//             operator.push(e.target.dataset.operator)
//             secondNum = [];
//             if(operator[0] !== undefined){
//                 currentValue.textContent = null;
//                 previousValue.textContent = `${setFirstNum} ${operator[0]} `;
//                 isSelectFirstNum = false;
//                 isSelectSecondNum = true;    
//             }
          
            
//         }
//         if (isSelectSecondNum && e.target.dataset.number && isSelectOperator){
           
//             currentValue.textContent += e.target.dataset.number;
//             if(currentValue.textContent.length > 12){
//                 currentValue.style.fontSize = "30px"
//                 currentValue.style.marginRight = "0px"
//                 if (currentValue.textContent.length > 16){
//                     currentValue.style.fontSize = "20px"
//                     if (currentValue.textContent.length > 24){
//                         isSelectFirstNum = false;
//                     }
//                 }
//             }
//             secondNum.push(e.target.dataset.number);   
//             console.log(`secondNum in array form is ${secondNum}`)
//             setSecondNum = parseInt(secondNum.join(""))
//             console.log(`setSecondNum when array is joined is ${setSecondNum}`)
//             previousValue.textContent = `${setFirstNum} ${operator[0]} ${setSecondNum} `;
          
            
//         }
      

//         if (e.target.value === "adv"){moreOption()}
//         if (e.target.value === "."){convertToFloat()}
//         if (e.target.dataset.equals){ operate(setFirstNum, operator[0], setSecondNum)} // equating the results 
//         if (e.target.value === "ac"){clearScreen()};
//         if (e.target.value === "del"){del()};
       
//     }, false);
   
// }




// function operate(firstNum, op, secondNum){

//     isEqualSelected = true;
//     switch (op){
//         case "+":
//             previousValue.textContent = `${firstNum} ${op} ${secondNum} = ${add(firstNum, secondNum)}`;
//             currentValue.textContent = result;
//             break;
//         case "x":
//             previousValue.textContent = `${firstNum} ${op} ${secondNum} = ${multiply(firstNum, secondNum)}`;
//             currentValue.textContent = result;
//             break;
//         case "/":
//             previousValue.textContent = `${firstNum} ${op} ${secondNum} = ${divide(firstNum, secondNum)}`;
//             currentValue.textContent = result;
//             break;
//         case "-":
//             previousValue.textContent = `${firstNum} ${op} ${secondNum} = ${sub(firstNum, secondNum)}`;
//             currentValue.textContent = result;
//             break;
//     }
// }

// function add(firstNum, secondNum){
//     isEqualSelected = false;
//     result = firstNum + secondNum;
//     return Math.round(result * 100000) / 100000;
// }
// function sub(firstNum, secondNum){
//     result = firstNum - secondNum;
//     return Math.round(result * 100000) / 100000;
// }
// function divide(firstNum, secondNum){
//     result = firstNum / secondNum;
//     return Math.round(result * 100000) / 100000;
// }
// function multiply(firstNum, secondNum){
//     result = firstNum * secondNum;
//     return Math.round(result * 100000) / 100000;
// }



// function moreOption(){
//     if (!advanceOptions){
//         backBtn.style.display = "none";
//         advanceBtn.style.display = "inline";
//         advanceOptions = true;
//     }
//     else {
//         backBtn.style.display = "inline";
//         advanceBtn.style.display = "none";
//         advanceOptions = false;
//     }
// }

// function del(){ // This removes individual numbers from the screen
                // Currently can only remove first and second number
                // working on allowing to remove operator
                // Can still use once = is pressed which is not intended.
                
    // previousValue.textContent = previousValue.textContent.toString().slice(0, -1)
    // currentValue.textContent = currentValue.textContent.toString().slice(0, -1)
    // console.log("del is " + previousValue.textContent.toString().slice(0, -1))
    // previousValue.textContent = previousValue.textContent.toString().slice(0, -1)
    // currentValue.textContent = currentValue.textContent.toString().slice(0, -1)
  
    // let firstNumResult = setFirstNum.toString();
    // const delFirstDigit = firstNumResult.slice(0, -1);
    // console.log(Number(delFirstDigit))
    // setFirstNum = delFirstDigit
    // console.log(`setfirstNum is ${setFirstNum}`)

    // operator.pop();
    // console.log(operator[0])

    
    // let secondNumResult = setSecondNum.toString();
    // const delSecondDigit = secondNumResult.slice(0, -1);
    // console.log(Number(delSecondDigit))
    // setSecondNum = delSecondDigit
    // console.log(`setSecondNum is ${setSecondNum}`)

    // if (setFirstNum == 0 && setSecondNum == 0 && operator == [] ){
    //     console.log("everything is deleted")
    // }
    
    // if (isSelectFirstNum){
    //     firstNum.pop();
    //     // previousValue.textContent = previousValue.textContent.toString().slice(0, -1)
    //     currentValue.textContent = currentValue.textContent.toString().slice(0, -1)
    //     // currentValue.textContent = firstNum.join("");
    //     // isSelectFirstNum = false;
        
    // }
    
    // if (!isSelectOperator){
    //     isSelectFirstNum = false;
    //     operator.pop();
        
    //     previousValue.textContent = `${firstNum.join("")} ${operator}`;
    //     isSelectOperator = true;
    // }
    // if (isSelectSecondNum && !isSelectFirstNum){
    //     secondNum.pop();
    //     previousValue.textContent = `${firstNum.join("")} ${setOperator} ${secondNum.join("")}`;
    //     currentValue.textContent = secondNum.join("");
        
       
    // }
    // else if (isEqualSelected){
    //     console.log("equals has been selected")
    // }
// }
// console.log(operator)
// function clearScreen(){
//     currentValue.textContent = "0";
//     currentValue.style.fontSize = "37px"
//     previousValue.textContent = "";
//     firstValue = 0;
//     setFirstNum = 0;
//     secondValue = 0;
//     setSecondNum = 0;
//     result =0;
//     operator = "";
//     setOperator;
//     currentOperation = 0;
//     isOperationComplete = false;


// }