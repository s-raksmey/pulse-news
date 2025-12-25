"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  FilePenLine,
  LayoutDashboard,
  PenLine,
  PlayCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  parseStoredArticles,
  STORAGE_KEY,
  type ArticleRecord,
  type ArticleStatus,
} from "@/utils/article-storage";

const statusLabels: Record<ArticleStatus, string> = {
  draft: "Draft",
  in_review: "In review",
  scheduled: "Scheduled",
  published: "Published",
};

const statusStyles: Record<ArticleStatus, string> = {
  draft: "bg-amber-50 text-amber-700",
  in_review: "bg-sky-50 text-sky-700",
  scheduled: "bg-indigo-50 text-indigo-700",
  published: "bg-emerald-50 text-emerald-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<ArticleRecord[]>([]);

  useEffect(() => {
    const loadArticles = () => setArticles(parseStoredArticles());
    loadArticles();

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === STORAGE_KEY) {
        loadArticles();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const sortedArticles = useMemo(
    () =>
      [...articles].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    [articles]
  );

  const statusCounts = useMemo<Record<ArticleStatus, number>>(
    () =>
      sortedArticles.reduce(
        (acc, article) => {
          acc[article.status] += 1;
          return acc;
        },
        { draft: 0, in_review: 0, scheduled: 0, published: 0 }
      ),
    [sortedArticles]
  );

  const totalBlocks = useMemo(
    () =>
      sortedArticles.reduce(
        (sum, article) => sum + (article.content.blocks?.length ?? 0),
        0
      ),
    [sortedArticles]
  );

  const recentContent = useMemo(
    () => sortedArticles.slice(0, 4),
    [sortedArticles]
  );

  const workflow = [
    {
      label: "Drafting",
      count: statusCounts.draft,
      description: "Saved locally and awaiting review",
      accent: "bg-amber-100 text-amber-700",
    },
    {
      label: "Editing",
      count: statusCounts.in_review,
      description: "Editors reviewing content",
      accent: "bg-blue-100 text-blue-700",
    },
    {
      label: "Scheduled",
      count: statusCounts.scheduled,
      description: "Queued to publish from editor",
      accent: "bg-indigo-100 text-indigo-700",
    },
    {
      label: "Published",
      count: statusCounts.published,
      description: "Stories marked complete",
      accent: "bg-emerald-100 text-emerald-700",
    },
  ];

  const stats = [
    {
      label: "Published Articles",
      value: statusCounts.published.toString(),
      change: `${statusCounts.scheduled} scheduled next`,
      trend: "up",
    },
    {
      label: "Drafts in Review",
      value: statusCounts.in_review.toString(),
      change: `${statusCounts.draft} drafts queued`,
      trend: "neutral",
    },
    {
      label: "Saved Drafts",
      value: statusCounts.draft.toString(),
      change: `${sortedArticles.length} total saved`,
      trend: "up",
    },
    {
      label: "Blocks Captured",
      value: totalBlocks.toString(),
      change: "Synced from Editor",
      trend: "up",
    },
  ];

  const tasks = useMemo(
    () =>
      recentContent.slice(0, 3).map((article) => ({
        id: article.id,
        title: article.title,
        owner: statusLabels[article.status],
        due: formatDate(article.updatedAt),
        status:
          article.status === "published" ? "Ship" : "Continue editing",
      })),
    [recentContent]
  );

  const lastUpdated = sortedArticles[0]?.updatedAt;

  return (
    <main className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-10 space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <LayoutDashboard className="h-4 w-4" />
              <span>Admin · CMS Dashboard</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">Content Operations</h1>
              <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Live
              </span>
              {lastUpdated && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Synced from editor · {formatDate(lastUpdated)}
                </span>
              )}
            </div>
            <p className="max-w-3xl text-sm text-gray-600">
              Monitor publishing velocity, review queue, and team activity in real-time so data and content stay aligned across
              the CMS. Figures are synced from the Editor page, so saved articles and statuses stay in lockstep.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Access Controls
            </button>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FilePenLine className="h-4 w-4" />
              New Article
            </Link>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{item.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-700">
                {item.trend === "down" ? "Slightly slower" : item.change}
                <ArrowUpRight className="h-4 w-4 text-blue-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                  <p className="text-sm text-gray-600">Editorial status synced from the editor</p>
                </div>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Published
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700">
                    <Clock3 className="h-4 w-4" /> Drafting
                  </span>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-gray-100">
                <table className="w-full table-fixed text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="w-[44%] px-4 py-3 font-semibold">Story</th>
                      <th className="w-[18%] px-4 py-3 font-semibold">Status</th>
                      <th className="w-[18%] px-4 py-3 font-semibold">Blocks</th>
                      <th className="w-[20%] px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {recentContent.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-4 text-sm text-gray-500">
                          No articles saved yet. Create one from the editor to populate the dashboard.
                        </td>
                      </tr>
                    )}
                    {recentContent.map((story) => (
                      <tr key={story.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-gray-900 break-words">{story.title}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                              statusStyles[story.status]
                            }`}
                          >
                            {statusLabels[story.status]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{story.content.blocks?.length ?? 0} blocks</td>
                        <td className="px-4 py-3 text-gray-600">
                          <Link
                            href={`/editor?articleId=${story.id}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
                          >
                            Open in editor
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Workflow health</h3>
                    <p className="text-sm text-gray-600">Track progression from draft to publish.</p>
                  </div>
                  <PlayCircle className="h-5 w-5 text-blue-600" />
                </div>

                <div className="mt-5 grid gap-3">
                  {workflow.map((step) => (
                    <div
                      key={step.label}
                      className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                          {step.label}
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${step.accent}`}
                          >
                            {step.count} tasks
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Priority tasks</h3>
                    <p className="text-sm text-gray-600">Feed pulled from saved editor drafts.</p>
                  </div>
                  <PenLine className="h-5 w-5 text-indigo-600" />
                </div>

                <div className="mt-5 space-y-4">
                  {tasks.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Add or update an article in the editor to generate a task queue.
                    </p>
                  )}
                  {tasks.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.owner}</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-amber-600" />
                          Updated {item.due}
                        </div>
                        <Link
                          href={`/editor?articleId=${item.id}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600"
                        >
                          Open draft
                          <CheckCircle2 className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-gray-900 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Publishing tempo</h3>
                  <p className="text-sm text-gray-200">Speed vs. target SLA</p>
                </div>
                <Users className="h-5 w-5 text-blue-200" />
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Synced articles</span>
                  <span className="font-semibold">{sortedArticles.length}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-200">
                  <span>Last update</span>
                  <span>{lastUpdated ? formatDate(lastUpdated) : "Waiting for first save"}</span>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-white/10 p-4">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="font-semibold">Editor bridge active</p>
                    <p className="text-gray-200">Dashboard mirrors saved drafts automatically.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Live desk signals</h3>
                  <p className="text-sm text-gray-600">Collaboration pulse</p>
                </div>
                <Clock3 className="h-5 w-5 text-blue-600" />
              </div>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-start justify-between rounded-xl bg-gray-50 p-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">Drafts</p>
                    <p className="text-gray-600">{statusCounts.draft} active</p>
                  </div>
                  <span className="text-amber-600">● Drafting</span>
                </div>
                <div className="flex items-start justify-between rounded-xl bg-gray-50 p-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">In review</p>
                    <p className="text-gray-600">{statusCounts.in_review} queued</p>
                  </div>
                  <span className="text-blue-600">● Editors</span>
                </div>
                <div className="flex items-start justify-between rounded-xl bg-gray-50 p-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">Ready to ship</p>
                    <p className="text-gray-600">{statusCounts.published} marked published</p>
                  </div>
                  <span className="text-emerald-600">● Stable</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
