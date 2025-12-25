export {};

declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse: () => void;
      };
    };
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}
