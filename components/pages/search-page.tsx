// components/pages/search-page.tsx

"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "@/components/shared/breadcrumb";
import ArticleCard from "@/components/shared/article-card";
import { searchArticles } from "@/data/mock-articles";

export default function SearchPage({ query }: { query: string }) {
  const [q, setQ] = useState(query);

  const results = useMemo(() => searchArticles(q), [q]);

  return (
    <main className="container-8xl px-4 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search", href: "/search" }]} />

      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-gray-900">Search</h1>
        <p className="mt-2 text-sm text-gray-600">Find stories by title, tags, category, and topics.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search news, topics, tags..."
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-6">
        <div className="text-xs text-gray-500 mb-3">
          {q.trim() ? `${results.length} result(s) for "${q}"` : "Type to search..."}
        </div>

        {q.trim() && results.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
            No results found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((a) => (
              <ArticleCard key={a.id} article={a} variant="compact" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
