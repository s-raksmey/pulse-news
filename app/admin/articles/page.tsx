"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  FileText,
  LayoutDashboard,
  PenLine,
  Plus,
  Sparkles,
  Tag,
} from "lucide-react";

import { getAllArticles } from "@/data/mock-articles";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function AdminArticlesPage() {
  const articles = getAllArticles();
  const categories = articles.reduce<Record<string, number>>((acc, article) => {
    acc[article.category] = (acc[article.category] ?? 0) + 1;
    return acc;
  }, {});

  const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  const editorsPicks = articles.filter((article) => article.isEditorsPick).length;
  const breakingStories = articles.filter((article) => article.isBreaking).length;
  const pipeline = articles.slice(0, 4);

  const statCards = [
    {
      label: "Published Articles",
      value: articles.length.toString(),
      hint: `${editorsPicks} editor picks`,
    },
    {
      label: "Latest publish",
      value: articles[0] ? formatDate(articles[0].publishedAt) : "—",
      hint: articles[0]?.title ?? "Awaiting first article",
    },
    {
      label: "Active categories",
      value: Object.keys(categories).length.toString(),
      hint: `${topCategory} trending`,
    },
    {
      label: "Breaking stories",
      value: breakingStories.toString(),
      hint: "Monitored live",
    },
  ];

  return (
    <main className="bg-gray-50">
      <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <LayoutDashboard className="h-4 w-4" />
              <span>Pulse News · Content Studio</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Articles workspace</h1>
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Live
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {articles.length} saved
              </span>
            </div>
            <p className="max-w-3xl text-sm text-gray-600">
              Review newsroom and blog content with responsive controls for quick edits on any device. Saved editor content
              flows here so you can spot gaps, ship breaking stories, and keep categories balanced.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 ring-1 ring-blue-100">Editorial</span>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700 ring-1 ring-gray-200">Articles</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Plus className="h-4 w-4" />
              Add new article
            </Link>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <PenLine className="h-4 w-4 text-blue-600" />
              View Editor
            </Link>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">{item.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                  <p className="text-sm text-gray-600">{item.hint}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                Details
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <div className="space-y-6 xl:col-span-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Latest in pipeline</h2>
                  <p className="text-sm text-gray-600">Most recent saves from editor.</p>
                </div>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    <FileText className="h-4 w-4" /> Published
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                    <CalendarClock className="h-4 w-4" /> Drafting
                  </span>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full table-fixed text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="w-[44%] px-4 py-3 font-semibold">Story</th>
                      <th className="w-[18%] px-4 py-3 font-semibold">Category</th>
                      <th className="w-[18%] px-4 py-3 font-semibold">Published</th>
                      <th className="w-[20%] px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {pipeline.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-4 text-sm text-gray-500">
                          No articles saved yet. Create one from the editor to populate the dashboard.
                        </td>
                      </tr>
                    )}
                    {pipeline.map((story) => (
                      <tr key={story.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-900 break-words">{story.title}</td>
                        <td className="px-4 py-3 text-gray-700">{story.category}</td>
                        <td className="px-4 py-3 text-gray-600">{formatDate(story.publishedAt)}</td>
                        <td className="px-4 py-3 text-gray-600">
                          <Link
                            href={`/admin/articles/${story.id}/edit`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
                          >
                            Continue
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">All articles</h2>
                  <p className="text-sm text-gray-600">Responsive cards on mobile, table on larger screens.</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{articles.length} items</span>
              </div>

              <div className="mt-4 grid gap-3 sm:hidden">
                {articles.map((article) => (
                  <div key={article.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-900">{article.title}</p>
                        <p className="text-xs text-gray-600">{article.category}</p>
                        <p className="text-xs text-gray-500">{formatDate(article.publishedAt)}</p>
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

              <div className="mt-4 hidden overflow-hidden rounded-xl border border-gray-200 sm:block">
                <div className="w-full overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-3">Title</th>
                        <th className="whitespace-nowrap px-4 py-3">Category</th>
                        <th className="whitespace-nowrap px-4 py-3">Author</th>
                        <th className="whitespace-nowrap px-4 py-3">Published</th>
                        <th className="whitespace-nowrap px-4 py-3">Tags</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {articles.map((article) => (
                        <tr key={article.id} className="hover:bg-gray-50">
                          <td className="max-w-xs truncate px-4 py-3 font-semibold text-gray-900">{article.title}</td>
                          <td className="px-4 py-3 text-gray-700">{article.category}</td>
                          <td className="px-4 py-3 text-gray-700">{article.author.name}</td>
                          <td className="px-4 py-3 text-gray-500">{formatDate(article.publishedAt)}</td>
                          <td className="px-4 py-3 text-gray-600">
                            <div className="flex flex-wrap gap-2">
                              {(article.tags ?? []).slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                                >
                                  <Tag className="h-3 w-3 text-blue-500" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link
                              href={`/admin/articles/${article.id}/edit`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                              Edit
                              <ArrowUpRight className="h-4 w-4" />
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

          <aside className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Publishing tempo</p>
                  <h3 className="text-lg font-semibold">Editor bridge active</h3>
                </div>
                <Sparkles className="h-5 w-5 text-blue-200" />
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Synced articles</span>
                  <span className="font-semibold">{articles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Editor picks</span>
                  <span className="font-semibold">{editorsPicks}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                </div>
              </div>
              <div className="mt-5 rounded-xl bg-white/10 p-4 text-sm text-gray-100">
                <p className="font-semibold">Add a new story</p>
                <p className="text-gray-200">Start a fresh draft directly from the article workspace.</p>
                <Link
                  href="/admin/articles/new"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Launch editor
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Category signals</h3>
                  <p className="text-sm text-gray-600">Where coverage is strongest.</p>
                </div>
                <Tag className="h-5 w-5 text-blue-600" />
              </div>
              <div className="mt-4 space-y-3 text-sm">
                {Object.entries(categories)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                      <div>
                        <p className="font-semibold text-gray-900">{category}</p>
                        <p className="text-gray-600">{count} stories saved</p>
                      </div>
                      <span className="text-blue-600">● Tracking</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Saved article spotlight</h3>
                  <p className="text-sm text-gray-600">Pulled from the latest save.</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-blue-600" />
              </div>
              {articles[0] ? (
                <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">{articles[0].title}</p>
                  <p className="text-sm text-gray-600">{articles[0].excerpt}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-gray-700 ring-1 ring-gray-200">
                      {articles[0].category}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-gray-700 ring-1 ring-gray-200">
                      {articles[0].author.name}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-gray-700 ring-1 ring-gray-200">
                      {formatDate(articles[0].publishedAt)}
                    </span>
                  </div>
                  <Link
                    href={`/admin/articles/${articles[0].id}/edit`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
                  >
                    Edit spotlight
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">No articles available yet.</p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
