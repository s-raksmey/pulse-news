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
  return Object.keys(MEGA_NAV).map((category) => ({
    category,
  }));
}

/* -------------------------
   Page
------------------------- */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // ✅ REQUIRED IN NEXT 15
  const { category } = await params;

  const nav = MEGA_NAV[category];
  if (!nav) notFound();

  const client = getGqlClient();
  const { articles } = await client.request(Q_ARTICLES, {
    status: "PUBLISHED",
    categorySlug: category,
    topic: null,
    take: 30,
    skip: 0,
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">
          {nav.root.label}
        </h1>
        <p className="text-sm text-slate-600">
          Latest articles
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
            No articles yet.
          </li>
        )}
      </ul>
    </main>
  );
}
