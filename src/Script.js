document.addEventListener('DOMContentLoaded', () => {
  
  const display = document.getElementById('js-no-display');
  let primaryValue = display.value;
  const buttons = document.getElementsByClassName('btn');

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
        display.style.color = 'Black'
        if (buttonText == '=') {
          evaluator(); 
        } else if (buttonText == 'AC') {
          primaryValue = '';
          display.value = primaryValue; 
        } else {
          calculator(buttonText);
        }
      }  catch (error) {
        console.error(error);
        display.style.color = 'Red'
        primaryValue = 'ERROR'
        display.value = primaryValue;
      }   
    })
  }

  function calculator (buttonText) {
    primaryValue += buttonText;
    display.value = primaryValue; 
  }

})

  