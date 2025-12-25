"use client";

import { useParams } from "next/navigation";
import CategoryIndex from "@/components/pages/category-index";

export default function TechSubPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <CategoryIndex
      category="tech"
      sub={slug}
      title={`Tech / ${slugToTitle(slug)}`}
    />
  );
}

function slugToTitle(value: string) {
  return value.replace(/-/g, " ");
}
