// Select elements from the DOM
const display = document.getElementById('display-value');
const buttons = document.querySelectorAll('.btn');

let firstNumber = ''; // Variable to store the first number of the operation
let secondNumber = ''; // Variable to store the second number of the operation
let currentOperator = ''; // Variable to store the selected operator
let shouldResetDisplay = false; // Flag to reset the display for new input

// Function to add two numbers
function add(a, b) {
    return a + b; // Returns the sum of a and b
}

// Function to subtract the second number from the first number
function subtract(a, b) {
    return a - b; // Returns the difference of a and b
}

// Function to multiply two numbers
function multiply(a, b) {
    return a * b; // Returns the product of a and b
}

// Function to divide the first number by the second number
// Includes a check to prevent division by zero
function divide(a, b) {
    if (b === 0) {
        return "Error: Division by Zero"; // Returns an error message if trying to divide by zero
    }
    return a / b; // Returns the quotient of a and b
}

// Function to perform the operation based on the selected operator
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b); // Calls the add function
        case '-':
            return subtract(a, b); // Calls the subtract function
        case '*':
            return multiply(a, b); // Calls the multiply function
        case '/':
            return divide(a, b); // Calls the divide function
        default:
            return null; // Returns null if the operator is invalid
    }
}

// Function to handle number and operator button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.textContent); // Handle number button click
        } else if (button.classList.contains('operator')) {
            chooseOperator(button.textContent); // Handle operator button click
        } else if (button.classList.contains('equal')) {
            evaluate(); // Handle equal button click
        } else if (button.classList.contains('clear')) {
            clear(); // Handle clear button click
        } else if (button.classList.contains('decimal')) {
            appendDecimal(); // Handle decimal button click
        }
    });
});

// Function to append numbers to the display
function appendNumber(number) {
    if (shouldResetDisplay) resetDisplay(); // Reset display if it's the first input or after an operator is selected
    display.textContent += number; // Append the clicked number to the display
}

// Function to handle operator selection
function chooseOperator(operator) {
    if (currentOperator !== '') evaluate(); // Evaluate the existing operation if there's already an operator
    firstNumber = display.textContent; // Store the current display value as the first number
    currentOperator = operator; // Store the selected operator
    display.textContent += ` ${currentOperator} `; // Update the display to show the first number and operator
    shouldResetDisplay = false; // Allow the second number to be appended without resetting
}

// Function to evaluate the operation and display the result
function evaluate() {
    if (currentOperator === '') return; // Do nothing if no operator is selected
    const [firstNum, operator, secondNum] = display.textContent.split(' '); // Extract the first number, operator, and second number from the display content
    if (operator === '/' && secondNum === '0') {
        alert("Cannot divide by zero!"); // Alert if attempting to divide by zero
        clear(); // Clear the calculator for a fresh start
        return;
    }
    display.textContent = roundResult(
        operate(operator, parseFloat(firstNum), parseFloat(secondNum))
    ); // Perform the operation and update the display with the rounded result
    currentOperator = ''; // Reset the operator after evaluation
}

// Function to clear the display and reset variables
function clear() {
    display.textContent = '0'; // Reset the display to 0
    firstNumber = ''; // Clear the first number
    secondNumber = ''; // Clear the second number
    currentOperator = ''; // Clear the operator
    shouldResetDisplay = true; // Reset the display flag
}

// Function to reset the display
function resetDisplay() {
    display.textContent = ''; // Clear the display
    shouldResetDisplay = false; // Reset the flag
}

// Function to append a decimal point
function appendDecimal() {
    if (shouldResetDisplay) resetDisplay(); // Reset display if needed
    if (!display.textContent.includes('.')) display.textContent += '.'; // Append a decimal point if there's not already one
}

// Function to round the result to avoid long decimals
function roundResult(number) {
    return Math.round(number * 1000) / 1000; // Round the result to 3 decimal places
}
