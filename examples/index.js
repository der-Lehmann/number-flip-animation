import { NumberFlip } from './dist/index.js';

const numberFlip = new NumberFlip({ rootElement: document.getElementById('number-flip') });

function setNumber() {
  numberFlip.setNumber(Math.floor(Math.random() * 10000));
}

window.setInterval(setNumber, 2000);
setNumber();
