const buttons = document.querySelectorAll('.btn');
const operationDisplay = document.querySelector('#operation');
const resultDisplay = document.querySelector('#result');

let currentOperation = ''; 
let result = ''; 
let justEvaluted = false; // flag para verificar se a última ação foi uma avaliação

const opMap = { '×': '*', '÷': '/' };
const termSplitRegex = /[+\-*/×÷]/;

buttons.forEach(button => {
    button.addEventListener('click', () => { // escuta o clique do botão 
        const value = button.textContent.trim(); // pega o valor escrito do botão e remove espaços em branco
        handleInput(value, button.classList);
    });
});

function handleInput(value, classList) {
    if (classList.contains('function')) {
        if (value === 'CE') {
            currentOperation = '';
            result = '';
            justEvaluted = false; // reseta a flag
        } else if (value === 'C') {
            currentOperation = currentOperation.slice(0, -1);
        }
    } else if (classList.contains('operator') && !classList.contains('equal')) {
        const op = opMap[value] ?? value;
        if (justEvaluted) justEvaluted = false;
        currentOperation += op;
        
    } else if (classList.contains('equal')) {
        try {
            result = parseFloat(eval(currentOperation));
            currentOperation = justEvaluted ? result.toString() : currentOperation;  
            justEvaluted = true; 
        } catch (error) {
            resultDisplay.textContent = 'Error';
            currentOperation = '';
        }
    } else {
        if ( value === '.') {
            const parts = currentOperation.split(termSplitRegex); 
            const lastPart = parts[parts.length - 1];
            if (lastPart.includes('.')) return; // se já tem um ponto, não adiciona outro
            if (lastPart === '' || /[+\-*/]$/.test(currentOperation)) {
                value = '0.'; 
            } 
        }
        if (justEvaluted) {
            // Se o último botão pressionado foi o igual, reinicia a operação
            currentOperation = result.toString() + value;
            result = '';
            justEvaluted = false; // reseta a flag
        } else {
            currentOperation += value;    
        }
    }

    updateDisplay();
}

function updateDisplay() {
    operationDisplay.textContent = currentOperation || '0';
    resultDisplay.textContent = result;
}