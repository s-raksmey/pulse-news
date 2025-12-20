// components/shared/article-card.tsx
import Link from "next/link";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link href={article.category === "Blog" ? `/blog/${article.slug}` : `/news/${article.slug}`} className="group block">
      <div
        className={[
          "overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all",
          "hover:shadow-lg hover:-translate-y-0.5",
        ].join(" ")}
      >
        {article.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.featuredImage}
            alt={article.title}
            className={isCompact ? "h-32 w-full object-cover" : "h-48 w-full object-cover"}
          />
        ) : (
          <div className={isCompact ? "h-32 bg-gray-100" : "h-48 bg-gray-100"} />
        )}

        <div className={isCompact ? "p-3" : "p-4"}>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-blue-600">{article.category}</span>
            {article.subCategory ? <span className="opacity-60">/ {article.subCategory}</span> : null}
          </div>

          <h3 className={isCompact ? "mt-1 line-clamp-2 text-[14px] font-semibold text-gray-900 group-hover:text-blue-600" : "mt-2 line-clamp-2 text-[16px] font-semibold text-gray-900 group-hover:text-blue-600"}>
            {article.title}
          </h3>

          <p className={isCompact ? "mt-2 line-clamp-2 text-[12px] text-gray-600" : "mt-2 line-clamp-2 text-[13px] text-gray-600"}>
            {article.excerpt}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span className="truncate">{article.author.name}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
