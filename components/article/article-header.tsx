// components/article/article-header.tsx
import type { Article } from "@/types/article";
import ShareButtons from "@/components/shared/share-buttons";

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
        <div className="text-xs text-gray-500">
          <span className="font-semibold text-gray-900">{article.author.name}</span>
          <span className="mx-2 opacity-40">•</span>
          <span>{new Date(article.publishedAt).toLocaleString()}</span>
        </div>

        <ShareButtons title={article.title} />
      </div>
    </header>
  );
}
