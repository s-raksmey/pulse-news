"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { ClipboardEvent as ReactClipboardEvent } from "react";
import NewsEditor, { NewsEditorRef } from "@/components/editor/news-editor";
import EditorRenderer from "@/components/renderer/editor-renderer";
import type { OutputData } from "@editorjs/editorjs";
import {
  type ArticleRecord,
  type ArticleStatus,
  parseStoredArticles,
  persistArticles,
} from "@/utils/article-storage";

function getInitialState(id?: string, startWithBlank?: boolean) {
  const articles = parseStoredArticles();

  if (startWithBlank) {
    return {
      articles,
      selectedId: null,
      title: "",
      category: "",
      author: "",
      editorData: { blocks: [] },
      status: "draft" as ArticleStatus,
    };
  }

  const initialSelection = id
    ? articles.find((article) => article.id === id) ?? articles[0]
    : articles[0];

  return {
    articles,
    selectedId: initialSelection?.id ?? null,
    title: initialSelection?.title ?? "",
    category: initialSelection?.category ?? "",
    author: initialSelection?.author ?? "",
    editorData: initialSelection?.content,
    status: initialSelection?.status ?? "draft",
  };
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

function validateArticle(
  title: string,
  category: string,
  author: string,
  data: OutputData
) {
  if (!title.trim()) return "Title is required";
  if (!category.trim()) return "Category is required";
  if (!author.trim()) return "Author is required";
  if (!data.blocks.length) return "Add at least one block";
  const hasText = data.blocks.some(
    (block) =>
      (block.type === "paragraph" || block.type === "header") &&
      Boolean((block.data as { text?: string }).text?.trim())
  );
  if (!hasText) return "Include some body text before saving";
  return "";
}

const statusLabels: Record<ArticleStatus, string> = {
  draft: "Draft",
  in_review: "In review",
  scheduled: "Scheduled",
  published: "Published",
};

export default function ArticleEditorPage({
  articleId,
  startWithBlank,
}: {
  articleId?: string;
  startWithBlank?: boolean;
}) {
  const initialState = getInitialState(articleId, startWithBlank);
  const editorRef = useRef<NewsEditorRef | null>(null);
  const [articles, setArticles] = useState<ArticleRecord[]>(
    initialState.articles
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    initialState.selectedId
  );
  const [title, setTitle] = useState(initialState.title);
  const [category, setCategory] = useState(initialState.category);
  const [author, setAuthor] = useState(initialState.author);
  const [editorData, setEditorData] = useState(initialState.editorData);
  const [articleStatus, setArticleStatus] = useState<ArticleStatus>(
    initialState.status
  );
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const persist = useCallback((nextArticles: ArticleRecord[]) => {
    setArticles(nextArticles);
    persistArticles(nextArticles);
  }, []);

  const resetForm = useCallback(() => {
    setSelectedId(null);
    setTitle("");
    setCategory("");
    setAuthor("");
    setEditorData({ blocks: [] });
    setArticleStatus("draft");
    setStatusMessage("Started a fresh draft");
  }, []);

  const handleSave = useCallback(async () => {
    if (!editorRef.current) return;

    const output = await editorRef.current.save();
    const sanitized = sanitizeOutput(output);
    const validationError = validateArticle(title, category, author, sanitized);
    if (validationError) {
      setStatusMessage(validationError);
      return;
    }

    const nextArticle: ArticleRecord = {
      id: selectedId ?? crypto.randomUUID(),
      title: escapeHtml(title.trim()),
      category: escapeHtml(category.trim()),
      author: escapeHtml(author.trim()),
      content: sanitized,
      updatedAt: new Date().toISOString(),
      status: articleStatus,
    };

    const next = selectedId
      ? articles.map((article) =>
          article.id === selectedId ? nextArticle : article
        )
      : [nextArticle, ...articles];

    persist(next);
    setSelectedId(nextArticle.id);
    setStatusMessage("Saved — blocks validated and sanitized");
  }, [articleStatus, articles, author, category, persist, selectedId, title]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    const filtered = articles.filter((article) => article.id !== selectedId);
    persist(filtered);
    resetForm();
    setStatusMessage("Deleted the article from local storage");
  }, [articles, persist, resetForm, selectedId]);

  const handleLoad = useCallback((article: ArticleRecord) => {
    setSelectedId(article.id);
    setTitle(article.title);
    setCategory(article.category ?? "");
    setAuthor(article.author ?? "");
    setEditorData(article.content ?? { blocks: [] });
    setArticleStatus(article.status ?? "draft");
    setStatusMessage("Loaded saved data back into the editor");
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
    setStatusMessage("Used EditorJS API to insert a block");
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
        setStatusMessage("Converted pasted text into a quote block");
      }
    },
    []
  );

  const latestArticle = useMemo(
    () => articles.find((article) => article.id === selectedId),
    [articles, selectedId]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-blue-600">EditorJS</p>
        <h1 className="text-3xl font-bold text-gray-900">Article playground</h1>
        <p className="max-w-4xl text-sm text-gray-600">
          Create, read, update, and delete articles saved in local storage. The editor is configured with inline toolbars,
          custom block settings, paste substitutions, and sanitization to keep data and rendered content in sync across
          components.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100">
            <input
              className="min-w-0 flex-1 rounded border px-3 py-2 text-sm"
              placeholder="Article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="text-xs font-semibold text-gray-600">
              Status
              <select
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                value={articleStatus}
                onChange={(event) =>
                  setArticleStatus(event.target.value as ArticleStatus)
                }
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
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

          <div className="grid gap-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100 md:grid-cols-2">
            <label className="text-xs font-semibold text-gray-600">
              Category
              <input
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="e.g. World news"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </label>
            <label className="text-xs font-semibold text-gray-600">
              Author
              <input
                className="mt-1 w-full rounded border px-3 py-2 text-sm"
                placeholder="Your name"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </label>
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

          {statusMessage && (
            <div className="rounded border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              {statusMessage}
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

          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
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
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1 break-words">
                    <p className="font-semibold text-gray-900">{article.title}</p>
                    <p className="text-xs text-gray-600">
                      {article.category || "Uncategorized"} · {article.author || "Unknown"}
                    </p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {statusLabels[article.status]}
                  </span>
                </div>
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
