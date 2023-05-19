import './styles.css';

interface NumberFlipOptions {
  rootElement: string;
  duration?: number;
  opacityDuration?: number;
}

export class NumberFlip {
  private rootElement: string;
  private duration: number;
  private opacityDuration: number;
  private currentNumberOfDigitContainers: number = 0;

  constructor({
    rootElement,
    duration = 1000,
    opacityDuration = 200,
  }: NumberFlipOptions) {
    this.rootElement = rootElement;
    this.duration = duration;
    this.opacityDuration = opacityDuration;

    this.getRootElement().style.display = 'flex';
  }

  private getNumberDigits(newNumber: number): number[] {
    const digits = newNumber.toString().split('');
    return digits.map(Number);
  }

  private getRootElement(): HTMLElement {
    const root: HTMLElement | null = document.getElementById(this.rootElement);

    if (root) {
      return root;
    }

    throw new Error('No root element has been found.');
  }

  // Create one element (numberflip-digit-container) for each digit of the number or, should there be more elements (numberflip-digit-containers) than digits, delete the unnecessary elements (numberflip-digit-containers).
  private setNumberOfDigitContainersToDigitsOfNumber(newNumber: number) {
    const digits = this.getNumberDigits(newNumber);

    if (digits.length > this.currentNumberOfDigitContainers) {
      for (let i = 0; i < digits.length; i++) {
        const root: HTMLElement = this.getRootElement();

        if (!document.getElementById('numberflip-digit-container' + i)) {
          root.insertAdjacentHTML(
            'beforeend',
            `<div id="numberflip-digit-container${i}" class="numberflip-digit-container" style="transition-duration: ${this.opacityDuration}ms;">
                            <span class="numberflip-digit-container-value-hidden">0</span>
                            <div class="numberflip-digit-container-value" style="transform: translateY(-100%); transition-duration: ${this.duration}ms;">
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
        }
      }
    } else if (digits.length < this.currentNumberOfDigitContainers) {
      while (this.currentNumberOfDigitContainers > digits.length) {
        const needlessDigitContainer: HTMLElement | null =
          document.getElementById(
            `numberflip-digit-container${
              this.currentNumberOfDigitContainers - 1
            }`,
          );

        if (needlessDigitContainer) {
          needlessDigitContainer.style.opacity = '0';
          setTimeout(
            () => needlessDigitContainer.remove(),
            this.opacityDuration,
          );

          this.currentNumberOfDigitContainers--;
        }
      }
    }

    this.currentNumberOfDigitContainers = digits.length;
  }

  private setDigitInContainers(newNumber: number) {
    const digits = this.getNumberDigits(newNumber);

    for (let i = 0; i < digits.length; i++) {
      const digitContainer: HTMLElement | null | undefined = document
        .getElementById(`numberflip-digit-container${i}`)
        ?.querySelector('.numberflip-digit-container-value');

      if (digitContainer) {
        const translate = (-90 + digits[i] * 10).toString();
        digitContainer.style.transform = `translateY(${translate}%)`;
      }
    }
  }

  public setNumberTo(
    newNumber: number,
    duration: number = this.duration,
    opacityDuration: number = this.opacityDuration,
  ) {
    this.duration = duration;
    this.opacityDuration = opacityDuration;

    this.setNumberOfDigitContainersToDigitsOfNumber(newNumber);

    setTimeout(() => {
      this.setDigitInContainers(newNumber);
    }, 0);
  }
}
