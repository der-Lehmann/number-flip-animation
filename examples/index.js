import { NumberFlip } from './dist/index.js';

const numberFlip = new NumberFlip({ rootElement: document.getElementById('number-flip')});
const numberInput = document.getElementById('number-input');
const button = document.getElementById('button');
button.addEventListener('click', changeNumber);

function changeNumber() {
  let newNumber = numberInput.value;
  numberFlip.setNumber(newNumber);
}
