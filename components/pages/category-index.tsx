// components/pages/category-index.tsx

"use client";

import ArticleCard from "@/components/news/article-card";
import Breadcrumb from "@/components/shared/breadcrumb";
import {
  getArticlesByCategory,
  getArticlesByCategoryAndSub,
} from "@/data/mock-articles";

interface CategoryIndexProps {
  category: string; // slug: "tech"
  title: string;    // display: "Tech / AI ML"
  sub?: string;     // slug: "ai-ml"
}

export default function CategoryIndex({
  category,
  title,
  sub,
}: CategoryIndexProps) {
  // ✅ USE SLUGS FOR FILTERING
  const list = sub
    ? getArticlesByCategoryAndSub(category, sub)
    : getArticlesByCategory(category);

  return (
    <main className="container-8xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: titleCase(category), href: `/category/${category}` },
          ...(sub
            ? [
                { label: slugToTitle(sub), href: `/category/${category}/${sub}` },
              ]
            : []),
        ]}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Latest stories curated for {title}.
        </p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
          No articles yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {list.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}

/* ---------- helpers (display only) ---------- */

function titleCase(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.toUpperCase())
    .join(" ");
}
