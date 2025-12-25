import { getAllArticles, getArticleBySlug } from "@/data/mock-articles";
import type { Article } from "@/types/article";

export function listArticles(): Article[] {
  return getAllArticles();
}

export function findArticleBySlug(slug: string): Article | undefined {
  return getArticleBySlug(slug);
}
