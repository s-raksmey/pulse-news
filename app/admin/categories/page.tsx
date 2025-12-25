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
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="text-sm text-gray-600">Overview of available newsroom channels.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([name, count]) => (
          <div
            key={name}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm"
          >
            <div className="text-sm font-semibold text-gray-900">{name}</div>
            <div className="text-xs text-gray-600">{count} article(s)</div>
          </div>
        ))}
      </div>
    </div>
  );
}
