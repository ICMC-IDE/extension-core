import template from "./template.html?template";

export default class NumElement extends HTMLElement {
  #controller?: AbortController;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#controller = new AbortController();

    this.replaceChildren(template.content.cloneNode(true));
  }

  disconnectedCallback() {
    this.#controller!.abort();
    this.#controller = undefined;
  }
}

customElements.define("x-core-num", NumElement);
