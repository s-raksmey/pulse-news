// app/world/[slug]/page.tsx

"use client";

import { useParams } from "next/navigation";
import CategoryIndex from "@/components/pages/category-index";

export default function WorldSubPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  return (
    <CategoryIndex
      category="world"
      sub={slug}
      title={`World / ${slugToTitle(slug)}`}
    />
  );
}

function slugToTitle(value: string) {
  return value.replace(/-/g, " ");
}
