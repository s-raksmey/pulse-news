"use client";

import { useEffect, useState } from "react";
import EditorRenderer from "@/components/renderer/editor-renderer";
import type { EditorOutputData } from "@/types/editor";

export default function NewArticlePreviewPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] =
    useState<EditorOutputData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("preview:new-article");
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      setTitle(data.title ?? "");
      setExcerpt(data.excerpt ?? "");
      setContent(data.content ?? null);
    } catch {
      // ignore corrupted preview data
    }
  }, []);

  if (!content) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20">
        <p className="text-slate-600">
          Nothing to preview. Go back to the editor and click Preview.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="rounded-md bg-yellow-100 px-4 py-2 text-sm text-yellow-800">
        Preview mode — new article (not saved)
      </div>

      <h1 className="text-3xl font-bold">{title}</h1>

      {excerpt && (
        <p className="text-slate-600">{excerpt}</p>
      )}

      <EditorRenderer data={content} />
    </main>
  );
}
