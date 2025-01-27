export enum Level {
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export class LogElement extends HTMLElement {
  constructor() {
    super();
  }

  log(level: Level, message: string) {
    // TODO: Implement log
  }
}

customElements.define("x-core-log", LogElement);
