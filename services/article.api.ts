import { getAllArticles, getArticleBySlug } from "@/data/mock-articles";
import type { Article } from "@/types/article";

export async function fetchArticles(): Promise<Article[]> {
  return Promise.resolve(getAllArticles());
}

export async function fetchArticle(slug: string): Promise<Article | undefined> {
  return Promise.resolve(getArticleBySlug(slug));
}
