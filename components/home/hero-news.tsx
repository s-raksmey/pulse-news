// components/home/hero-news.tsx
import { getAllArticles } from "@/data/mock-articles";
import ArticleCard from "@/components/shared/article-card";

export default function HeroNews() {
  const list = getAllArticles().filter((a) => a.category !== "Blog").slice(0, 5);
  const [main, ...rest] = list;

  if (!main) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7">
        <ArticleCard article={main} />
      </div>
      <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {rest.slice(0, 4).map((a) => (
          <ArticleCard key={a.id} article={a} variant="compact" />
        ))}
      </div>
    </section>
  );
}
