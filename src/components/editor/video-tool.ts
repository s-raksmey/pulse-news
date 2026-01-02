import type { BlockTool, BlockToolConstructorOptions } from "@editorjs/editorjs";

type VideoData = {
  url?: string;
};

export default class VideoTool implements BlockTool {
  private data: VideoData;
  private wrapper: HTMLElement;

  constructor({ data }: BlockToolConstructorOptions<VideoData>) {
    this.data = data || {};
    this.wrapper = document.createElement("div");
  }

  /* -------------------------
     Toolbox
  ------------------------- */
  static get toolbox() {
    return {
      title: "Video",
      icon: "▶️",
    };
  }

  /* -------------------------
     Paste support
  ------------------------- */
  static get pasteConfig() {
    return {
      patterns: {
        video: /https?:\/\/(www\.)?(youtube\.com|youtu\.be|facebook\.com|instagram\.com)\/.+/,
      },
    };
  }

  onPaste(event: any) {
    const url = event.detail.data;
    this.data = { url };
    this.renderVideo();
  }

  /* -------------------------
     Render
  ------------------------- */
  render() {
    this.renderVideo();
    return this.wrapper;
  }

  private renderVideo() {
    this.wrapper.innerHTML = "";

    if (!this.data.url) {
      this.wrapper.innerHTML =
        `<div class="text-sm text-slate-500">Paste a video URL</div>`;
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = this.toIframeSrc(this.data.url);
    iframe.className = "w-full aspect-video rounded-lg";
    iframe.allow =
      "autoplay; encrypted-media; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;

    this.wrapper.appendChild(iframe);
  }

  /* -------------------------
     SAVE (🔥 REQUIRED)
  ------------------------- */
  save() {
    return this.data;
  }

  /* -------------------------
     Helpers
  ------------------------- */
  private toIframeSrc(url: string) {
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtube.com")) {
      const id = new URL(url).searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (url.includes("facebook.com")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&show_text=0`;
    }

    if (url.includes("instagram.com")) {
      const m = url.match(/\/(p|reel)\/([^/]+)/);
      return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : "";
    }

    return "";
  }
}
