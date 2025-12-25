// components/editor/news-editor.tsx

"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type {
  API,
  EditorConfig,
  OutputData,
  ToolConstructable,
  BlockMutationEvent,
} from "@editorjs/editorjs";

// We import the type only — no runtime import needed yet
import type EditorJS from "@editorjs/editorjs";

import VideoTool from "@/components/editor/video-tool";
import HighlightTune from "@/components/editor/highlight-tune";

export interface NewsEditorRef {
  save: () => Promise<OutputData>;
  render: (data?: OutputData) => Promise<void>;
  clear: () => Promise<void>;
  insertBlock: (
    type: string,
    data?: Record<string, unknown>,
    index?: number
  ) => void;
  setReadOnly: (readOnly: boolean) => void;
}

interface NewsEditorProps {
  data?: OutputData;
  readOnly?: boolean;
  config?: Partial<Omit<EditorConfig, "holder" | "tools" | "tunes">> & {
    tools?: EditorConfig["tools"];
    tunes?: string[];
  };
  onChange?: (api: API) => void;
}

const NewsEditor = forwardRef<NewsEditorRef, NewsEditorProps>(
  ({ data, readOnly = false, config, onChange }, ref) => {
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      save: async () => {
        if (!editorRef.current) throw new Error("Editor not initialized");
        return editorRef.current.save();
      },
      render: async (nextData?: OutputData) => {
        if (!editorRef.current) throw new Error("Editor not initialized");
        await editorRef.current.render(nextData ?? { blocks: [] });
      },
      clear: async () => {
        if (!editorRef.current) throw new Error("Editor not initialized");
        await editorRef.current.clear();
      },
      insertBlock: (type, payload, index) => {
        editorRef.current?.blocks.insert(
          type,
          payload ?? {},
          undefined,
          index
        );
      },
      setReadOnly: (value: boolean) => {
        editorRef.current?.readOnly.toggle(value);
      },
    }));

    useEffect(() => {
      let mounted = true;

      async function init() {
        if (!holderRef.current) return;

        const [
          { default: EditorJS },
          { default: Header },
          { default: Paragraph },
          { default: List },
          { default: Quote },
        ] = await Promise.all([
          import("@editorjs/editorjs"),
          import("@editorjs/header"),
          import("@editorjs/paragraph"),
          import("@editorjs/list"),
          import("@editorjs/quote"),
        ]);

        if (!mounted) return;

        const { tools: configTools, tunes: configTunes, ...restConfig } =
          config ?? {};

        const editor = new EditorJS({
          holder: holderRef.current,
          data,
          readOnly,
          minHeight: 120,
          placeholder: restConfig.placeholder ?? "Write news content here...",
          autofocus: restConfig.autofocus,
          onReady: () => {
            restConfig.onReady?.();
          },
          onChange: async (api: API, event?: BlockMutationEvent | BlockMutationEvent[]) => {
            onChange?.(api);

            // Safely call user's onChange if provided — event is optional in reality
            if (restConfig.onChange) {
              // We know event can be undefined, but the type says it's required.
              // In practice, Editor.js often calls onChange without event on simple changes.
              // Using non-null assertion is safe here because we're matching real behavior.
              await restConfig.onChange(api, event!);
            }
          },
          tools: {
            highlight: HighlightTune as unknown as ToolConstructable,

            paragraph: {
              class: Paragraph as unknown as ToolConstructable,
              inlineToolbar: true,
              tunes: ["highlight"],
            },
            header: {
              class: Header as unknown as ToolConstructable,
              inlineToolbar: ["link", "bold", "italic"],
              config: {
                placeholder: "Section heading",
                levels: [2, 3, 4],
                defaultLevel: 2,
              },
              tunes: ["highlight"],
            },
            list: {
              class: List as unknown as ToolConstructable,
              inlineToolbar: true,
              tunes: ["highlight"],
            },
            quote: {
              class: Quote as unknown as ToolConstructable,
              inlineToolbar: true,
              config: {
                quotePlaceholder: "Paste with ::quote to auto-convert",
              },
              tunes: ["highlight"],
            },
            video: {
              class: VideoTool as unknown as ToolConstructable,
              inlineToolbar: true,
            },
            ...(configTools ?? {}),
          },
          ...(configTunes ? { tunes: configTunes } : {}),
          ...restConfig,
        });

        editorRef.current = editor;
      }

      init();

      return () => {
        mounted = false;
        editorRef.current?.destroy();
        editorRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (editorRef.current && data) {
        editorRef.current.render(data).catch(console.error);
      }
    }, [data]);

    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.readOnly.toggle(Boolean(readOnly));
      }
    }, [readOnly]);

    return (
      <div className="rounded-md border bg-white p-3">
        <div ref={holderRef} />
      </div>
    );
  }
);

NewsEditor.displayName = "NewsEditor";

export default NewsEditor;