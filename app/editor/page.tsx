"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ClipboardEvent as ReactClipboardEvent } from "react";
import NewsEditor, { NewsEditorRef } from "@/components/editor/news-editor";
import EditorRenderer from "@/components/editor/editor-renderer";
import type { OutputData } from "@editorjs/editorjs";

interface ArticleRecord {
  id: string;
  title: string;
  content: OutputData;
  updatedAt: string;
}

const STORAGE_KEY = "news-list";

function getInitialState() {
  const fallback = {
    articles: [] as ArticleRecord[],
    selectedId: null as string | null,
    title: "",
    editorData: undefined as OutputData | undefined,
  };

  if (typeof window === "undefined") return fallback;

  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return fallback;

    const parsed = JSON.parse(cached) as ArticleRecord[];
    const first = parsed[0];

    return {
      articles: parsed,
      selectedId: first?.id ?? null,
      title: first?.title ?? "",
      editorData: first?.content,
    };
  } catch (error) {
    console.error("Failed to parse saved articles", error);
    return fallback;
  }
}

function escapeHtml(text: string) {
  return text
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;");
}

function sanitizeOutput(data: OutputData): OutputData {
  return {
    ...data,
    blocks: data.blocks.map((block) => ({
      ...block,
      data: Object.fromEntries(
        Object.entries(block.data ?? {}).map(([key, value]) => {
          if (typeof value === "string") {
            return [key, escapeHtml(value)];
          }
          if (Array.isArray(value)) {
            return [
              key,
              value.map((item) =>
                typeof item === "string" ? escapeHtml(item) : item
              ),
            ];
          }
          return [key, value];
        })
      ),
    })),
  };
}

function validateArticle(title: string, data: OutputData) {
  if (!title.trim()) return "Title is required";
  if (!data.blocks.length) return "Add at least one block";
  const hasText = data.blocks.some(
    (block) =>
      (block.type === "paragraph" || block.type === "header") &&
      Boolean((block.data as { text?: string }).text?.trim())
  );
  if (!hasText) return "Include some body text before saving";
  return "";
}

export default function EditorPlaygroundPage() {
  const initialState = getInitialState();
  const editorRef = useRef<NewsEditorRef | null>(null);
  const [articles, setArticles] = useState<ArticleRecord[]>(
    initialState.articles
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    initialState.selectedId
  );
  const [title, setTitle] = useState(initialState.title);
  const [editorData, setEditorData] = useState<OutputData | undefined>(
    initialState.editorData
  );
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [status, setStatus] = useState<string>("");

  const persist = useCallback((nextArticles: ArticleRecord[]) => {
    setArticles(nextArticles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextArticles));
  }, []);

  const resetForm = useCallback(() => {
    setSelectedId(null);
    setTitle("");
    setEditorData({ blocks: [] });
    setStatus("Started a fresh draft");
  }, []);

  const handleSave = useCallback(async () => {
    if (!editorRef.current) return;

    const output = await editorRef.current.save();
    const sanitized = sanitizeOutput(output);
    const validationError = validateArticle(title, sanitized);
    if (validationError) {
      setStatus(validationError);
      return;
    }

    const nextArticle: ArticleRecord = {
      id: selectedId ?? crypto.randomUUID(),
      title: escapeHtml(title.trim()),
      content: sanitized,
      updatedAt: new Date().toISOString(),
    };

    const next = selectedId
      ? articles.map((article) =>
          article.id === selectedId ? nextArticle : article
        )
      : [nextArticle, ...articles];

    persist(next);
    setSelectedId(nextArticle.id);
    setStatus("Saved — blocks validated and sanitized");
  }, [articles, persist, selectedId, title]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    const filtered = articles.filter((article) => article.id !== selectedId);
    persist(filtered);
    resetForm();
    setStatus("Deleted the article from local storage");
  }, [articles, persist, resetForm, selectedId]);

  const handleLoad = useCallback((article: ArticleRecord) => {
    setSelectedId(article.id);
    setTitle(article.title);
    setEditorData(article.content);
    setStatus("Loaded saved data back into the editor");
  }, []);

  const insertQuoteFromApi = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.insertBlock(
      "quote",
      {
        text: "This quote was inserted via the EditorJS API.",
        caption: "Blocks API demo",
      },
      0
    );
    setStatus("Used EditorJS API to insert a block");
  }, []);

  const handlePasteSubstitution = useCallback(
    (event: ReactClipboardEvent<HTMLDivElement>) => {
      const text = event.clipboardData?.getData("text/plain");
      if (!text || !editorRef.current) return;
      if (text.startsWith("::quote ")) {
        event.preventDefault();
        editorRef.current.insertBlock(
          "quote",
          {
            text: escapeHtml(text.replace("::quote ", "")),
            caption: "Converted from paste",
          },
          0
        );
        setStatus("Converted pasted text into a quote block");
      }
    },
    []
  );

  const latestArticle = useMemo(
    () => articles.find((article) => article.id === selectedId),
    [articles, selectedId]
  );

  return (
    <main className="container-8xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-blue-600">EditorJS</p>
        <h1 className="text-3xl font-bold text-gray-900">Article playground</h1>
        <p className="max-w-3xl text-sm text-gray-600">
          Create, read, update, and delete articles saved in local storage. The
          editor is configured with inline toolbars, custom block settings,
          paste substitutions, and sanitization to showcase a full EditorJS
          workflow.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <input
              className="min-w-0 flex-1 rounded border px-3 py-2 text-sm"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="rounded border px-3 py-2 text-sm"
              onClick={resetForm}
            >
              New draft
            </button>
            <button
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              onClick={handleSave}
            >
              {selectedId ? "Update" : "Create"} article
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
            <button
              className="rounded border px-3 py-1"
              onClick={() => setView(view === "edit" ? "preview" : "edit")}
            >
              {view === "edit" ? "Switch to preview" : "Back to editor"}
            </button>
            <button
              className="rounded border px-3 py-1"
              onClick={insertQuoteFromApi}
            >
              Access Editor API
            </button>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              Paste “::quote your text” to auto-create a quote
            </span>
          </div>

          {view === "edit" ? (
            <div
              onPaste={handlePasteSubstitution}
              className="space-y-3 rounded-lg border bg-white p-3 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase text-gray-500">
                Inline toolbar enabled · Highlight tune in block settings
              </p>
              <NewsEditor
                ref={editorRef}
                data={editorData}
                config={{
                  placeholder: "Start writing with / commands or paste content",
                  autofocus: true,
                }}
              />
            </div>
          ) : (
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              {latestArticle ? (
                <EditorRenderer content={latestArticle.content} />
              ) : (
                <p className="text-sm text-gray-500">Nothing to preview yet.</p>
              )}
            </div>
          )}

          {status && (
            <div className="rounded border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              {status}
            </div>
          )}
        </div>

        <aside className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Saved articles</h2>
              <p className="text-xs text-gray-500">Stored in local storage</p>
            </div>
            {selectedId && (
              <button
                className="text-sm text-red-600 hover:underline"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </header>

          <div className="space-y-3">
            {articles.length === 0 && (
              <p className="text-sm text-gray-500">No articles saved yet.</p>
            )}

            {articles.map((article) => (
              <button
                key={article.id}
                className={`w-full rounded border px-3 py-2 text-left text-sm transition hover:border-blue-400 hover:bg-blue-50 ${
                  selectedId === article.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handleLoad(article)}
              >
                <p className="font-semibold text-gray-900">{article.title}</p>
                <p className="text-xs text-gray-500">
                  Updated {new Date(article.updatedAt).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
