# number-flip-animation

This package makes it easy to transition between two numbers using a sliding animation.  
The new number being changed to does not need to have the same number of digits as the number being changed from.  
Currently only positive numbers can be displayed, due to the lack of a leading minus sign.  

## Examples

![](./assets/demo1.gif)
![](./assets/demo2.gif)

## Installation

```bash
npm install number-flip-animation
```
The animations are being carried out by css transitions.  
Therefore the css classes inside the `src/styles.css` file need to be present in the css file of your project as well.  
Those can either be imported from this packages node_modules directory, or simply copied over to your own css file.  

## Basic usage
```javascript
const numberFlip = new NumberFlip({ rootElement: document.getElementById('number-flip') });

numberFlip.setNumber(newNumber);
```
Some more advanced usage examples can be found in the `examples` directory.  
In order to view a live version of the examples in your browser simply run `npm i` followed by `npm run serve`.

## Options

The constructor of the `NumberFlip` class accepts an object with the following properties.  

| Option                                | Description                                                                                                                                                                                                               | Default                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **`rootElement`** (required)          | An HTMLElement in which the number will be rendered in.                                                                                                                                                                   | `null`                             |
| **`durationSlide`** (optional)        | The duration in milliseconds for the sliding animation from one number to the next.                                                                                                                                       | `1000`                             |
| **`durationFade`** (optional)         | The duration in milliseconds for the fade out animation when a digit is removed from the number. Digits are removed in the case when the new number being changed to has fewer digits than the number being changed from. | `200`                              |
| **`initialNumber`** (optional)        | The number which will be displayed when the NumberFlip instance is created.                                                                                                                                               | `null`                             |
| **`animateInitialNumber`** (optional) | Whether the initial number should be animated or not.                                                                                                                                                                     | `true`                             |
| **`numberFormatter`** (optional)      | A function which can be used to format the number before it is being displayed.                                                                                                                                           | `(num) => num.toString()`          |
| **`decimalSeparator`** (optional)     | The decimal separator which should be used when decimal numbers are being displayed.                                                                                                                                      | `.`                                |
| **`wrapperClassname`** (optional)     | The css classname for the wrapper element which contains all the digits. If this is being changed from the default, the classes in the css file need to be changed accordingly.                                           | `numberflip-digit-container`       |
| **`digitClassname`** (optional)       | The css classname for the elements of each individual digit. If this is being changed from the default, the classes in the css file need to be changed accordingly.                                                       | `numberflip-digit-container-value` |

## Methods

This package only exposes one public method which is `setNumber(num: number, animate: boolean = true)`.  
The method accepts the number which should be set and an optional boolean, which dictates whether the change to the new number should be animated or not.


## Contributing

If you would like to contribute to this package, these are the things that you could work on:
- Incorporate the option to display a leading minus sign so that negative numbers can be displayed.
- Incorporate the option to display thousand separators.


## Similar Packages

- https://github.com/gaoryrt/number-flip

## License

MIT
