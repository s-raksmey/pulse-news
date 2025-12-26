import Link from "next/link";
import { getAllArticles } from "@/data/mock-articles";

export default function AdminArticlesPage() {
  const articles = getAllArticles();
  const sortedByCategory = [...articles].sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 ring-1 ring-blue-100">Editorial</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 ring-1 ring-gray-200">Articles</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Articles workspace</h1>
            <p className="max-w-2xl text-sm text-gray-600">
              Review newsroom and blog content with responsive controls for quick edits on any device.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Total articles</p>
            <p className="text-2xl font-semibold text-gray-900">{articles.length}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Most recent</p>
            <p className="text-sm font-semibold text-gray-900">
              {articles[0]?.title ?? "No articles"}
            </p>
            <p className="text-xs text-gray-500">
              {articles[0] ? new Date(articles[0].publishedAt).toLocaleDateString() : "Pending"}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Top category</p>
            <p className="text-sm font-semibold text-gray-900">
              {sortedByCategory[0]?.category ?? "—"}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-500">Visibility</p>
            <p className="text-sm font-semibold text-gray-900">Responsive tables & cards</p>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Articles list</h2>
              <p className="text-sm text-gray-600">Swipe-friendly cards on mobile, table on larger screens.</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{articles.length} items</span>
          </div>

          <div className="grid gap-3 sm:hidden">
            {articles.map((article) => (
              <div
                key={article.id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-900">{article.title}</p>
                    <p className="text-xs text-gray-600">{article.category}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="text-xs font-semibold text-blue-600"
                  >
                    Edit
                  </Link>
                </div>
                <p className="mt-2 text-xs text-gray-500">{article.author.name}</p>
              </div>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-xl border border-gray-200 sm:block">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3">Title</th>
                    <th className="whitespace-nowrap px-4 py-3">Category</th>
                    <th className="whitespace-nowrap px-4 py-3">Author</th>
                    <th className="whitespace-nowrap px-4 py-3">Updated</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="max-w-xs truncate px-4 py-3 font-semibold text-gray-900">{article.title}</td>
                      <td className="px-4 py-3 text-gray-700">{article.category}</td>
                      <td className="px-4 py-3 text-gray-700">{article.author.name}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
