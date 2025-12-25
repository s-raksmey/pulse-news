import { getAllArticles, getArticleBySlug } from "@/data/mock-articles";
import Breadcrumb from "@/components/shared/breadcrumb";
import ArticleHeader from "@/components/article/article-header";
import ArticleContent from "@/components/article/article-content";
import RelatedArticles from "@/components/article/related-articles";

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article || article.category === "Blog") {
    return (
      <main className="container-8xl px-4 py-10">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </main>
    );
  }

  return (
    <main className="container-8xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: article.category,
            href: `/${article.category.toLowerCase()}`,
          },
          { label: article.title, href: `/news/${article.slug}` },
        ]}
      />

      {article.featuredImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full max-h-105 object-cover rounded-2xl border border-gray-200"
        />
      )}

      <div className="mt-6">
        <ArticleHeader article={article} />
        <ArticleContent content={article.content} />
        <RelatedArticles current={article} items={getAllArticles()} />
      </div>
    </main>
  );
}
