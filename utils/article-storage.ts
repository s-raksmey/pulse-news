import type { OutputData } from "@editorjs/editorjs";

export type ArticleStatus = "draft" | "in_review" | "scheduled" | "published";

export interface ArticleRecord {
  id: string;
  title: string;
  category: string;
  author: string;
  content: OutputData;
  updatedAt: string;
  status: ArticleStatus;
}

export const STORAGE_KEY = "news-list";

export function parseStoredArticles(): ArticleRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return [];

    const parsed = JSON.parse(cached) as ArticleRecord[];

    return parsed.map((article) => ({
      ...article,
      category: article.category ?? "",
      author: article.author ?? "",
      status: article.status ?? "draft",
    }));
  } catch (error) {
    console.error("Failed to parse saved articles", error);
    return [];
  }
}

export function persistArticles(nextArticles: ArticleRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextArticles));
}
