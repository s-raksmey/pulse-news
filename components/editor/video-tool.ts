import type { BlockTool } from "@editorjs/editorjs";

/* =========================
   URL Validation (Regex)
========================= */

const FACEBOOK_REGEX =
  /^https?:\/\/(www\.)?(facebook\.com\/(reel|watch|.*\/videos)\/|fb\.watch\/)[A-Za-z0-9._%-]+/;

const YOUTUBE_REGEX =
  /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[A-Za-z0-9_-]{6,}/;

const INSTAGRAM_REGEX =
  /^https?:\/\/(www\.)?instagram\.com\/(p|reel)\/[A-Za-z0-9_-]+\/?/;

function isSupportedVideoUrl(url: string): boolean {
  return (
    FACEBOOK_REGEX.test(url) ||
    YOUTUBE_REGEX.test(url) ||
    INSTAGRAM_REGEX.test(url)
  );
}

type Provider = "facebook" | "youtube" | "instagram" | null;

function detectProvider(url: string): Provider {
  if (FACEBOOK_REGEX.test(url)) return "facebook";
  if (YOUTUBE_REGEX.test(url)) return "youtube";
  if (INSTAGRAM_REGEX.test(url)) return "instagram";
  return null;
}

/* =========================
   Video Tool
========================= */

interface VideoData {
  url?: string;
}

export default class VideoTool implements BlockTool {
  static get toolbox() {
    return {
      title: "Video",
      icon: "▶",
    };
  }

  private data: VideoData;
  private wrapper: HTMLDivElement;

  constructor({ data }: { data: VideoData }) {
    this.data = data || {};
    this.wrapper = document.createElement("div");
  }

  render() {
    this.wrapper.innerHTML = "";

    /* ---------- Input ---------- */
    const input = document.createElement("input");
    input.type = "url";
    input.placeholder =
      "Paste Facebook / YouTube / Instagram video link";
    input.className =
      "cdx-input w-full rounded border px-3 py-2";
    input.value = this.data.url ?? "";

    /* ---------- Paste Protection ---------- */
    input.addEventListener("paste", (e) => {
      e.preventDefault();

      const text = e.clipboardData?.getData("text/plain");
      if (!text) return;

      if (!isSupportedVideoUrl(text)) {
        alert(
          "Invalid video link. Only Facebook, YouTube, or Instagram videos are allowed."
        );
        return;
      }

      input.value = text;
      this.data.url = text;
      this.render();
    });

    input.addEventListener("change", () => {
      if (input.value && !isSupportedVideoUrl(input.value)) {
        alert(
          "Invalid video link. Only Facebook, YouTube, or Instagram videos are allowed."
        );
        input.value = "";
        this.data.url = undefined;
        return;
      }

      this.data.url = input.value;
      this.render();
    });

    this.wrapper.appendChild(input);

    /* ---------- Video Preview ---------- */
    if (this.data.url) {
      const provider = detectProvider(this.data.url);

      if (provider) {
        const preview = document.createElement("div");

        /* Container styles (NEWS STYLE) */
        preview.style.marginTop = "16px";
        preview.style.display = "flex";
        preview.style.justifyContent = "center";
        preview.style.overflow = "hidden";

        const iframe = document.createElement("iframe");

        /* Layout FIX (THIS SOLVES YOUR ISSUE) */
        iframe.style.width = "100%";
        iframe.style.maxWidth = "720px";       // prevent too big
        iframe.style.aspectRatio = "16 / 9";   // correct ratio
        iframe.style.border = "0";
        iframe.style.borderRadius = "12px";
        iframe.style.display = "block";
        iframe.allowFullscreen = true;

        /* Provider embed */
        if (provider === "youtube") {
          iframe.src = toYoutubeEmbed(this.data.url);
        }

        if (provider === "facebook") {
          iframe.src = toFacebookEmbed(this.data.url);
        }

        if (provider === "instagram") {
          iframe.src = toInstagramEmbed(this.data.url);
        }

        preview.appendChild(iframe);
        this.wrapper.appendChild(preview);
      }
    }

    return this.wrapper;
  }

  save(): VideoData {
    return { url: this.data.url };
  }

  validate(data: VideoData) {
    return Boolean(data.url);
  }
}

/* =========================
   Embed Helpers
========================= */

function toYoutubeEmbed(url: string): string {
  if (url.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${url.split("/").pop()}`;
  }
  const id = new URL(url).searchParams.get("v");
  return `https://www.youtube.com/embed/${id}`;
}

function toFacebookEmbed(url: string): string {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false`;
}

function toInstagramEmbed(url: string): string {
  const match = url.match(/\/(p|reel)\/([^/]+)/);
  return match
    ? `https://www.instagram.com/p/${match[2]}/embed`
    : "";
}
