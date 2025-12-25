import type { Article } from "@/types/article";
import ArticleCard from "./article-card";

interface ArticleListProps {
  current?: Article;
  items: Article[];
  title?: string;
}

export default function ArticleList({ current, items, title = "Related" }: ArticleListProps) {
  const filtered = current
    ? items.filter((a) => a.id !== current.id && a.category === current.category)
    : items;
  const list = filtered.slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {list.map((article) => (
          <ArticleCard key={article.id} article={article} variant="compact" />
        ))}
      </div>
    </section>
  );
}
