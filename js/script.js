const displayAction = document.querySelector('.display-action')                 //!Место для оператора на дисплее
const displayValue = document.querySelector('.display-number')                  //!Место для чисел на дисплее       
const pmButton = document.querySelector('.button-plusminus')                    //!Кнопка равно
const totalButton = document.querySelector('.button-total')  
const sqrtButton =  document.querySelector('.button-sqrt')
const dotButton = document.querySelector('.button-dot')
const clearButton = document.querySelector('.button-clear') 

const btns = document.querySelectorAll('.btn')            
const keys = document.querySelectorAll('.key')                                  //!Кнопки с цифрами
const actions = document.querySelectorAll('.action')                            //!Кнопки операторов

let isProccessing = false

let terms = [0]
displayValue.textContent = terms[0]

disableButtons = () => {
    for(let btn of btns) {
        btn.disabled = true
    }
} 


clearButton.onclick = () => {
    let terms = [0]
    displayValue.textContent = terms[0]
    displayAction.textContent = '='
    for(let btn of btns) {
        btn.disabled = false
    }
    isProccessing = false
}

for(let key of keys) {
    key.addEventListener('click', function() {                                                                  //!Отвечает за вывод чисел на дисплей
        if(displayValue.textContent.length > 8) {
            displayValue.textContent = 'Error'
            disableButtons()
        } else {
            if(displayValue.textContent != '0' && !isProccessing) {
                displayValue.textContent += key.textContent 
               } else {
                displayValue.textContent = key.textContent 
                isProccessing = false
               }
               
            }
        }
       )
}

for(let action of actions) {                                                    //!Изменение оператора на дисплее и добавление слагаемого в массив
    action.addEventListener('click', function() {
        if(!isProccessing) {
            terms.push(Number(displayValue.textContent))
            if(displayAction.textContent == '=') {
                terms[0] = Number(displayValue.textContent)
                terms.pop()
                displayValue.textContent = '0'
            } else {
                displayValue.textContent = calculate(terms)
                if(displayValue.textContent.length > 9) {
                    displayValue.textContent = 'Error'
                    disableButtons()
                }
                terms[0] = Number(displayValue.textContent)
                terms.pop()
                isProccessing = true
            }
        }
       
        displayAction.textContent = action.textContent
        
    })
}

dotButton.onclick = function() {
    if(displayValue.textContent.indexOf('.') == -1) {
        displayValue.textContent += '.'
    }
}

pmButton.onclick = function() {
    if(displayAction.textContent == '=') {
        displayValue.textContent = Number(displayValue.textContent) * -1
        terms[0] = Number(displayValue.textContent)
    } else {
        displayValue.textContent = Number(displayValue.textContent) * -1
    }
}

sqrtButton.onclick = function() {
    let result = Math.sqrt(Number(displayValue.textContent))
    if(displayAction.textContent == '=') {
        displayValue.textContent = fix(result)
        terms[0] = Number(displayValue.textContent)
        displayAction.textContent = '='
    } else {
        displayValue.textContent = fix(result)
    }
    
}

fix = (x) => {
    if(x % Math.trunc(x) !== 0) {
       return x.toFixed(2) 
    } else {
        return x
    }    
}


function division(numbers) {                                             
    let result = numbers[0] / numbers[1]
    return fix(result)   
}
function sum(numbers) {                                                  
    let result = numbers[0] + numbers[1]
    return fix(result)   
}
function multiply(numbers) {                                             
    let result = numbers[0] * numbers[1]
    return fix(result)   
}
function subtraction(numbers) {                                          
    let result = numbers[0] - numbers[1]
    return fix(result)   
}
function degree(numbers) {                                               
    let result = numbers[0] ** numbers[1]
    return fix(result)   
}


function calculate(numbers) {
    if(displayAction.textContent == '+') {                                              //! Функция вычисления
        return sum(numbers)
    } else if(displayAction.textContent == '-') {
        return subtraction(numbers)
    } else if(displayAction.textContent == '*') {
        return multiply(numbers) 
    } else if(displayAction.textContent == '/') {
        return division(numbers)
    } else if(displayAction.textContent == '^'){
        return degree(numbers)  
    } 
}


totalButton.onclick = function() {                                                    //! Обработка нажатия кнопки равно
    terms.push(Number(displayValue.textContent))
    displayValue.textContent = calculate(terms)
    terms[0] = Number(displayValue.textContent)
    terms.pop()
    isProccessing = true

    if(displayValue.textContent.length > 9) {
        displayValue.textContent = 'Error'
        disableButtons()
    }
    displayAction.textContent = '='
}

//? Добавить функцию "зависания" программы при недопустимых значениях на табло

