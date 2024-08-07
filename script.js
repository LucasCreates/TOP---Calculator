const button = document.querySelectorAll("button");
let firstNum = [];
let setFirstNum;
let secondNum = [];
let setSecondNum;
let result;
let operator;
let setOperator;
let isSelectFirstNum = true;
let isSelectOperator = false;
let isSelectSecondNum = false;
let isEqualSelected = false;
let times = "&times"


const screen = document.querySelector(".screen");
const currentValue = document.querySelector(".current");
const previousValue = document.querySelector(".previous");

const advanceBtn = document.querySelector(".advance")
let advanceOptions = false;
const backBtn = document.querySelector(".basic")



for (const btn of button){
    btn.addEventListener("click", function(e){
       

        if(isSelectFirstNum && e.target.dataset.number ){
            
            currentValue.textContent += e.target.dataset.number;
            if(currentValue.textContent.length > 12){
                currentValue.style.fontSize = "30px"
                currentValue.style.marginRight = "0px"
                if (currentValue.textContent.length > 16){
                    currentValue.style.fontSize = "20px"
                    if (currentValue.textContent.length > 24){
                        isSelectFirstNum = false;
                    }
                }
            }
  
            firstNum.push(e.target.dataset.number);   
            setFirstNum = parseInt(firstNum.join(""))
            isSelectOperator = true;
            
            // && currentValue.textContent.length < 16
        }
        if (isSelectOperator){  
            operator = e.target.dataset.operator;
            console.log(operator)
            if(operator !== undefined){
                currentValue.textContent = null;
                previousValue.textContent = `${setFirstNum} ${operator} `;
                
                isSelectFirstNum = false;
                isSelectOperator = false;
                isSelectSecondNum = true;
                
            }
        }
        if (isSelectSecondNum && e.target.dataset.number && !isSelectOperator){
            currentValue.textContent += e.target.dataset.number;
            if(currentValue.textContent.length > 12){
                currentValue.style.fontSize = "30px"
                currentValue.style.marginRight = "0px"
                if (currentValue.textContent.length > 16){
                    currentValue.style.fontSize = "20px"
                    if (currentValue.textContent.length > 24){
                        isSelectFirstNum = false;
                    }
                }
            }
            secondNum.push(e.target.dataset.number);   
            setSecondNum = parseInt(secondNum.join(""))
            previousValue.textContent = `${setFirstNum} ${operator} ${setSecondNum} `;
          
            
        }
      

        if (e.target.value === "adv"){moreOption()}
        if (e.target.value === "."){convertToFloat()}
        if (e.target.dataset.equals){ operate(setFirstNum, operator, setSecondNum)} // equating the results 
        if (e.target.value === "ac"){clearScreen()};
        if (e.target.value === "del"){del()};
       
    });
   
}




function operate(firstNum, op, secondNum){
    console.log("working")
    isEqualSelected = true;
    switch (op){
        case "+":
            add(firstNum, secondNum);
            break;
        case "x":
            multiply(firstNum, secondNum);
            break;
        case "/":
            divide(firstNum, secondNum);
            break;
        case "-":
            sub(firstNum, secondNum); 
            break;
    }
}
// &times
function add(firstNum, secondNum){
    isEqualSelected = false;
    result = firstNum + secondNum;
    previousValue.textContent += `= ${result}`;
    currentValue.textContent = result;
    return result;
}
function sub(firstNum, secondNum){
    result = firstNum - secondNum;
    previousValue.textContent += `= ${result}`;
    currentValue.textContent = result;
    return result;
}
function divide(firstNum, secondNum){
    result = firstNum / secondNum;
    previousValue.textContent += `= ${result}`;
    currentValue.textContent = result;
    return result;
}
function multiply(firstNum, secondNum){
    result = firstNum * secondNum;
    previousValue.textContent += `= ${result}`;
    currentValue.textContent = result;
    return result;
}



function moreOption(){
    if (!advanceOptions){
        backBtn.style.display = "none";
        advanceBtn.style.display = "inline";
        advanceOptions = true;
    }
    else {
        backBtn.style.display = "inline";
        advanceBtn.style.display = "none";
        advanceOptions = false;
    }
}

function del(){
    if(isSelectFirstNum){
        firstNum.pop();
        currentValue.textContent = firstNum.join("");
    }
    else if(isSelectSecondNum && !isSelectFirstNum){
        secondNum.pop();
        previousValue.textContent = `${firstNum.join("")} ${operator} ${secondNum.join("")}`;
        currentValue.textContent = secondNum.join("");
       
    }
    else if (isEqualSelected){
        console.log("equals has been selected")
    }
}

function clearScreen(){
    currentValue.textContent = "";
    currentValue.style.fontSize = "40px"
    previousValue.textContent = "";
    firstNum = [];
    setFirstNum = 0;
    secondNum = [];
    setSecondNum = 0;
    result = 0;
    operator = "";
    setOperator = "";
    isSelectFirstNum = true;
    isSelectOperator = false;
    isSelectSecondNum = false;

}