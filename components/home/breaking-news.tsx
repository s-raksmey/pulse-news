// components/home/breaking-news.tsx
import Link from "next/link";
import { getAllArticles } from "@/data/mock-articles";

export default function BreakingNews() {
  const breaking = getAllArticles().filter((a) => a.isBreaking).slice(0, 6);

  if (breaking.length === 0) return null;

  return (
    <section className="rounded-2xl border border-red-100 bg-red-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
          <h2 className="text-sm font-bold text-red-700">Breaking</h2>
        </div>
        <Link href="/search?q=breaking" className="text-xs font-semibold text-red-700 hover:underline">
          View all
        </Link>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {breaking.map((a) => (
          <Link
            key={a.id}
            href={`/news/${a.slug}`}
            className="rounded-xl bg-white border border-red-100 px-3 py-2 text-sm text-gray-900 hover:shadow-sm"
          >
            {a.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
