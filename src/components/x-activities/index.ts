import "./style.css";
import template from "./template.html?template";

import * as UI from "core/ui";

/**
 * Unlike other custom elements, activities does not attach a shadow root
 */
class ActivitiesElement extends HTMLElement {
  #controller?: AbortController;

  connectedCallback() {
    this.#controller = new AbortController();

    this.replaceChildren(template.content.cloneNode(true));

    let filesCloser: (() => void) | null;

    function toggleFileView() {
      // TODO: save the state of the file view
      if (filesCloser) {
        filesCloser();
        filesCloser = null;
      } else {
        filesCloser = UI.PrimarySidebar.open("core:///files?path=/");
      }
    }

    const filesButton = this.querySelector("#files") as HTMLButtonElement;

    filesButton.addEventListener("click", toggleFileView, {
      signal: this.#controller.signal,
    });
  }

  disconnectedCallback() {
    this.#controller!.abort();
    this.#controller = undefined;
  }
}

customElements.define("x-core-activities", ActivitiesElement);
