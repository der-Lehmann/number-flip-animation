export class NumberFlip {
  private rootElement: HTMLElement;
  private durationSlide: number;
  private durationFade: number;
  private numberFormatter: (num: number) => string;
  private decimalSeparator: string;
  private wrapperClassname: string;
  private digitClassname: string;

  constructor({
    rootElement,
    durationSlide = 1000,
    durationFade = 200,
    initialNumber,
    animateInitialNumber = true,
    numberFormatter = (num) => num.toString(),
    decimalSeparator = '.',
    wrapperClassname = 'numberflip-digit-container',
    digitClassname = 'numberflip-digit-container-value',
  }: {
    rootElement: HTMLElement;
    durationSlide?: number;
    durationFade?: number;
    initialNumber?: number;
    animateInitialNumber?: boolean;
    numberFormatter?: (num: number) => string;
    decimalSeparator?: string;
    wrapperClassname?: string;
    digitClassname?: string;
  }) {
    this.rootElement = rootElement;
    this.durationSlide = durationSlide;
    this.durationFade = durationFade;
    this.numberFormatter = numberFormatter;
    this.decimalSeparator = decimalSeparator;
    this.wrapperClassname = wrapperClassname;
    this.digitClassname = digitClassname;

    this.rootElement.style.display = 'flex';

    if (initialNumber !== undefined) {
      this.setNumber(initialNumber, animateInitialNumber);
    }
  }

  public setNumber(num: number, animate: boolean = true): void {
    this.adjustAmountOfDigitContainers(num);
    this.setDigitInContainers(num, animate);
  }

  private adjustAmountOfDigitContainers(num: number): void {
    const numberOfDigits = this.getDigitsOfNumber(num).length;
    let countOfDigitContainers = this.rootElement.getElementsByClassName(this.wrapperClassname).length;

    // Create digit containers
    while (countOfDigitContainers < numberOfDigits) {
      this.rootElement.insertAdjacentHTML(
        'beforeend',
        `<div class="${this.wrapperClassname}">` +
        /*
          The span with visibility hidden is needed in order to make the parent element occupy enough space to display the digit.
          Otherwise the parent would have a width and height of 0 due to the absolute position of the .numberflip-digit-container-value element
        */
        `<span style="visibility: hidden;">0</span>
            <div class="${this.digitClassname}" style="transform: translateY(-100%);">
                <span>9</span>
                <span>8</span>
                <span>7</span>
                <span>6</span>
                <span>5</span>
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
                <span>0</span>
                <span>${this.decimalSeparator}</span>
            </div>
        </div>`,
      );

      countOfDigitContainers++;
    }

    // Remove unnecessary digit containers
    if (countOfDigitContainers > numberOfDigits) {
      const digitContainers = this.rootElement.getElementsByClassName(this.digitClassname);

      for (let i = numberOfDigits; i < digitContainers.length; i++) {
        const digitContainer = digitContainers[i].parentElement as HTMLElement;
        digitContainer.style.animationDuration = this.durationFade + 'ms';
        digitContainer.style.animationName = 'numberflip-animation-fade-out';

        // Wait for fade out animation to finish before removing the element
        setTimeout(() => digitContainer.remove(), this.durationFade);
      }
    }
  }

  private setDigitInContainers(num: number, animate: boolean): void {
    const digits = this.getDigitsOfNumber(num);
    const digitContainers = this.rootElement.getElementsByClassName(this.digitClassname);

    for (let i = 0; i < digitContainers.length; i++) {
      const digitContainer = digitContainers[i] as HTMLElement;
      const digit = typeof digits[i] === 'number' ? digits[i] : -1;

      // typeof check needed for typescripts typechecker
      if (typeof digit === 'number') {
        const translate = this.calculateTranslateY(digit);
        setTimeout(() => {
          const durationSlide = animate ? this.durationSlide : 0;
          digitContainer.style.transitionDuration = durationSlide + 'ms';
          digitContainer.style.transform = `translateY(${translate}%)`;
        }, 0);
      }

      (digitContainer as any).parentNode.classList[digits[i] === '.' ? 'add' : 'remove']('dot');
    }
  }

  private getDigitsOfNumber(num: number): (number | string)[] {
    const digits = this.numberFormatter(num).split('');
    return digits.map((char) => (char === '.' ? '.' : parseInt(char, 10)));
  }

  private calculateTranslateY(digit: number) {
    // 11 is the number of span elements defined above in the adjustAmountOfDigitContainers method
    const heightOfSpan = 100 / 11;
    return (-10 * heightOfSpan + (digit + 1) * heightOfSpan).toString();
  }
}
