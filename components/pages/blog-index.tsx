// components/pages/blog-index.tsx
import ArticleCard from "@/components/shared/article-card";
import Breadcrumb from "@/components/shared/breadcrumb";
import { getAllArticles } from "@/data/mock-articles";

export default function BlogIndex() {
  const list = getAllArticles().filter((a) => a.category === "Blog");

  return (
    <main className="container-8xl px-4 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />

      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Blog</h1>
        <p className="mt-2 text-sm text-gray-600">
          Long-form stories, analysis, and editorial perspectives.
        </p>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
          No blog posts yet. Add more items with category <code className="font-mono">&quot;Blog&quot;</code>.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {list.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </main>
  );
}
