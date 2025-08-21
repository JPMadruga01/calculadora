const buttons = document.querySelectorAll('.btn');
const operationDisplay = document.querySelector('#operation');
const resultDisplay = document.querySelector('#result');

let currentOperation = ''; 
let result = ''; 
let justEvaluted = false; // flag para verificar se a última ação foi uma avaliação

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
        if (justEvaluted) justEvaluted = false; // se acabou de calcular, já começa do resultado atual
        currentOperation += `${value}`;

    } else if (classList.contains('equal')) {
        try {
            result = eval(currentOperation);
            currentOperation = justEvaluted ? result.toString() : currentOperation;  
        } catch (error) {
            resultDisplay.textContent = 'Error';
            currentOperation = '';
        }
    } else {
        if (justEvaluted) {
            // Se o último botão pressionado foi o igual, reinicia a operação
            currentOperation = value;
            result = '';
            justEvaluted = false; // reseta a flag
        } else {
            currentOperation += value    
        }
    }

    updateDisplay();
}

function updateDisplay() {
    operationDisplay.textContent = currentOperation;
    resultDisplay.textContent = result;
}