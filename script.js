const button = document.querySelectorAll("button");
const btn = document.querySelectorAll("[data-number]")
const operand = document.querySelectorAll("[data-operator]")
const equalBtn = document.querySelector("[data-equals]")
const clearBtn = document.querySelector("[data-clear]")
const delBtn = document.querySelector("[data-del]")
const decimalBtn = document.querySelector("[data-decimal]")
const squareBtn = document.querySelector("[data-square]")
// const br = document.createElement("BR")

let firstValue = 0;
let setFirstValue = 0;
let secondValue = 0;
let setSecondValue = 0;
let result;
let operator = "";
let setOperator;

let isOperationComplete = false;
let currentOperation = 0; // this will determine what part the user is on. 0 = first number, 1 = operand and 2 = second number



const screen = document.querySelector(".screen");
const currentValue = document.querySelector(".current");
const previousValue = document.querySelector(".previous");

const advanceBtn = document.querySelector(".advance")
let advanceOptions = false;
const backBtn = document.querySelector(".basic")

////////////////////////////////////////////////////////////////////////

// Buttons

btn.forEach((button) =>{
    button.addEventListener("click", () => {setNumScreen(button.value)})
})
operand.forEach((op) =>{
    op.addEventListener("click", () => {setOperandScreen(op.value)})
})

equalBtn.addEventListener("click", () => {operate(firstValue, operator, secondValue)});
decimalBtn.addEventListener("click", () => {decimalPoint(decimalBtn.value)});
clearBtn.addEventListener("click", () => {clearScreen()});
delBtn.addEventListener("click", () => {del()});
squareBtn.addEventListener("click", () => {impossible()});

////////////////////////////////////////////////////////////////////////




function setNumScreen(value){
    isOperationComplete = true;
    if (currentOperation === 0){
        if(currentValue.textContent == "0"){
            currentValue.textContent = ""
            currentValue.style.animation ="none"
        }
        currentValue.textContent += value
        
        if(currentValue.textContent.length > 12){
            currentValue.style.fontSize = "28px";
            if(currentValue.textContent.length > 18){
                currentValue.style.fontSize = "20px";
                if(currentValue.textContent.length > 25){
                    currentOperation == 1
                    
                }
            }
        }
    }
    if(currentOperation === 2){
        
        console.log(currentValue.textContent)
        if(currentValue.textContent == "0"){
            currentValue.style.animation = "none";

            currentValue.textContent = ""
        }
        currentValue.textContent += value
        secondValue = currentValue.textContent
        previousValue.textContent = `${firstValue} ${operator} ${secondValue}` 
        if(currentValue.textContent.length > 12){
            currentValue.style.fontSize = "28px";
            if(currentValue.textContent.length > 18){
                currentValue.style.fontSize = "20px";
                if(currentValue.textContent.length > 25){
                    // currentOperation == 1
                    
                }
            }
        }
    }
 
}
function setOperandScreen(value){
    currentOperation = 1;
    firstValue = currentValue.textContent;
    if (currentOperation === 1){
        operator = value;
        currentValue.textContent = "0";
        currentValue.style.animation = "blinkZero 1s infinite";

        previousValue.textContent = `${firstValue} ${operator}`;
        currentOperation = 2;
    }
    
}

function operate(firstValue, operand, secondValue){
    
    isOperationComplete = true;
    currentOperation = 0;
    firstValue.includes(".") ? setFirstValue = parseFloat(firstValue) : setFirstValue = parseInt(firstValue)
    secondValue.includes(".") ? setSecondValue = parseFloat(secondValue) : setSecondValue = parseInt(secondValue)
    
        switch (operand){
        case "+":
            add(setFirstValue, setSecondValue);
            break;
        case "-":
            sub(setFirstValue, setSecondValue);
            break;
        case "/":  
            divide(setFirstValue, setSecondValue);
            break;
        case "x":
            multiply(setFirstValue, setSecondValue);
            break;
        }
    
    return firstValue == 0 && operand == "" && secondValue == 0 ? true : displayResults()  
}

function displayResults(){
    if (result == Infinity){
        return impossible()
    }
    return previousValue.textContent = `${firstValue} ${operator} ${secondValue} = ${result}`,
           currentValue.textContent = Math.round(result * 10000000) / 10000000; // round results to 6 decibals
}


function decimalPoint(value){
    if(!currentValue.textContent.includes(".")){
        currentValue.textContent += value;
        return;  
    } 
    else {return;}
}


function del(){           
    previousValue.textContent = previousValue.textContent.toString().slice(0, -1);
    currentValue.textContent = currentValue.textContent.toString().slice(0, -1);
}


function reset(){
    setFirstValue = 0;
    setSecondValue = 0;
    isOperationComplete = false;
    currentOperation = 0;
}


function add(firstNum, secondNum){
    isEqualSelected = false;
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


function clearScreen(){
    currentValue.textContent = "0";
    currentValue.style.animation = "blinkZero 1s infinite";
    currentValue.style.fontSize = "37px"
    previousValue.textContent = "";
    firstValue = 0;
    setFirstNum = 0;
    secondValue = 0;
    setSecondNum = 0;
    result = 0;
    operator = "";
    setOperator;
    currentOperation = 0;
    isOperationComplete = false;


}



function impossible(){
    let preMessage = "";
    let curMessage = ""
    currentValue.style.animation = "none";
    currentValue.style.fontSize = "12px";
    previousValue.style.fontSize = "12px";
 
    screen.style.overflow = "hidden"
    const cryptic = "afghiopqr:'@#stuvwxyz?;1234590,.<bcde>/~[{]}+=_-jklmn!£$%678^&*()";
    for(i = 0; i <= cryptic.length; i++){
        preMessage += cryptic.charAt(Math.floor(Math.random() * cryptic.length -6))
        curMessage += cryptic.charAt(Math.floor(Math.random() * cryptic.length -6))
        
    }
    return previousValue.textContent = `${preMessage} WARNING ${preMessage}`,
           currentValue.textContent = `${curMessage} OVERLOAD ${curMessage.slice(3, 7)} SELF-DESTRUCT`
    
    
}



























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