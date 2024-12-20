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
const numberInput2 = document.getElementById('number-input-2');
const button2 = document.getElementById('button-2');
button2.addEventListener('click', changeNumber2);

function changeNumber2() {
  let newNumber = numberInput2.value;
  numberFlip2.setNumber(newNumber);
}

// Example 3: Manually set number (existing code)
const numberFlip3 = new NumberFlip({
  rootElement: document.getElementById('number-flip-3'),
  initialNumber: 2.145,
  numberFormatter: (number) => {
    return parseFloat(number).toFixed(6);
  },
});
const numberInput3 = document.getElementById('number-input-3');
const button3 = document.getElementById('button-3');
button3.addEventListener('click', changeNumber3);

function changeNumber3() {
  let newNumber = numberInput3.value;
  numberFlip3.setNumber(newNumber);
}
