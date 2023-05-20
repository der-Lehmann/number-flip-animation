interface NumberFlipBaseOptions {
  durationFlip?: number;
  durationOpacity?: number;
  clearRootElement?: boolean;
}

interface NumberFlipConstrucotorOptions extends NumberFlipBaseOptions {
  newNumber?: number;
  rootElement?: HTMLElement | undefined;
}

interface NumberFlipSingleOptions extends NumberFlipConstrucotorOptions {
  newNumber: number;
}

interface NumberFlipMultipleOptions extends NumberFlipBaseOptions {
  elements: HTMLCollectionOf<Element>;
  attributeName?: string;
}

export type { NumberFlipConstrucotorOptions, NumberFlipSingleOptions, NumberFlipMultipleOptions };
