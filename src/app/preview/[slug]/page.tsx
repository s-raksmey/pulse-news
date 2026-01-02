import { notFound } from "next/navigation";
import { getGqlClient } from "@/services/graphql-client";
import { Q_ARTICLE_BY_SLUG } from "@/services/article.gql";
import EditorRenderer from "@/components/renderer/editor-renderer";

interface PageProps {
  params: Promise<{ slug?: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) notFound();

  const client = getGqlClient();
  const data = await client.request(Q_ARTICLE_BY_SLUG, { slug });
  const article = data?.articleBySlug;

  if (!article) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <div className="rounded-md bg-yellow-100 px-4 py-2 text-sm text-yellow-800">
        Preview mode — not published
      </div>

      <h1 className="text-3xl font-bold">{article.title}</h1>
      <EditorRenderer data={article.contentJson} />
    </main>
  );
}
