// components/shared/article-card.tsx

import Link from "next/link";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact";
}

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  const href =
    article.category === "Blog"
      ? `/blog/${article.slug}`
      : `/news/${article.slug}`;

  return (
    <Link href={href} className="group block">
      <div className="rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition">
        {article.featuredImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.featuredImage}
            alt={article.title}
            className={variant === "compact"
              ? "h-32 w-full object-cover"
              : "h-48 w-full object-cover"}
          />
        )}

        <div className="p-4">
          <div className="text-xs font-semibold text-blue-600">
            {article.category}
          </div>

          <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-600">
            {article.title}
          </h3>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
