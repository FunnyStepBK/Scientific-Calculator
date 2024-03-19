document.addEventListener('DOMContentLoaded', () => {
  
  const display = document.getElementById('js-no-display');
  let primaryValue = display.value;
  const buttons = document.getElementsByClassName('btn');

  function evaluator () {
    const convertedValue = primaryValue
    .replace('×', '*')
    .replace('÷', '/')
    .replace('%', '*0.01*')
    ;

    const result = eval(convertedValue);
    primaryValue = result.toString();

    display.value = primaryValue;
  }

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonText = button.innerText;

    button.addEventListener('click', () => {
      if (buttonText == '=') {
        evaluator(); 
      } else if (buttonText == 'AC') {
        primaryValue = '';
        display.value = primaryValue; 
      } else {
        calculator(buttonText);
      }
    })
  }

  function calculator (buttonText) {
    primaryValue += buttonText;
    display.value = primaryValue; 
  }

})

  