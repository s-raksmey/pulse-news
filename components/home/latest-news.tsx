// components/home/latest-news.tsx

"use client";

import { useSyncExternalStore } from "react";
import EditorRenderer from "@/components/renderer/editor-renderer";
import type { OutputData } from "@editorjs/editorjs";

/* =========================
   Types
========================= */

interface NewsItem {
  id: string;
  title: string;
  content: OutputData;
}

/* =========================
   External Store (React-safe)
========================= */

// Client-side store
let store: NewsItem[] = [];

// Subscribers
const listeners: Set<() => void> = new Set();

// ⚠️ MUST be cached & stable
const SERVER_SNAPSHOT: NewsItem[] = [];

/* =========================
   Store helpers
========================= */

function readFromStorage(): NewsItem[] {
  try {
    return JSON.parse(
      localStorage.getItem("news-list") || "[]"
    ) as NewsItem[];
  } catch {
    return [];
  }
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

/* =========================
   useSyncExternalStore API
========================= */

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Initial sync
  store = readFromStorage();

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): NewsItem[] {
  return store;
}

function getServerSnapshot(): NewsItem[] {
  // ⚠️ Must always return the SAME reference
  return SERVER_SNAPSHOT;
}

/* =========================
   Store actions
========================= */

function deleteNews(id: string) {
  store = store.filter((item) => item.id !== id);
  localStorage.setItem("news-list", JSON.stringify(store));
  emitChange(); // 🔥 instant UI update
}

/* =========================
   Component
========================= */

export default function LatestNews() {
  const news = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (news.length === 0) return null;

  return (
    <section className="space-y-12">
      {news.map((item) => (
        <article key={item.id}>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {item.title}
            </h2>

            {/* Delete button */}
            <button
              onClick={() => deleteNews(item.id)}
              className="cursor-pointer text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>

          <EditorRenderer content={item.content} />
        </article>
      ))}
    </section>
  );
}
