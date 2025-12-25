"use client";

import type { API, BlockTune } from "@editorjs/editorjs";

interface HighlightData {
  highlighted?: boolean;
}

export default class HighlightTune implements BlockTune {
  private api: API;
  private data: HighlightData;
  private button: HTMLButtonElement;
  private settingsButtonClass: string;
  private activeSettingsButtonClass: string;

  static get isTune(): boolean {
    return true;
  }

  constructor({ api, data }: { api: API; data?: HighlightData }) {
    this.api = api;
    this.data = data ?? {};
    this.settingsButtonClass =
      this.api.styles?.settingsButton ?? "cdx-settings-button";
    this.activeSettingsButtonClass =
      this.api.styles?.settingsButtonActive ??
      "cdx-settings-button--active";

    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.className = this.settingsButtonClass;
    this.button.innerHTML = "⚡";
    this.button.title = "Toggle highlight";

    this.button.addEventListener("click", () => {
      this.data.highlighted = !this.data.highlighted;
      this.render();   // update button active state
      this.apply();    // apply class to block holder
    });
  }

  /**
   * Render the tune button in the block settings menu
   */
  render() {
    if (this.data.highlighted) {
      this.button.classList.add(this.activeSettingsButtonClass);
    } else {
      this.button.classList.remove(this.activeSettingsButtonClass);
    }
    return this.button;
  }

  /**
   * Return saved tune data
   */
  save(): HighlightData {
    return {
      highlighted: Boolean(this.data.highlighted),
    };
  }

  /**
   * REQUIRED for compatibility with Paragraph and other core blocks.
   * Passthrough implementation – returns the original content unchanged.
   * This prevents Editor.js from skipping the block due to "plugins error".
   */
  wrap(blockContent: HTMLElement): HTMLElement {
    return blockContent;
  }

  /**
   * Apply the highlight by toggling a custom class on the block's holder element.
   * This is safe and works reliably with Paragraph blocks.
   */
  private apply() {
    const index = this.api.blocks.getCurrentBlockIndex();
    const block = this.api.blocks.getBlockByIndex(index);

    if (!block || !(block.holder instanceof HTMLElement)) return;

    block.holder.classList.toggle(
      "editor-highlight",
      Boolean(this.data.highlighted)
    );
  }
}