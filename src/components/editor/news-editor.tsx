"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import type { OutputData, ToolConstructable } from "@editorjs/editorjs";

import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";

import VideoTool from "@/components/editor/video-tool";
import HighlightTune from "@/components/editor/highlight-tune";

/* =========================
   Safe tool cast helper
========================= */
const asTool = (tool: unknown) => tool as ToolConstructable;

/* =========================
   Ref API
========================= */
export interface NewsEditorRef {
  save: () => Promise<OutputData>;
  clear: () => Promise<void>;
}

interface NewsEditorProps {
  initialData?: OutputData;
  readOnly?: boolean;
}

const NewsEditor = forwardRef<NewsEditorRef, NewsEditorProps>(
  ({ initialData, readOnly = false }, ref) => {
    const editorRef = useRef<any>(null);
    const holderRef = useRef<HTMLDivElement | null>(null);

    /* ---------- Expose API ---------- */
    useImperativeHandle(ref, () => ({
      save: async () => {
        if (!editorRef.current) {
          throw new Error("Editor not initialized");
        }
        return editorRef.current.save();
      },

      clear: async () => {
        if (!editorRef.current) {
          throw new Error("Editor not initialized");
        }
        if (typeof editorRef.current.clear === "function") {
          await editorRef.current.clear();
        }
      },
    }));

    /* ---------- Init Editor (SAFE) ---------- */
    useEffect(() => {
      let destroyed = false;

      (async () => {
        if (!holderRef.current) return;
        if (editorRef.current) return;

        // ✅ CRITICAL: dynamic import
        const EditorJSImport = await import("@editorjs/editorjs");
        const EditorJS = EditorJSImport.default;

        if (!EditorJS || destroyed) return;

        const editor = new EditorJS({
          holder: holderRef.current,
          readOnly,
          autofocus: true,
          minHeight: 120,
          placeholder: "Write news content here…",
          data: initialData ?? { blocks: [] },

          tools: {
            highlight: asTool(HighlightTune),

            paragraph: {
              inlineToolbar: true,
              tunes: ["highlight"],
            },

            header: {
              class: asTool(Header),
              inlineToolbar: true,
              config: {
                placeholder: "Section heading",
                levels: [2, 3, 4],
                defaultLevel: 2,
              },
              tunes: ["highlight"],
            },

            list: {
              class: asTool(List),
              inlineToolbar: true,
              tunes: ["highlight"],
            },

            quote: {
              class: asTool(Quote),
              inlineToolbar: true,
              tunes: ["highlight"],
            },

            video: {
              class: asTool(VideoTool),
              inlineToolbar: true,
            },

            linkTool: {
              class: asTool(LinkTool),
              config: {
                endpoint: "/api/link-preview",
              },
            },
          },
        });

        editorRef.current = editor;
      })();

      return () => {
        destroyed = true;

        // ✅ SAFE destroy
        const ed = editorRef.current;
        if (ed && typeof ed.destroy === "function") {
          ed.destroy();
        }

        editorRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="rounded-md border bg-white p-3">
        <div ref={holderRef} />
      </div>
    );
  }
);

NewsEditor.displayName = "NewsEditor";
export default NewsEditor;
