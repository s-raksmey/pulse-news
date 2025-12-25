// app/news/[slug]/page.tsx

import { getAllArticles, getArticleBySlug } from "@/data/mock-articles";
import Breadcrumb from "@/components/shared/breadcrumb";
import ArticleHeader from "@/components/news/article-header";
import ArticleContent from "@/components/news/article-content";
import ArticleList from "@/components/news/article-list";

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);

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
            href: `/category/${article.category.toLowerCase()}`,
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
        <ArticleList current={article} items={getAllArticles()} />
      </div>
    </main>
  );
}
