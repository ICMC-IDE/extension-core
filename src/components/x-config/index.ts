import template from "./template.html?template";

export default class ConfigElement extends HTMLElement {
  #fragment = template.content.cloneNode(true) as DocumentFragment;

  constructor() {
    super();

    const fragment = this.#fragment;
    const form = fragment.querySelector("form")!;

    form.addEventListener("input", (event) => {
      let value;
      const target = event.target as HTMLInputElement;

      if (
        target.name === "screenWidth" ||
        target.name === "screenHeight" ||
        target.name === "gridWidth" ||
        target.name === "gridHeight"
      ) {
        value = target.valueAsNumber | 0;
      } else if (target.name) {
        value = target.value;
      }

      this.dispatchEvent(
        new CustomEvent("change-config", {
          detail: {
            name: target.name,
            value,
          },
        }),
      );
    });
  }

  connectedCallback() {
    this.appendChild(this.#fragment);
  }
}

customElements.define("x-core-config", ConfigElement);
