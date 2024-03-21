document.addEventListener('DOMContentLoaded', () => {
  
  const display = document.getElementById('js-no-display');
  let primaryValue = '';
  display.value = '';
  const buttons = document.getElementsByClassName('btn');
  const backBtn = document.getElementById('back-btn');
  const backBtnContent = `<span class="material-symbols-outlined" id="backspace-symbol">
  keyboard_backspace
  </span>`;

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
          display.value = primaryValue; 
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
    primaryValue += buttonText;
    display.value = primaryValue; 
  }

  function backSpaceBtn () {
    backBtn.style.paddingTop = '9px';
    backBtn.style.paddingBottom = '9px';
    backBtn.innerHTML = backBtnContent;
  }

})

  