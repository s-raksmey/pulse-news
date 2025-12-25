import { useMemo, useState } from "react";
import { getAllArticles } from "@/data/mock-articles";

export function useArticleStore() {
  const [articles, setArticles] = useState(getAllArticles());
  const total = useMemo(() => articles.length, [articles]);

  return { articles, total, setArticles } as const;
}
