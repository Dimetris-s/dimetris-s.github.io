const displayAction = document.querySelector('.display-action')                 //!Место для оператора на дисплее
const displayValue = document.querySelector('.display-number')                  //!Место для чисел на дисплее       
const pmButton = document.querySelector('.button-plusminus')                    //!Кнопка равно
const totalButton = document.querySelector('.button-total')  
const sqrtButton =  document.querySelector('.button-sqrt')
const dotButton = document.querySelector('.button-dot')                  

const keys = document.querySelectorAll('.key')                                  //!Кнопки с цифрами
const actions = document.querySelectorAll('.action')                            //!Кнопки операторов

let isProccessing = false

let terms = [0]
displayValue.textContent = terms[0]

for(let key of keys) {
    key.addEventListener('click', function() {                                                                  //!Отвечает за вывод чисел на дисплей
        if(displayValue.textContent.length > 8) {
            displayValue.textContent = 'Error'
        } else {
            if(displayValue.textContent != '0' && displayValue.textContent != 'Error' && displayValue.textContent != 'Infinity' && displayValue.textContent != 'NaN' && !isProccessing) {
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
    displayValue.textContent = Number(displayValue.textContent) * -1
}

sqrtButton.onclick = function() {
    let result = Math.sqrt(Number(displayValue.textContent))
    if(result % Math.trunc(result) !== 0) {
        displayValue.textContent = result.toFixed(2) 
    } else {
        displayValue.textContent = result
    }
    displayAction.textContent = '='
    
}


function division(numbers) {                                                    //!Деление
    let result = numbers[0] / numbers[1]
    
    if(result % Math.trunc(result) !== 0) {
        return result.toFixed(2)
    } else {
        return result
    }
    
}


function calculate(numbers) {
    if(displayAction.textContent == '+') {                                              //! Функция вычисления
        return numbers[0] + numbers[1]
    } else if(displayAction.textContent == '-') {
        return numbers[0] - numbers[1]
    } else if(displayAction.textContent == '*') {
        return numbers[0] * numbers[1] 
    } else if(displayAction.textContent == '/') {
        return division(numbers)
    } else if(displayAction.textContent == '^'){
        return numbers[0] ** numbers[1]  
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
    }
    displayAction.textContent = '='
}

//? Разобраться с функцией квадратного корня 

//? Добавить функцию "зависания" программы при недопустимых значениях на табло

//? Разобраться с большими дробными остатками при сложении и умножении 

//? Переделать кнопку сброса
