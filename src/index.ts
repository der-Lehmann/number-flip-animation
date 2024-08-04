export class NumberFlip {
  private rootElement: HTMLElement;
  private durationSlide: number;
  private durationFade: number;
  private wrapperClassname: string;
  private digitClassname: string;

  constructor({
    rootElement,
    durationSlide,
    durationFade,
    initialNumber,
    animateInitialNumber = true,
    wrapperClassname = 'numberflip-digit-container',
    digitClassname = 'numberflip-digit-container-value',
  }: {
    rootElement: HTMLElement;
    durationSlide: number;
    durationFade: number;
    initialNumber: number | undefined;
    animateInitialNumber: boolean;
    wrapperClassname: string;
    digitClassname: string;
  }) {
    this.rootElement = rootElement;
    this.durationSlide = durationSlide;
    this.durationFade = durationFade;
    this.wrapperClassname = wrapperClassname;
    this.digitClassname = digitClassname;

    this.rootElement.style.display = 'flex';

    if (initialNumber) {
      this.setNumber(initialNumber, animateInitialNumber);
    }
  }

  public setNumber(number: number, animate: boolean = true): void {
    this.adjustAmountOfDigitContainers(number);
    this.setDigitInContainers(number, animate);
  }

  private adjustAmountOfDigitContainers(number: number): void {
    const numberOfDigits = this.getDigitsOfNumber(number).length;
    let countOfDigitContainers = this.rootElement.getElementsByClassName(this.wrapperClassname).length;

    // Create digit containers
    while (countOfDigitContainers < numberOfDigits) {
      this.rootElement.insertAdjacentHTML(
        'afterbegin',
        `<div class="${this.wrapperClassname}">
            <span class="${this.digitClassname}-hidden">0</span>
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

  private setDigitInContainers(number: number, animate: boolean): void {
    const digits = this.getDigitsOfNumber(number);
    const digitContainers = this.rootElement.getElementsByClassName(this.digitClassname);

    for (let i = 0; i < digitContainers.length; i++) {
      const digitContainer = digitContainers[i] as HTMLElement;
      const translate = this.calculateTranslateY(digits[i]);

      setTimeout(() => (digitContainer.style.transform = `translateY(${translate}%)`), 0);
    }
  }

  private getDigitsOfNumber(number: number): number[] {
    const digits = number.toString().split('');
    return digits.map(Number);
  }

  private calculateTranslateY(digit: number) {
    return (-90 + digit * 10).toString();
  }
}
