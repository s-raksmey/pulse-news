import { notFound } from "next/navigation";
import { getGqlClient } from "@/services/graphql-client";
import { Q_ARTICLE_BY_SLUG, Q_ARTICLES } from "@/services/article.gql";
import EditorRenderer from "@/components/renderer/editor-renderer";

/* ISR */
export const revalidate = 60;

/* SSG */
export async function generateStaticParams() {
  const client = getGqlClient();
  const data = await client.request(Q_ARTICLES, {
    status: "PUBLISHED",
    take: 1000,
    skip: 0,
  });

  return (data?.articles ?? []).map((a: any) => ({ slug: a.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function formatDateTime(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  const client = getGqlClient();
  const data = await client.request(Q_ARTICLE_BY_SLUG, { slug });

  const article = data?.articleBySlug;
  if (!article || article.status !== "PUBLISHED") notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
      {/* ---------- Article Header ---------- */}
      <header className="space-y-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">
          {article.category?.name ?? "Uncategorized"}
        </div>

        <h1 className="text-3xl font-bold leading-tight">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-lg text-slate-600">
            {article.excerpt}
          </p>
        )}

        {/* ---------- Meta ---------- */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
          {article.authorName && (
            <span>
              By{" "}
              <span className="font-medium text-slate-700">
                {article.authorName}
              </span>
            </span>
          )}

          {article.publishedAt && (
            <span>
              {formatDateTime(article.publishedAt)}
            </span>
          )}
        </div>
      </header>

      {/* ---------- Content ---------- */}
      <EditorRenderer data={article.contentJson} />
    </main>
  );
}
