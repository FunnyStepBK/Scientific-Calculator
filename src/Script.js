document.addEventListener('DOMContentLoaded', () => {
  
  const display = document.getElementById('js-no-display');
  let primaryValue = '';
  display.innerText = '';
  const buttons = document.getElementsByClassName('btn');
  const backBtn = document.getElementById('back-btn');
  const backBtnContent = `<span class="material-symbols-outlined" id="backspace-symbol">
  keyboard_backspace
  </span>`;
  const toggleBtn = document.getElementById('toggle-btn');
  const numberBtns = document.getElementById('number-btns');
  const scientificFunc = document.getElementById('scientific-functions');
  const numbersCol = document.getElementById('first-column');
  const functionsCol = document.getElementById('second-column');
  const historyBtn = document.getElementById('js-history-btn');
  const historyDisplay = document.getElementById('history-display');
  const activeHistBtn = document.getElementById('active-history-btn');
  // const resultHistory = [];
  // var calculationEntry = {
  //   operation: operation,
  //   result: result
  // }

  function evaluator () {
    const convertedValue = primaryValue
    .replace('×', '*')
    .replace('÷', '/')
    .replace('%', '*0.01*')
    .replace('sin', 'Math.sin')
    .replace('cos', 'Math.cos')
    .replace('ln', 'Math.log')
    .replace('π', 'Math.PI')
    .replace('tan', 'Math.tan')
    .replace('log', 'Math.log10')
    .replace('√', 'Math.sqrt')
    .replace('e', 'Math.E')
    .replace('EXP', 'Math.exp')
    ;

    var expression = display.innerText;

    const result = eval(convertedValue, expression);
    primaryValue = result.toString();

    display.innerText = primaryValue;
  }
  
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonText = button.innerText;

    button.addEventListener('click', () => {
      try {
        display.style.color = 'black';
        display.style.textAlign = 'end';
        if (buttonText == '=') {
          backBtn.style.paddingTop = '7px';
          backBtn.style.paddingBottom = '7px';
          backBtn.innerText = 'AC'
          evaluator();
          primaryValue = ''; 
        } else if (button.innerText == 'AC') {
          primaryValue = '';
          display.innerText = ''; 
          backSpaceBtn();
        } else if (button.innerHTML === backBtnContent) {
          backSpace();
        } else if (buttonText === 'x!') {
          factorial();
        } else if (buttonText == '(' || buttonText == 'cos' ||     buttonText ==   'tan' || buttonText == 'log' || buttonText == 'ln' || buttonText == '√' || buttonText == 'sin') {
          display.innerText = buttonText + `()`;
        } else {
          backSpaceBtn();
          calculator(buttonText);
        }
      }  catch (error) {
        console.error(error);
        display.style.color = 'Red';
        display.style.textAlign = 'center';
        primaryValue = '';
        display.innerText = 'ERROR';
      }   
    })
  }

  historyBtn.addEventListener('click', () => {
    historyDisplay.classList.add('history-display-active');
  })
  activeHistBtn.addEventListener('click', () => {
    historyDisplay.classList.remove('history-display-active');
  })

  function calculator (buttonText) {
    if (buttonText === 'AC') {
      backSpaceBtn();
    } else {
      primaryValue += buttonText;
      display.innerText = primaryValue; 
    }
  }

  function backSpace () {
    if (display.innerText == 'cos()' || display.innerText == 'tan()' || display.innerText == 'log()' || display.innerText == 'ln()' || display.innerText == '√()' || display.innerText == 'sin()' || display.innerText == 'Ans' || display.innerText == '') {
      primaryValue = '';
      display.innerText = '';
    } else {
      primaryValue = primaryValue.slice(0, -1);
      display.innerText = display.innerText.slice(0, -1);
    }
  }

  function backSpaceBtn () {
    backBtn.style.paddingTop = '8.02px';
    if (window.innerWidth < 992) {
      backBtn.style.paddingBottom = '3px';
    } else if (window.innerWidth >= 992) {
      backBtn.style.paddingBottom = '3px';
    } else {
      backBtn.style.paddingBottom = '0px';
      backBtn.style.paddingTop = '6px';
    }
    backBtn.innerHTML = backBtnContent;    
  }

  function factorial() {
    var expression = display.innerText;
    var num = parseInt(expression);
    var factorResult = factorialLoop(num);
  }

  function factorialLoop(x) {
    if (x === 0 || x === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= x; i++) {
        result *= i;
    }
    return result;
  }

  toggleBtn.addEventListener('click', () => {
    if (numberBtns.classList.contains('js-styles-btn')) {
      numberBtns.classList.remove('js-styles-btn');
      numberBtns.classList.add('js-styles-btn-active');
      scientificFunc.classList.remove('js-styles-btn-active');
      scientificFunc.classList.add('js-styles-btn');
      numbersCol.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      numberBtns.classList.add('js-styles-btn');
      numberBtns.classList.remove('js-styles-btn-active');
      scientificFunc.classList.add('js-styles-btn-active');
      scientificFunc.classList.remove('js-styles-btn');
      functionsCol.scrollIntoView({
        behavior: 'smooth'
      });
    }
  })
})

  