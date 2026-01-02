import Link from "next/link";
import { getGqlClient } from "@/services/graphql-client";
import {
  Q_TOP_STORIES,
  Q_EDITORS_PICKS,
  Q_TRENDING,
} from "@/services/article.gql";

export default async function HomePage() {
  const client = getGqlClient();

  const [top, picks, trending] = await Promise.all([
    client.request(Q_TOP_STORIES),
    client.request(Q_EDITORS_PICKS),
    client.request(Q_TRENDING),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Stories</h2>
        {top.topStories.map((a: any) => (
          <Link key={a.id} href={`/news/${a.slug}`}>
            <div className="mb-3 font-semibold">{a.title}</div>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Editors’ Picks</h2>
        {picks.editorsPicks.map((a: any) => (
          <Link key={a.id} href={`/news/${a.slug}`}>
            <div className="mb-2">{a.title}</div>
          </Link>
        ))}
      </section>

      <aside>
        <h3 className="text-lg font-semibold mb-3">Trending</h3>
        {trending.trending.map((a: any) => (
          <Link key={a.id} href={`/news/${a.slug}`}>
            <div className="text-sm mb-1">{a.title}</div>
          </Link>
        ))}
      </aside>
    </main>
  );
}
