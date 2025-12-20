// app/page.tsx
import HeroNews from "@/components/home/hero-news";
import BreakingNews from "@/components/home/breaking-news";
import LatestNews from "@/components/home/latest-news";
import CategoryBlock from "@/components/home/category-block";

export default function Home() {
  return (
    <main className="container-8xl px-4 py-6 space-y-12">
      <HeroNews />
      <BreakingNews />
      <LatestNews />

      <CategoryBlock category="World" />
      <CategoryBlock category="Tech" />
      <CategoryBlock category="Business" />
      <CategoryBlock category="Politics" />
    </main>
  );
}
