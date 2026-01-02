import { notFound } from "next/navigation";
import Link from "next/link";

import { MEGA_NAV } from "@/data/mega-nav";
import { getGqlClient } from "@/services/graphql-client";
import { Q_ARTICLES } from "@/services/article.gql";

export const revalidate = 60;

export async function generateStaticParams() {
  return Object.keys(MEGA_NAV).map(category => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const nav = MEGA_NAV[category];
  if (!nav) notFound();

  const client = getGqlClient();
  const { articles } = await client.request(Q_ARTICLES, {
    status: "PUBLISHED",
    categorySlug: category,
    take: 30,
    skip: 0,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">{nav.root.label}</h1>
        <p className="text-slate-600 mt-2">Latest stories</p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a: any) => (
          <article
            key={a.id}
            className="rounded-xl border bg-white p-6 hover:shadow-lg transition"
          >
            <Link href={`/news/${a.slug}`}>
              <h2 className="font-semibold">{a.title}</h2>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                {a.excerpt ?? "—"}
              </p>
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
