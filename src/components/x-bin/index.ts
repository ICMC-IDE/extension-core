import template from "./template.html?template";

export default class BinElement extends HTMLElement {
  #controller?: AbortController;

  connectedCallback() {
    this.#controller = new AbortController();
  }

  disconnectedCallback() {
    this.#controller!.abort();
    this.#controller = undefined;
  }
}

customElements.define("x-core-bin", BinElement);
