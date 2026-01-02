import type {
  BlockTool,
  BlockToolConstructorOptions,
} from "@editorjs/editorjs";

type VideoData = {
  url?: string;
};

export default class VideoTool implements BlockTool {
  private data: VideoData;
  private wrapper: HTMLElement;
  private loading = false;

  constructor({ data }: BlockToolConstructorOptions<VideoData>) {
    this.data = data || {};
    this.wrapper = document.createElement("div");
  }

  static get toolbox() {
    return {
      title: "Video",
      icon: "▶️",
    };
  }

  render() {
    this.wrapper.innerHTML = "";

    /* ---------- INPUT MODE ---------- */
    if (!this.data.url && !this.loading) {
      const input = document.createElement("input");
      input.type = "url";
      input.placeholder =
        "Paste YouTube / Facebook / Instagram URL";
      input.className =
        "w-full rounded-md border px-3 py-2 text-sm";

      input.addEventListener("paste", () => {
        // Allow paste event to complete
        setTimeout(() => {
          const value = input.value.trim();
          if (!value) return;

          this.startProcessing(value);
        }, 0);
      });

      input.addEventListener("change", () => {
        const value = input.value.trim();
        if (!value) return;

        this.startProcessing(value);
      });

      this.wrapper.appendChild(input);
      return this.wrapper;
    }

    /* ---------- LOADING MODE ---------- */
    if (this.loading) {
      const loading = document.createElement("div");
      loading.className =
        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-slate-600";

      loading.innerHTML = `
        <svg
          class="animate-spin h-4 w-4 text-slate-500"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <span>Processing video…</span>
      `;

      this.wrapper.appendChild(loading);
      return this.wrapper;
    }

    /* ---------- VIDEO MODE ---------- */
    const iframe = document.createElement("iframe");
    iframe.src = this.toEmbedUrl(this.data.url!) || "";
    iframe.className = "w-full aspect-video rounded-lg";
    iframe.allow =
      "autoplay; encrypted-media; fullscreen; picture-in-picture";
    iframe.allowFullscreen = true;

    this.wrapper.appendChild(iframe);
    return this.wrapper;
  }

  save() {
    return this.data;
  }

  /* -------------------------
     Processing logic
  ------------------------- */
  private startProcessing(url: string) {
    const embed = this.toEmbedUrl(url);
    if (!embed) return;

    this.loading = true;
    this.render();

    // Simulate async validation / oEmbed fetch
    setTimeout(() => {
      this.data.url = url;
      this.loading = false;
      this.render();
    }, 700); // 👈 UX-friendly delay
  }

  /* -------------------------
     URL → EMBED
  ------------------------- */
  private toEmbedUrl(url: string): string | null {
    try {
      // YouTube (short)
      if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1]?.split(/[?&]/)[0];
        return id
          ? `https://www.youtube.com/embed/${id}`
          : null;
      }

      // YouTube (long)
      if (url.includes("youtube.com")) {
        const id = new URL(url).searchParams.get("v");
        return id
          ? `https://www.youtube.com/embed/${id}`
          : null;
      }

      // Facebook
      if (url.includes("facebook.com")) {
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          url
        )}&show_text=0`;
      }

      // Instagram
      if (url.includes("instagram.com")) {
        const m = url.match(/\/(p|reel)\/([^/]+)/);
        return m
          ? `https://www.instagram.com/${m[1]}/${m[2]}/embed`
          : null;
      }
    } catch {
      return null;
    }

    return null;
  }
}
