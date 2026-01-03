// app/(public)/page.tsx
import { getGqlClient } from "@/services/graphql-client";
import {
  Q_TOP_STORIES,
  Q_EDITORS_PICKS,
  Q_TRENDING,
} from "@/services/article.gql";
import HomePageClient from "@/components/home/home";

export const revalidate = 60;

export default async function HomePage() {
  const client = getGqlClient();

  try {
    const [top, picks, trending] = await Promise.all([
      client.request(Q_TOP_STORIES).catch(() => ({ topStories: [] })),
      client.request(Q_EDITORS_PICKS).catch(() => ({ editorsPicks: [] })),
      client.request(Q_TRENDING).catch(() => ({ trending: [] })),
    ]);

    return (
      <HomePageClient
        topStories={top?.topStories ?? []}
        editorsPicks={picks?.editorsPicks ?? []}
        trending={trending?.trending ?? []}
      />
    );
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return (
      <HomePageClient
        topStories={[]}
        editorsPicks={[]}
        trending={[]}
      />
    );
  }
}