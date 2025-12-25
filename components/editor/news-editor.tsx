"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type { OutputData } from "@editorjs/editorjs";
import type EditorJS from "@editorjs/editorjs";

import VideoTool from "@/components/editor/video-tool";

export interface NewsEditorRef {
  save: () => Promise<OutputData>;
}

const NewsEditor = forwardRef<NewsEditorRef>((_, ref) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    save: async () => {
      if (!editorRef.current) {
        throw new Error("Editor not initialized");
      }
      return editorRef.current.save();
    },
  }));

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!holderRef.current) return;

      const [
        { default: EditorJS },
        { default: Header },
        { default: List },
        { default: Quote },
      ] = await Promise.all([
        import("@editorjs/editorjs"),
        import("@editorjs/header"),
        import("@editorjs/list"),
        import("@editorjs/quote"),
      ]);

      if (!mounted) return;

      const editor = new EditorJS({
        holder: holderRef.current,
        placeholder: "Write news content here...",
        tools: {
          header: Header,
          list: List,
          quote: Quote,
          video: VideoTool, // ✅ only way to add video
        },
      });

      editorRef.current = editor;
    }

    init();

    return () => {
      mounted = false;
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  return (
    <div className="rounded-md border bg-white p-3">
      <div ref={holderRef} />
    </div>
  );
});

NewsEditor.displayName = "NewsEditor";
export default NewsEditor;
