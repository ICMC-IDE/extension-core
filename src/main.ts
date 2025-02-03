import "./main.css";

import "./languages";
import "./components";

import "monaco-editor";

import * as UI from "@icmc-ide/core/ui";

const ELEMENTS = {
  "/activities": "x-core-activities",
  "/bin": "x-core-bin",
  "/config": "x-core-config",
  "/doc": "x-core-doc",
  "/emulator": "x-core-emulator",
  "/files": "x-core-files",
  "/log": "x-core-log",
  "/num": "x-core-num",
  "/text": "x-core-text",
};

export function query(uri: URL) {
  const elementName = ELEMENTS[uri.pathname];

  if (elementName) {
    const element = document.createElement(elementName);

    for (const [key, value] of uri.searchParams.entries()) {
      element.setAttribute(key, value);
    }

    return element;
  } else
    switch (uri.pathname) {
      default:
        console.log("[EXTENSION][CORE]", uri);
    }
}

const toUnload: (() => void)[] = [];

export async function load() {
  console.log("[EXTENSION][CORE] Loaded");

  await Promise.all([]);

  toUnload.push(UI.ActivityBar.open("core:///activities"));
  toUnload.push(UI.SecondarySidebar.open("core:///emulator"));
  toUnload.push(UI.SecondarySidebar.open("core:///num"));
}

export function unload() {
  console.log("[EXTENSION][CORE] Unloaded");

  for (let i = 0; i < toUnload.length; i++) {
    toUnload[i]();
  }
}
