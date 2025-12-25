"use client";

import type { API } from "@editorjs/editorjs";

interface HighlightData {
  highlighted?: boolean;
}

export default class HighlightTune {
  private api: API;
  private data: HighlightData;
  private button: HTMLButtonElement;
  private settingsButtonClass: string;
  private activeSettingsButtonClass: string;

  static get isTune() {
    return true;
  }

  constructor({ api, data }: { api: API; data: HighlightData }) {
    this.api = api;
    this.data = data || {};

    // The EditorJS API may not always provide style class names depending on
    // how the bundle is loaded (e.g. Turbopack).
    // Provide fallbacks to avoid runtime errors that skip block rendering.
    this.settingsButtonClass =
      this.api.styles?.settingsButton ?? "cdx-settings-button";
    this.activeSettingsButtonClass =
      this.api.styles?.settingsButtonActive ?? "cdx-settings-button--active";

    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.classList.add(this.settingsButtonClass);
    this.button.innerHTML = "⚡";
    this.button.title = "Toggle highlight";
    this.button.addEventListener("click", () => {
      this.data.highlighted = !this.data.highlighted;
      this.render();
    });
  }

  render() {
    if (this.data.highlighted) {
      this.button.classList.add(this.activeSettingsButtonClass);
    } else {
      this.button.classList.remove(this.activeSettingsButtonClass);
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
