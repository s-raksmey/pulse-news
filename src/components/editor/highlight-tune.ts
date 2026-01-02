"use client";

import type { API, BlockTune } from "@editorjs/editorjs";

interface HighlightData {
  highlighted?: boolean;
}

export default class HighlightTune implements BlockTune {
  private api: API;
  private data: HighlightData;
  private button: HTMLButtonElement;

  static get isTune(): boolean {
    return true;
  }

  constructor({
    api,
    data,
  }: {
    api: API;
    data?: HighlightData;
  }) {
    this.api = api;
    this.data = data ?? {};

    this.button = document.createElement("button");
    this.button.type = "button";
    this.button.innerHTML = "⚡";
    this.button.title = "Highlight block";

    // Editor.js styles (safe fallback)
    this.button.className =
      this.api.styles?.settingsButton ??
      "cdx-settings-button";

    this.button.addEventListener("click", () => {
      this.data.highlighted = !this.data.highlighted;
      this.apply();
      this.render();
    });
  }

  /**
   * Render tune button in block settings
   */
  render(): HTMLElement {
    const activeClass =
      this.api.styles?.settingsButtonActive ??
      "cdx-settings-button--active";

    if (this.data.highlighted) {
      this.button.classList.add(activeClass);
    } else {
      this.button.classList.remove(activeClass);
    }

    return this.button;
  }

  /**
   * Save tune data
   */
  save(): HighlightData {
    return {
      highlighted: Boolean(this.data.highlighted),
    };
  }

  /**
   * REQUIRED:
   * Must return the block content unchanged
   * or Editor.js will throw "plugins error"
   */
  wrap(blockContent: HTMLElement): HTMLElement {
    return blockContent;
  }

  /**
   * Apply highlight class to block holder
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
