// components/article/related-articles.tsx
import type { Article } from "@/types/article";
import ArticleCard from "@/components/shared/article-card";

interface RelatedArticlesProps {
  current: Article;
  items: Article[];
}

export default function RelatedArticles({ current, items }: RelatedArticlesProps) {
  const related = items
    .filter((a) => a.id !== current.id && a.category === current.category)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Related</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((a) => (
          <ArticleCard key={a.id} article={a} variant="compact" />
        ))}
      </div>
    </section>
  );
}
