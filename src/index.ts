import type { NumberFlipConstrucotorOptions, NumberFlipSingleOptions, NumberFlipMultipleOptions } from './types';

export class NumberFlip {
  private rootElement: HTMLElement | undefined;
  private durationFlip: number;
  private durationOpacity: number;
  private wrapperClassname: string = 'numberflip-digit-container';
  private digitClassname: string = 'numberflip-digit-container-value';
  private newNumber: number;

  constructor({
    rootElement,
    newNumber = 0,
    durationFlip = 1000,
    durationOpacity = 200,
    clearRootElement,
  }: NumberFlipConstrucotorOptions) {
    this.rootElement = rootElement;
    this.newNumber = newNumber;
    this.durationFlip = durationFlip;
    this.durationOpacity = durationOpacity;

    if (this.rootElement) {
      if (clearRootElement) {
        this.rootElement.replaceChildren();
      }

      this.rootElement.style.display = 'flex';
    }
  }

  /**
   *  handels the process of changing the current number to a new number
   */
  public setNumberTo({
    newNumber,
    rootElement = this.rootElement,
    durationFlip = this.durationFlip,
    durationOpacity = this.durationOpacity,
    clearRootElement = false,
  }: NumberFlipSingleOptions) {
    this.constructor({
      newNumber,
      rootElement,
      durationFlip,
      durationOpacity,
      clearRootElement,
    });

    if (!this.rootElement) {
      throw new Error('No root element provided');
    }

    this.rootElement.style.display = 'flex';
    this.createOrRemoveDigitContainers();
    this.setDigitInContainers();
  }

  /**
   * handels the process of changing the current number to a new number on multiple elements
   */
  public setNumberForElements({
    elements,
    attributeName = 'data-number',
    durationFlip,
    durationOpacity,
    clearRootElement = false,
  }: NumberFlipMultipleOptions) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const newNumber = Number(element.getAttribute(attributeName));

      if (newNumber !== null) {
        this.setNumberTo({
          newNumber,
          rootElement: element as HTMLElement,
          durationFlip,
          durationOpacity,
          clearRootElement,
        });
      }
    }
  }

  /**
   * returns an array of digits from the currently set number
   */
  private getDigitsFromNumber(): number[] {
    const digits = this.newNumber.toString().split('');
    return digits.map(Number);
  }

  /**
   * Creates one element for each digit inside the provided root element.
   * Should there be more digit containers than digits, the unnecessary digit containers will be removed.
   */
  private createOrRemoveDigitContainers() {
    if (this.rootElement) {
      const countOfDigits = this.getDigitsFromNumber().length;
      let countOfDigitContainers = this.rootElement.getElementsByClassName(this.wrapperClassname).length;

      // Create digit containers
      while (countOfDigitContainers < countOfDigits) {
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
      if (countOfDigitContainers > countOfDigits) {
        const digitContainers = this.rootElement.getElementsByClassName(this.digitClassname);

        for (let i = countOfDigits; i < digitContainers.length; i++) {
          const digitContainer = digitContainers[i].parentElement as HTMLElement;
          digitContainer.style.animationDuration = this.durationOpacity + 'ms';
          digitContainer.style.animationName = 'fade-out';

          // Wait for fade out animation to finish before removing the element
          setTimeout(() => digitContainer.remove(), this.durationOpacity);
        }
      }
    }
  }

  /**
   * Sets the digit in the digit containers to the new number
   */
  private setDigitInContainers() {
    if (this.rootElement) {
      const digits = this.getDigitsFromNumber();
      const digitContainers = this.rootElement.getElementsByClassName(this.digitClassname);

      for (let i = 0; i < digitContainers.length; i++) {
        const digitContainer = digitContainers[i] as HTMLElement;
        const translate = this.calculateTranslateY(digits[i]);

        setTimeout(() => (digitContainer.style.transform = `translateY(${translate}%)`), 0);
      }
    }
  }

  private calculateTranslateY(digit: number) {
    return (-90 + digit * 10).toString();
  }
}
