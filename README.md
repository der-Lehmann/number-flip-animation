# number-flip-animation

This package makes it easy to transition between to numbers using a flip/slide animation.<br>
The new number being changed to does not need to have the same number of digits as the number being changed from.<br>
Leading zeros are not being used.<br>
<br><br>
![](./assets/demo1.gif)
![](./assets/demo2.gif)
<br><br>

## Installation

```bash
npm install number-flip-animation
```

<br><br>

## Basic usage

<br>

Import the module

```javascript
import { NumberFlip } from 'number-flip-animation';
```

Create a new class instance and provide an HTMLElement.

```javascript
const numberFlip = new NumberFlip({
  rootElement: document.getElementById('number-flip'),
});
```

To set a number or change the current number, call `setNumberTo` on the instance

```javascript
numberFlip.setNumberTo({
  newNumber: 123,
});
```

<br><br>

## Options

<br>

- `rootElement`: An `HTMLElement` Object used to inject the necessary html nodes.
- `newNumber`: The number that should be changed to.
- `durationFlip`: The duration in milliseconds of the flip/slide transition
- `durationOpacity`: The duration in milliseconds of the fade out transition
- `clearRootElement`: Whether the child elements of the `rootElement` should be deleted
- `elements`: An `HTMLCollection` or `NodeList` of elements that should be changed (Only used in `setNumberForElements`)
- `attributeName`: The name of the data attribute that should be used to get the number from the element (Only used in `setNumberForElements`)

<br><br>

## Methods

<br>

The NumberFlip class accepts options through the constructor and two public methods.<br>

### Constructor

```javascript
const numberFlip = new NumberFlip({
  rootElement: document.getElementById('number-flip'),
  newNumber: 123,
  durationFlip: 1000,
  durationOpacity: 200,
  clearRootElement: false,
});
```

<br>

### setNumberTo

```javascript
numberFlip.setNumberTo({
  newNumber: 123,
  rootElement: this.rootElement,
  durationFlip: this.durationFlip,
  durationOpacity: this.durationOpacity,
  clearRootElement: false,
});
```

<br>

### setNumberForElements

```javascript
numberFlip.setNumberForElements({
  elements: document.getElementsByClassName('number-flip'),
  attributeName: 'data-number',
  durationFlip: 1000,
  durationOpacity: 200,
  clearRootElement: false,
});
```

<br><br>

## Limitations

- Currently it is not possible to display negative numbers (Due to the lack of a leading minus sign).
- A thousand delimiter is not shown.
- Only whole numbers can be displayed.

<br><br>

## License

MIT
