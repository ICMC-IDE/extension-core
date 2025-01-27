import "./style.css";
import * as monaco from "monaco-editor";

export default class TextElement extends HTMLElement {
  #editor?: monaco.editor.IStandaloneCodeEditor;
  #observer?: ResizeObserver;
  #model?: monaco.editor.ITextModel;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#editor = monaco.editor.create(this, {
      theme: "vs-dark",
      fontFamily: "ui-monospace",
      model: this.#model,
    });

    this.#observer = new ResizeObserver(() => {
      this.#editor!.layout();
    });

    this.#observer.observe(this);
  }

  disconnectedCallback() {
    this.#observer!.disconnect();
    this.#observer = undefined;
  }

  setModel(model: monaco.editor.ITextModel) {
    if (this.#editor) {
      this.#editor.setModel(model);
    } else {
      this.#model = model;
    }
  }
}

customElements.define("x-core-text", TextElement);

declare global {
  interface HTMLElementTagNameMap {
    "x-core-text": TextElement;
  }
}
