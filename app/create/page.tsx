"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NewsEditor, { NewsEditorRef } from "@/components/editor/news-editor";
import type { OutputData } from "@editorjs/editorjs";

export default function CreateNewsPage() {
  const router = useRouter();
  const editorRef = useRef<NewsEditorRef | null>(null);

  const [title, setTitle] = useState("");
  const [json, setJson] = useState<OutputData | null>(null);

  const post = async () => {
    if (!editorRef.current) return;
    const content = await editorRef.current.save();

    const list = JSON.parse(
      localStorage.getItem("news-list") || "[]"
    );

    list.unshift({
      id: crypto.randomUUID(),
      title,
      content,
    });

    localStorage.setItem("news-list", JSON.stringify(list));
    router.push("/");
  };

  const viewJson = async () => {
    if (!editorRef.current) return;
    setJson(await editorRef.current.save());
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <input
        className="mb-4 w-full border px-3 py-2"
        placeholder="News title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <NewsEditor ref={editorRef} />

      <div className="mt-6 flex justify-between">
        <button onClick={viewJson}>View JSON</button>
        <button
          onClick={post}
          className="bg-blue-600 px-6 py-2 text-white"
        >
          Post News
        </button>
      </div>

      {json && (
        <pre className="mt-6 bg-black p-4 text-xs text-white">
          {JSON.stringify(json, null, 2)}
        </pre>
      )}
    </main>
  );
}
