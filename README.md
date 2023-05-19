# number-flip-animation

This package makes it easy to transition between to numbers using a flip/slide animation.<br>
When changing between two numbers the number of digits can differ.<br>
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

## Usage

<br>

Import the module

```javascript
import { NumberFlip } from 'number-flip-animation';
```

Create a new class instance and provide the Id of an HTML Element.
The element will be used to inject the necessary html.

```javascript
const numberFlip = new NumberFlip({
  rootElement: 'id-of-html-element',
});
```

To set a number or change the current number, call `setNumberTo` on the instance

```javascript
numberFlip.setNumberTo(123);
```

<br><br>

## Advanced usage

<br>

There are two animations being used when transitioning between two numbers.

- Flip/Slide (When chaning one digit to the next.)
- Fade out (When the number being changed to has less digits than the currently set number the unnecessary digits will fade out.)

<br>

It is possible to customize the duration of these animations.<br>
Either when creating the instance.

```javascript
const numberFlip = new NumberFlip({
  rootElement: 'id-of-html-element',
  duration: 1000, // in milliseconds
  opacityDuration: 200, // in milliseconds
});
```

or when chaning to another number.

```javascript
numberFlip.setNumberTo(
  123, // new number
  1000, // duration in millisseconds for flip/slide animation
  200, // duration in milliseconds for fade out animation
);
```

<br><br>

## Limitations

- Currently it is not possible to display negative numbers (Due to the lack of a leading minus sign).
- A thousand delimiter is not shown.
- Only whole numbers can be displayed.

<br><br>

## License

MIT
