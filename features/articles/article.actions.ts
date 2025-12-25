import type { Article } from "@/types/article";
import { persistArticles, parseStoredArticles } from "@/utils/article-storage";

export function saveArticle(record: Article) {
  const current = parseStoredArticles();
  const existingIndex = current.findIndex((item) => item.id === record.id);
  const next = [...current];

  if (existingIndex >= 0) {
    next[existingIndex] = { ...next[existingIndex], ...record } as never;
  } else {
    next.unshift(record as never);
  }

  persistArticles(next as never);
}
