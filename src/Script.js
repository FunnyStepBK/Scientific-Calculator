document.addEventListener('DOMContentLoaded', () => {
  
  const display = document.getElementById('js-no-display');
  let primaryValue = '';
  display.value = '';
  const buttons = document.getElementsByClassName('btn');
  const backBtn = document.getElementById('back-btn');
  const backBtnContent = `<span class="material-symbols-outlined" id="backspace-symbol">
  keyboard_backspace
  </span>`;
  const toggleBtn = document.getElementById('toggle-btn');
  const numberBtns = document.getElementById('number-btns');
  const scientificFunc = document.getElementById('scientific-functions');
  const colContainer = document.getElementById('card-container');
  const numbersCol = document.getElementById('first-column')
  const functionsCol = document.getElementById('second-column')
 
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

    const result = eval(convertedValue);
    primaryValue = result.toString();

    display.value = primaryValue;
  }
  
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonText = button.innerText;

    button.addEventListener('click', () => {
      try {
        display.style.color = 'white';
        display.style.textAlign = 'end';
        if (buttonText == '=') {
          backBtn.style.paddingTop = '6px';
          backBtn.style.paddingBottom = '6px';
          backBtn.innerText = 'AC'
          evaluator();
          primaryValue = ''; 
        } else if (button.innerHTML == 'AC') {
          primaryValue = '';
          display.value = ''; 
          backSpaceBtn();
        } else if (button.innerHTML === backBtnContent) {
          primaryValue = primaryValue.slice(0, -1);
          display.value = display.value.slice(0, -1);
        } else {
          backSpaceBtn();
          calculator(buttonText);
        }
      }  catch (error) {
        console.error(error);
        display.style.color = 'Red';
        display.style.textAlign = 'center';
        primaryValue = '';
        display.value = 'ERROR';
      }   
    })
  }

  function calculator (buttonText) {
    if (buttonText === 'AC') {
      backSpaceBtn();
    } else {
      primaryValue += buttonText;
      display.value = primaryValue; 
    }
  }

  function backSpaceBtn () {
    backBtn.style.paddingTop = '8.36px';
    if (window.innerWidth >= 992) {
      backBtn.style.paddingBottom = '8px';
    } else if (window.innerWidth < 576) {
      backBtn.style.paddingBottom = '7px';
    } else {
      backBtn.style.paddingBottom = '6px';
    }
    backBtn.innerHTML = backBtnContent;
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

  