import { notFound } from "next/navigation";
import Link from "next/link";

import { MEGA_NAV } from "@/data/mega-nav";
import { getGqlClient } from "@/services/graphql-client";
import { Q_ARTICLES } from "@/services/article.gql";

export const revalidate = 60;

/* -------------------------
   SSG
------------------------- */
export async function generateStaticParams() {
  const params: { category: string; topic: string }[] = [];

  for (const category of Object.keys(MEGA_NAV)) {
    const cfg = MEGA_NAV[category];
    const sections = [cfg.explore, cfg.shop, cfg.more];

    for (const section of sections) {
      for (const item of section.items) {
        const match = item.href.match(
          /^\/category\/([^/]+)\/([^/]+)$/
        );
        if (match) {
          params.push({
            category: match[1],
            topic: match[2],
          });
        }
      }
    }

    // ensure "latest"
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
  // ✅ REQUIRED IN NEXT 15
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
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${category}`}>
          {nav.root.label}
        </Link>
        <span className="mx-2">/</span>
        <span className="capitalize">
          {topic === "latest" ? "Latest" : topic}
        </span>
      </nav>

      <header>
        <h1 className="text-2xl font-bold capitalize">
          {topic === "latest" ? "Latest" : topic}
        </h1>
        <p className="text-sm text-slate-600">
          {nav.root.label}
        </p>
      </header>

      <ul className="space-y-3">
        {articles.map((a: any) => (
          <li
            key={a.id}
            className="rounded-lg border bg-white p-4 hover:bg-slate-50"
          >
            <Link href={`/news/${a.slug}`}>
              <div className="font-semibold">{a.title}</div>
              <div className="text-sm text-slate-600 line-clamp-2">
                {a.excerpt ?? "—"}
              </div>
            </Link>
          </li>
        ))}

        {articles.length === 0 && (
          <li className="text-sm text-slate-600">
            No articles for this topic yet.
          </li>
        )}
      </ul>
    </main>
  );
}
