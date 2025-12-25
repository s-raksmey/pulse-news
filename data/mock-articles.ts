// data/mock-articles.ts
import type { Article, Author } from "@/types/article";

const authors: Record<string, Author> = {
  john: {
    name: "John Doe",
    username: "john",
    avatarUrl: "https://i.pravatar.cc/120?img=12",
    bio: "Covers technology, policy, and AI developments.",
  },
  sara: {
    name: "Sara Kim",
    username: "sara",
    avatarUrl: "https://i.pravatar.cc/120?img=32",
    bio: "Business reporter with a focus on markets and startups.",
  },
  mina: {
    name: "Mina Lee",
    username: "mina",
    avatarUrl: "https://i.pravatar.cc/120?img=45",
    bio: "World news editor and long-form writer.",
  },
};

export const articles: Article[] = [
  {
    id: "a1",
    title: "AI breakthrough accelerates real-time translation",
    slug: "ai-breakthrough-real-time-translation",
    excerpt:
      "Researchers reveal a major milestone that improves translation speed and accuracy across multiple languages.",
    category: "Tech",
    subCategory: "ai-ml",
    author: authors.john,
    publishedAt: "2025-12-15T08:20:00.000Z",
    featuredImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=60",
    tags: ["AI", "Language", "Innovation"],
    isBreaking: true,
    isEditorsPick: true,
    content: {
      time: Date.now(),
      version: "2.29.1",
      blocks: [
        {
          id: "b1",
          type: "header",
          data: { text: "What changed", level: 2 },
        },
        {
          id: "b2",
          type: "paragraph",
          data: {
            text: "This article body is rendered from Editor.js JSON blocks on the frontend. Later, your CMS will store this JSON and your UI will render it here.",
          },
        },
        {
          id: "b3",
          type: "quote",
          data: {
            text: "The next wave of translation will feel instant, accurate, and natural.",
            caption: "Research lead",
          },
        },
        {
          id: "b4",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Better accuracy on low-resource languages",
              "Lower latency on mobile devices",
              "Improved context retention across paragraphs",
            ],
          },
        },
      ],
    },
  },
  {
    id: "a2",
    title: "Markets steady as investors weigh inflation outlook",
    slug: "markets-steady-inflation-outlook",
    excerpt:
      "Stocks hold firm as traders focus on rates, inflation prints, and upcoming earnings across major sectors.",
    category: "Business",
    subCategory: "Markets",
    author: authors.sara,
    publishedAt: "2025-12-14T03:10:00.000Z",
    featuredImage:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1600&q=60",
    tags: ["Markets", "Inflation", "Stocks"],
    isEditorsPick: true,
    content: {
      time: Date.now(),
      version: "2.29.1",
      blocks: [
        {
          id: "m1",
          type: "paragraph",
          data: {
            text: "This is a sample Business article. Replace with CMS content later.",
          },
        },
      ],
    },
  },
  {
    id: "a3",
    title: "Diplomatic talks resume amid regional tensions",
    slug: "diplomatic-talks-resume",
    excerpt:
      "International leaders reconvene as negotiations focus on ceasefire frameworks and humanitarian corridors.",
    category: "World",
    subCategory: "Diplomacy",
    author: authors.mina,
    publishedAt: "2025-12-13T12:05:00.000Z",
    featuredImage:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=60",
    tags: ["Diplomacy", "Conflict", "UN"],
    content: {
      time: Date.now(),
      version: "2.29.1",
      blocks: [
        {
          id: "w1",
          type: "paragraph",
          data: {
            text: "This is a sample World article. Later it will come from CMS.",
          },
        },
      ],
    },
  },

  // Blog sample (long-form)
  {
    id: "b100",
    title: "Why newsroom UX matters more than ever",
    slug: "why-newsroom-ux-matters",
    excerpt:
      "A practical breakdown of how layout, typography, and information hierarchy shape trust and engagement.",
    category: "Blog",
    author: authors.mina,
    publishedAt: "2025-12-10T09:00:00.000Z",
    featuredImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60",
    tags: ["Design", "UX", "Media"],
    content: {
      time: Date.now(),
      version: "2.29.1",
      blocks: [
        { id: "bl1", type: "header", data: { text: "Overview", level: 2 } },
        {
          id: "bl2",
          type: "paragraph",
          data: {
            text: "This is a blog-style article rendered by the same Editor.js renderer but styled for long-form reading.",
          },
        },
      ],
    },
  },
];

export function getAllArticles(): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export function getArticlesByCategoryAndSub(category: string, sub: string): Article[] {
  return getAllArticles().filter((a) => {
    const c = a.category.toLowerCase() === category.toLowerCase();
    const s = (a.subCategory ?? "").toLowerCase() === sub.toLowerCase();
    return c && s;
  });
}

export function getArticlesByAuthor(username: string): Article[] {
  return getAllArticles().filter((a) => a.author.username === username);
}

export function searchArticles(query: string): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllArticles().filter((a) => {
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.category.toLowerCase().includes(q) ||
      (a.subCategory ?? "").toLowerCase().includes(q)
    );
  });
}
