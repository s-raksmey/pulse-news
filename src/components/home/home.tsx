"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import HeroSection from "./hero-section";
import Sidebar from "@/components/layout/sidebar";
import ArticleCardLarge from "@/components/article/article-card-large";

type Article = any;

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function cover(a: Article): string | null {
  return a?.coverImage?.url ?? null;
}

/* =========================
   Motion Variants (SAFE)
========================= */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =========================
   Component
========================= */
export default function HomePageClient({
  topStories,
  editorsPicks,
  trending,
}: {
  topStories: Article[];
  editorsPicks: Article[];
  trending: Article[];
}) {
  // Helper function to generate deterministic values based on article ID
  const generateDeterministicValue = (id: string, seed: number, min: number, max: number) => {
    let hash = 0;
    const str = id + seed.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % (max - min + 1) + min;
  };

  // Transform articles for new components
  const transformedArticles = (articles: Article[]) => 
    articles.map(a => ({
      id: a.id,
      title: a.title,
      excerpt: a.excerpt,
      slug: a.slug,
      coverImage: a.coverImage ? {
        url: a.coverImage.url,
        alt: a.title,
      } : undefined,
      author: a.author ? {
        name: a.author.name,
        avatar: a.author.avatar,
      } : undefined,
      category: a.category ? {
        name: a.category.name,
        slug: a.category.slug,
        color: a.category.color || "#3B82F6",
      } : undefined,
      topic: a.topic || "latest",
      publishedAt: a.publishedAt,
      readTime: a.readTime || generateDeterministicValue(a.id, 1, 3, 12),
      views: generateDeterministicValue(a.id, 2, 1000, 10000),
      commentsCount: generateDeterministicValue(a.id, 3, 0, 50),
    }));

  const featuredArticles = transformedArticles(topStories.slice(0, 5));
  const editorPicksTransformed = transformedArticles(editorsPicks);
  const trendingTransformed = transformedArticles(trending);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      {featuredArticles.length > 0 && (
        <HeroSection featuredArticles={featuredArticles} />
      )}

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Editor's Picks Section */}
            {editorPicksTransformed.length > 0 && (
              <motion.section
                variants={stagger}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                <motion.div variants={fadeUp}>
                  <h2 className="text-3xl font-bold text-slate-900">Editor's Picks</h2>
                  <p className="mt-2 text-lg text-slate-600">
                    Carefully curated stories from our editorial team
                  </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-2">
                  {editorPicksTransformed.slice(0, 4).map((article, index) => (
                    <motion.div key={article.id} variants={fadeUp}>
                      <ArticleCardLarge
                        article={article}
                        layout="vertical"
                        className="h-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Latest News Section */}
            <motion.section
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.div variants={fadeUp}>
                <h2 className="text-3xl font-bold text-slate-900">Latest News</h2>
                <p className="mt-2 text-lg text-slate-600">
                  Stay up to date with the most recent developments
                </p>
              </motion.div>

              <div className="space-y-6">
                {topStories.slice(5, 10).map((article, index) => {
                  const transformed = transformedArticles([article])[0];
                  return (
                    <motion.div key={article.id} variants={fadeUp}>
                      <ArticleCardLarge
                        article={transformed}
                        layout="horizontal"
                        className="w-full"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <Sidebar
                trendingArticles={trendingTransformed}
                showNewsletter={true}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
