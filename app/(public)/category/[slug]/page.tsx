import CategoryIndex from "@/components/pages/category-index";

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return <CategoryIndex category={params.slug} title={title} />;
}
