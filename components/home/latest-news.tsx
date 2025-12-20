// components/home/latest-news.tsx
import { getAllArticles } from "@/data/mock-articles";
import ArticleCard from "@/components/shared/article-card";

export default function LatestNews() {
  const latest = getAllArticles().filter((a) => a.category !== "Blog").slice(0, 8);

  return (
    <section>
      <div className="flex items-end justify-between gap-4 mb-4">
        <h2 className="text-lg font-bold text-gray-900">Latest</h2>
        <span className="text-xs text-gray-500">Updated continuously</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {latest.map((a) => (
          <ArticleCard key={a.id} article={a} variant="compact" />
        ))}
      </div>
    </section>
  );
}
