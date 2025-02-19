import template from "./template.html?template";

// const FREQUENCIES = [
//   "1 Hz",
//   "10 Hz",
//   "100 Hz",
//   "1 kHz",
//   "10 kHz",
//   "100 kHz",
//   "1 MHz",
//   "10 MHz",
//   "100 MHz",
//   "FAST!",
// ];

interface ChangeFileEvent {
  detail: string;
}

interface ChangeFrequencyEvent {
  detail: number;
}

interface StateEditorElements {
  buttons: {
    stop: HTMLButtonElement;
    play: HTMLButtonElement;
    next: HTMLButtonElement;
    reset: HTMLButtonElement;
    frequency: HTMLInputElement;
  };
  registers: HTMLInputElement[];
  internalRegisters: HTMLInputElement[];
}

export default class EmulatorElement extends HTMLElement {
  #elements: StateEditorElements;
  #fragment = template.content.cloneNode(true) as DocumentFragment;
  registers: Uint16Array = new Uint16Array(8);
  internalRegisters: Uint16Array = new Uint16Array(64);

  constructor() {
    super();

    const fragment = this.#fragment;
    const forms = fragment.querySelectorAll("form");

    this.#elements = {
      buttons: forms[0].elements as unknown as StateEditorElements["buttons"],
      registers: forms[1]
        .elements as unknown as StateEditorElements["registers"],
      internalRegisters: forms[2]
        .elements as unknown as StateEditorElements["internalRegisters"],
    };

    this.#elements.buttons.frequency.addEventListener("input", ({ target }) => {
      this.dispatchEvent(
        new CustomEvent("changeFrequency", {
          detail: (target! as HTMLInputElement).valueAsNumber,
        }),
      );
    });

    this.#elements.buttons.play.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("play", {}));
    });

    this.#elements.buttons.stop.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("stop", {}));
    });

    this.#elements.buttons.next.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("next", {}));
    });

    this.#elements.buttons.reset.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("reset", {}));
    });
  }

  connectedCallback() {
    this.appendChild(this.#fragment);
  }

  render() {
    {
      const elements = this.#elements.registers;

      for (let i = 0, registers = this.registers; i < elements.length; i++) {
        elements[i].value = registers[i]
          .toString(16)
          .padStart(4, "0")
          .toUpperCase();
      }
    }

    {
      const elements = this.#elements.internalRegisters;

      for (
        let i = 0, registers = this.internalRegisters;
        i < elements.length;
        i++
      ) {
        elements[i].value = registers[i]
          .toString(16)
          .padStart(4, "0")
          .toUpperCase();
      }
    }
  }

  setFrequency(value: number) {
    if (!this.#elements.buttons) return;

    const frequency = this.#elements.buttons.frequency.valueAsNumber;
    let frequencyText = "";
    if (frequency >= 1_000_000) {
      frequencyText = `${(frequency / 1_000_000).toFixed(1)}MHz`;
    } else if (frequency >= 1_000) {
      frequencyText = `${(frequency / 1_000).toFixed(1)}kHz`;
    } else {
      frequencyText = `${frequency}Hz`;
    }

    (
      this.#elements.buttons.frequency.nextSibling! as HTMLInputElement
    ).innerText = frequencyText;

    if (this.#elements.buttons.frequency.valueAsNumber !== value) {
      this.#elements.buttons.frequency.value = value.toString();
    }
  }

  setRunning(value: boolean) {
    // this.#running = value;

    this.#elements.buttons.stop.style.display = value ? "" : "none";
    this.#elements.buttons.play.style.display = value ? "none" : "";
  }
}

customElements.define("x-core-emulator", EmulatorElement);
