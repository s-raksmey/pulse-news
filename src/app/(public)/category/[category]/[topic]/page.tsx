import { notFound } from "next/navigation";
import Link from "next/link";

import { MEGA_NAV } from "@/data/mega-nav";
import { getGqlClient } from "@/services/graphql-client";
import { Q_ARTICLES } from "@/services/article.gql";

export const revalidate = 60;

/* -------------------------
   SSG (ONLY VALID TOPICS)
------------------------- */
export async function generateStaticParams() {
  const params: { category: string; topic: string }[] = [];

  for (const category of Object.keys(MEGA_NAV)) {
    const cfg = MEGA_NAV[category];
    const sections = [cfg.explore, cfg.shop]; // ❗ FIXED

    for (const section of sections) {
      for (const item of section.items) {
        const match = item.href.match(/^\/category\/([^/]+)\/([^/]+)$/);
        if (match) {
          params.push({ category: match[1], topic: match[2] });
        }
      }
    }

    params.push({ category, topic: "latest" });
  }

  return Array.from(
    new Map(params.map(p => [`${p.category}/${p.topic}`, p])).values()
  );
}

/* -------------------------
   Page
------------------------- */
export default async function TopicPage({
  params,
}: {
  params: Promise<{ category: string; topic: string }>;
}) {
  const { category, topic } = await params;

  const nav = MEGA_NAV[category];
  if (!nav) notFound();

  const client = getGqlClient();
  const { articles } = await client.request(Q_ARTICLES, {
    status: "PUBLISHED",
    categorySlug: category,
    topic: topic === "latest" ? null : topic,
    take: 30,
    skip: 0,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <nav className="text-xs uppercase tracking-wide text-slate-500 mb-2">
          <Link href="/">Home</Link> /{" "}
          <Link href={`/category/${category}`}>{nav.root.label}</Link> /{" "}
          <span className="capitalize">
            {topic === "latest" ? "Latest" : topic}
          </span>
        </nav>

        <h1 className="text-4xl font-bold capitalize">
          {topic === "latest" ? "Latest" : topic}
        </h1>
        <p className="text-slate-600 mt-2">
          {nav.root.label} coverage and analysis
        </p>
      </header>

      {/* Grid */}
      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a: any) => (
          <article
            key={a.id}
            className="group rounded-xl border bg-white p-6 hover:shadow-lg transition"
          >
            <Link href={`/news/${a.slug}`}>
              <h2 className="text-lg font-semibold group-hover:underline">
                {a.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                {a.excerpt ?? "—"}
              </p>
              <div className="mt-4 text-xs text-slate-400">
                {a.category?.name}
              </div>
            </Link>
          </article>
        ))}
      </section>

      {articles.length === 0 && (
        <p className="text-sm text-slate-500 mt-10">
          No articles yet.
        </p>
      )}
    </main>
  );
}
