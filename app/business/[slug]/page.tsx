// app/business/[slug]/page.tsx

"use client";

import { useParams } from "next/navigation";
import CategoryIndex from "@/components/pages/category-index";

export default function BusinessSubPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <CategoryIndex
      category="business"
      sub={slug}
      title={`Business / ${slugToTitle(slug)}`}
    />
  );
}

function slugToTitle(value: string) {
  return value.replace(/-/g, " ");
}
