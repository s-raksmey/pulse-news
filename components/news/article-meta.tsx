import type { Article } from "@/types/article";

export default function ArticleMeta({ article }: { article: Article }) {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-xs text-gray-500">
        <span className="font-semibold text-gray-900">{article.author.name}</span>
        <span className="mx-2 opacity-40">•</span>
        <span>{new Date(article.publishedAt).toLocaleString()}</span>
      </div>
    </div>
  );
}
