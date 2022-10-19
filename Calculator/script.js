const screen = document.getElementById('screen');
const process = document.getElementById('process');
const buttons = document.querySelectorAll('button');
let resultValue = "";
let screenValue = "";

for (item of buttons) { 
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        if (buttonText === 'AC') {
            screenValue = "";
            resultValue = "";
            screen.innerText = "\u00A0";
            process.innerText = "\u00A0";
        }
        else if (buttonText === '=') {
            process.innerText = screenValue;
            screen.innerText = eval(resultValue.replace('÷','/').replace('%','*0.01').replace('x','*'));
        }
        else {
            screenValue += buttonText;
            resultValue += buttonText;
            screen.innerText = screenValue;
        }
    })
}