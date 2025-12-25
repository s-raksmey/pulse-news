import type { Article } from "@/types/article";
import ShareButtons from "@/components/shared/share-buttons";
import ArticleMeta from "./article-meta";

export default function ArticleHeader({ article }: { article: Article }) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="font-semibold text-blue-600">{article.category}</span>
        {article.subCategory ? <span className="opacity-60">/ {article.subCategory}</span> : null}
      </div>

      <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">
        {article.title}
      </h1>

      <p className="mt-2 text-sm text-gray-600">{article.excerpt}</p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ArticleMeta article={article} />
        <ShareButtons title={article.title} />
      </div>
    </header>
  );
}
