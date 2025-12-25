"use client";

import { useParams } from "next/navigation";
import CategoryIndex from "@/components/pages/category-index";

export default function PoliticsSubPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <CategoryIndex
      category="politics"
      sub={slug}
      title={`Politics / ${slugToTitle(slug)}`}
    />
  );
}

function slugToTitle(value: string) {
  return value.replace(/-/g, " ");
}
