import { NumberFlip } from './dist/index.js';

// Example 1: Random number every second
const numberFlip1 = new NumberFlip({ rootElement: document.getElementById('number-flip-1') });

function setRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 1000000);
  numberFlip1.setNumber(randomNumber);
}

// Set initial random number and update every second
setRandomNumber();
setInterval(setRandomNumber, 2000);

// Example 2: Manually set number (existing code)
const numberFlip2 = new NumberFlip({ rootElement: document.getElementById('number-flip-2'), initialNumber: 12345 });
const numberInput = document.getElementById('number-input');
const button = document.getElementById('button');
button.addEventListener('click', changeNumber);

function changeNumber() {
  let newNumber = numberInput.value;
  numberFlip2.setNumber(newNumber);
}
