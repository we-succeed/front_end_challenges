let screen = document.getElementById('screen');
let process = document.getElementById('process');
let buttons = document.querySelectorAll('button');
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
        else if (buttonText === '=') {
            process.innerText = screenValue;
            screen.innerText = eval(resultValue);
        }
        else if (buttonText === 'AC') {
            screenValue = "";
            resultValue = "";
            screen.innerText = "\u00A0";
            process.innerText = "\u00A0";
        }
        else {
            screenValue += buttonText;
            resultValue += buttonText;
            screen.innerText = screenValue;
        }
    })
}
