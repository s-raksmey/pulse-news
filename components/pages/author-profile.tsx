// components/pages/author-profile.tsx

import Breadcrumb from "@/components/shared/breadcrumb";
import ArticleCard from "@/components/news/article-card";
import { getArticlesByAuthor, getAllArticles } from "@/data/mock-articles";

export default function AuthorProfile({ username }: { username: string }) {
  const list = getArticlesByAuthor(username);
  const author = list[0]?.author ?? getAllArticles().find((a) => a.author.username === username)?.author;

  if (!author) {
    return (
      <main className="container-8xl px-4 py-10">
        <h1 className="text-2xl font-bold">Author not found</h1>
      </main>
    );
  }

  return (
    <main className="container-8xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Author", href: `/author/${author.username}` },
        ]}
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col sm:flex-row gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatarUrl ?? "https://i.pravatar.cc/120?img=1"}
          alt={author.name}
          className="h-20 w-20 rounded-2xl object-cover border border-gray-200"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-black tracking-tight text-gray-900">{author.name}</h1>
          <p className="mt-2 text-sm text-gray-600">{author.bio ?? "Reporter and contributor."}</p>
          <p className="mt-2 text-xs text-gray-500">@{author.username}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Articles</h2>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-600">
            No articles by this author yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {list.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
