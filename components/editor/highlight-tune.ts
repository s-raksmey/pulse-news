"use client";

import type { API } from "@editorjs/editorjs";

interface HighlightData {
  highlighted?: boolean;
}

export default class HighlightTune {
  private api: API;
  private data: HighlightData;
  private button: HTMLButtonElement;

  static get isTune() {
    return true;
  }

  constructor({ api, data }: { api: API; data: HighlightData }) {
    this.api = api;
    this.data = data || {};
    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add(this.api.styles.settingsButton);
    this.button.innerHTML = "⚡";
    this.button.title = "Toggle highlight";
    this.button.addEventListener("click", () => {
      this.data.highlighted = !this.data.highlighted;
      this.render();
    });
  }

  render() {
    if (this.data.highlighted) {
      this.button.classList.add(this.api.styles.settingsButtonActive);
    } else {
      this.button.classList.remove(this.api.styles.settingsButtonActive);
    }
    return this.button;
  }

  save() {
    return {
      highlighted: Boolean(this.data.highlighted),
    };
  }

  wrap(blockContent: HTMLElement) {
    blockContent.style.transition = "background-color 150ms ease";
    if (this.data.highlighted) {
      blockContent.style.backgroundColor = "#fff7ed"; // amber-50
      blockContent.style.borderLeft = "4px solid #fb923c"; // amber-400
      blockContent.style.padding = "12px";
      blockContent.style.borderRadius = "12px";
    }
    return blockContent;
  }
}
