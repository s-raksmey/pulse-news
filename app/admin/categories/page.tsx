import { getAllArticles } from "@/data/mock-articles";

export default function AdminCategoriesPage() {
  const articles = getAllArticles();
  const categories = Array.from(
    articles.reduce((map, article) => {
      const current = map.get(article.category) ?? 0;
      map.set(article.category, current + 1);
      return map;
    }, new Map<string, number>())
  ).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Categories</h1>
          <p className="max-w-2xl text-sm text-gray-600">
            Overview of newsroom channels with responsive cards optimized for any screen.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <div className="rounded-lg bg-blue-50 px-3 py-2 text-blue-700 ring-1 ring-blue-100">
            {categories.length} total categories
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-2 text-gray-700 ring-1 ring-gray-200">
            {articles.length} total articles
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map(([name, count]) => (
          <div
            key={name}
            className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-900">{name}</div>
                <div className="text-xs text-gray-600">{count} article(s)</div>
              </div>
              <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                {Math.round((count / Math.max(articles.length, 1)) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
