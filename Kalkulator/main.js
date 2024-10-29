function appendNumber(number) {
    const display = document.getElementById("display");
    display.value += number;
}

function appendOperator(operator) {
    const display = document.getElementById("display");
    const lastChar = display.value[display.value.length - 1];
    
    if (display.value === '' && (operator === '+' || operator === '-' || operator === '*' || operator === '/')) {
        return;
    }
    
    if (isNaN(lastChar) && lastChar !== '.') {
        display.value = display.value.slice(0, -1);
    }
    
    display.value += operator;
}

function clearDisplay() {
    document.getElementById("display").value = '';
}

function deleteLast() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById("display");
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function calculatePower() {
    const display = document.getElementById("display");
    const value = display.value;
    const parts = value.split('^');
    if (parts.length === 2) {
        const base = parseFloat(parts[0]);
        const exponent = parseFloat(parts[1]);
        display.value = Math.pow(base, exponent);
    } else {
        display.value += '^';
    }
}

function calculateLog() {
    const display = document.getElementById("display");
    const value = display.value;
    const number = parseFloat(value);
    if (!isNaN(number)) {
        display.value = Math.log10(number);
    } else {
        display.value += 'log';
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '^') {
        calculatePower();
    }
});