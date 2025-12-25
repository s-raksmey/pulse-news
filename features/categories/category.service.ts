import { getAllArticles } from "@/data/mock-articles";

export function listCategories(): string[] {
  const categories = new Set<string>();
  getAllArticles().forEach((article) => categories.add(article.category));
  return Array.from(categories).sort();
}
