const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')

keys.addEventListener('click', e => {
 if (e.target.matches('button')) {
   	const key = e.target
	const action = key.dataset.action


	if (!action) {
	  console.log('number key!')
	}
	if (action === 'add' ||action === 'subtract' ||action === 'multiply' ||action === 'divide') {
	  console.log('operator key!')
	}
	if (action === 'decimal') {
	  console.log('decimal key!')
	}
	if (action === 'clear') {
	  console.log('clear key!')
	}
	if (action === 'calculate') {
	  console.log('equal key!')
	}

 }
})

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)
  if (operator === 'add') return firstNum + secondNum
  if (operator === 'subtract') return firstNum - secondNum
  if (operator === 'multiply') return firstNum * secondNum
  if (operator === 'divide') return firstNum / secondNum
   if (operator ===	'sq') return firstNum * firstNum		
	 if (operator ==='root') return Math.sqrt(firstNum)		
	 if (operator ==='abs') return Math.abs(firstNum)		
	 if (operator ==='ln') return Math.log(firstNum)		
	 if (operator ==='log') return Math.log(firstNum)/Math.log(10)	
	 if (operator ==='cosh')  return Math.cosh(firstNum * Math.PI / 180)		
	 if (operator ==='sinh') return Math.sinh(firstNum * Math.PI / 180)		
	 if (operator ==='atan') return Math.atan(firstNum * Math.PI / 180)

}

//happy path
const display = document.querySelector('.calculator__display')
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent
    const previousKeyType = calculator.dataset.previousKeyType
   
   if (!action) {//number keys
		  if (
		    displayedNum === '0' ||
		    previousKeyType === 'operator' ||
		    previousKeyType === 'calculate'
		  ) {
		    display.textContent = keyContent
		  } else {
		    display.textContent = displayedNum + keyContent
		  }
		  calculator.dataset.previousKeyType = 'number'
	}
	if(action === 'eu'){
		if (
		    displayedNum === '0' ||
		    previousKeyType === 'operator' ||
		    previousKeyType === 'calculate'
		  ) {
		    display.textContent = Math.E
		  } else {
		    display.textContent =  Math.E
		  }
		  calculator.dataset.previousKeyType = 'number'

	}
	if (action === 'decimal') {//decimal key
		  if (!displayedNum.includes('.')) {
		    display.textContent = displayedNum + '.'
		  } else if (
		    previousKeyType === 'operator' ||
		    previousKeyType === 'calculate'
		  ) {
		    display.textContent = '0.'
		  }
		  calculator.dataset.previousKeyType = 'decimal'
	}
	if (action === 'add' ||// operators
		action === 'subtract' ||
		action === 'multiply' ||
		action === 'divide'||
		action === 'sq'||
		action === 'root'||
		action === 'abs'||
		action === 'ln'||
		action === 'sinh'||
		action === 'cosh'||
		action === 'atan'
		) {
		  const firstValue = calculator.dataset.firstValue
		  const operator = calculator.dataset.operator
		  const secondValue = displayedNum
		  if (
		    firstValue &&
		    operator &&
		    previousKeyType !== 'operator' &&
		    previousKeyType !== 'calculate'
		  ) {
		    const calcValue = calculate(firstValue, operator, secondValue)
		    display.textContent = calcValue
		    calculator.dataset.firstValue = calcValue
		  } else {
		    calculator.dataset.firstValue = displayedNum
		  }
		  key.classList.add('is-depressed')
		  calculator.dataset.previousKeyType = 'operator'
		  calculator.dataset.operator = action
		}
	if (action === 'clear') {
	  if (key.textContent === 'AC') {
	    calculator.dataset.firstValue = ''
	    calculator.dataset.modValue = ''
	    calculator.dataset.operator = ''
	    calculator.dataset.previousKeyType = ''
	  } else {
	    key.textContent = 'AC'
	  }
	  display.textContent = 0
	  calculator.dataset.previousKeyType = 'clear'
	}
	if (action === 'calculate') {
	  let firstValue = calculator.dataset.firstValue
	  const operator = calculator.dataset.operator
	  let secondValue = displayedNum
	  if (firstValue) {
	    if (previousKeyType === 'calculate') {
	      firstValue = displayedNum
	      secondValue = calculator.dataset.modValue
	    }
	    display.textContent = calculate(firstValue, operator, secondValue)
	  }
	  calculator.dataset.modValue = secondValue
	  calculator.dataset.previousKeyType = 'calculate'
	  	Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))
	}
	// Remove .is-depressed class from all keys
    
  }
})

//strings

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent
  const { action } = key.dataset
  const {
    firstValue,
    modValue,
    operator,
    previousKeyType
  } = state
  
  if (!action) {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent
  }
  if (action === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
    return displayedNum
  }
  if (
 		action === 'add' ||// operators
		action === 'subtract' ||
		action === 'multiply' ||
		action === 'divide'||
		action === 'sq'||
		action === 'root'||
		action === 'abs'||
		action === 'ln'||
		action === 'sinh'||
		action === 'cosh'||
		action === 'atan'
  ) {
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum
  }
 if (action === 'clear') return 0
 if (action === 'calculate') {
    const firstValue = calculator.dataset.firstValue
    const operator = calculator.dataset.operator
    const modValue = calculator.dataset.modValue
    return firstValue
      ? previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum
  }
}