// components/home/category-block.tsx
import Link from "next/link";
import { getAllArticles } from "@/data/mock-articles";
import ArticleCard from "@/components/shared/article-card";
import type { CategoryKey } from "@/types/article";

export default function CategoryBlock({ category }: { category: CategoryKey }) {
  const list = getAllArticles().filter((a) => a.category === category).slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">{category}</h2>
        <Link href={`/${category.toLowerCase()}`} className="text-xs font-semibold text-blue-600 hover:underline">
          See more
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {list.map((a) => (
          <ArticleCard key={a.id} article={a} variant="compact" />
        ))}
      </div>
    </section>
  );
}
