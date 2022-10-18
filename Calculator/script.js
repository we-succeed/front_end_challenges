const screen = document.getElementById('screen');
const process = document.getElementById('process');
const buttons = document.querySelectorAll('button');
let resultValue = "";
let screenValue = "";

for (item of buttons) { 
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        if (buttonText === 'x') {
            screenValue += buttonText;
            buttonText = '*';
            resultValue += buttonText;
            screen.innerText = screenValue;
        }
        else if (buttonText === '÷') {
            screenValue += buttonText;
            buttonText = '/';
            resultValue += buttonText;
            screen.innerText = screenValue;
        }
        else if (buttonText === '%') {
            screenValue += buttonText;
            buttonText = '*0.01';
            resultValue += buttonText;
            screen.innerText = screenValue;
        }
        else if (buttonText === 'AC') {
            screenValue = "";
            resultValue = "";
            screen.innerText = "\u00A0";
            process.innerText = "\u00A0";
        }
        else if (buttonText === '=') {
            process.innerText = screenValue;
            screen.innerText = eval(resultValue);
        }
        else {
            screenValue += buttonText;
            resultValue += buttonText;
            screen.innerText = screenValue;
        }
    })
}
