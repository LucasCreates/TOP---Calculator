const button = document.querySelectorAll("button");
let firstNum = [];
let setFirstNum;
let secondNum = [];
let setSecondNum;
let operator;
let setOperator;
let selectFirstNum = true;
let selectOperator = false;
let selectSecondNum = false;


const screen = document.querySelector(".screen");
const currentValue = document.querySelector(".current");
const previousValue = document.querySelector(".previous");

for (const btn of button){
    btn.addEventListener("click", function(e){


        if(selectFirstNum && e.target.dataset.number){
            
            currentValue.textContent += e.target.dataset.number
            firstNum.push(e.target.dataset.number);   
            setFirstNum = parseInt(firstNum.join(""))
            selectOperator = true;
         
        }
        if (selectOperator){  
            operator = e.target.dataset.operator;
            if(operator !== undefined){
                currentValue.textContent += ` ${operator} `;
                
                selectFirstNum = false;
                selectOperator = false;
                selectSecondNum = true;
                console.log(operator)
            }
        }
        if (selectSecondNum && e.target.dataset.number && !selectOperator){
            currentValue.textContent += e.target.dataset.number
            secondNum.push(e.target.dataset.number);   
            setSecondNum = parseInt(secondNum.join(""))
            // selectOperator = true
            
        }
        if (e.target.dataset.equals){
            operate(setFirstNum, operator, setSecondNum)
        }
        
       
    })
   
}

function operate(firstNum, op, secondNum){
  
    let total = firstNum + secondNum;
  
    console.log(`${firstNum} ${op} ${secondNum} = ${total}`);
    return currentValue.textContent = total;

}

function add(firstNum, secondNum){
    return currentValue.textContent = (firstNum + secondNum);
}
function sub(firstNum, secondNum){
    return firstNum - secondNum;
}
function divide(firstNum, secondNum){
    return firstNum / secondNum;
}
function multiply(firstNum, secondNum){
    return firstNum * secondNum;
}