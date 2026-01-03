"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

type Article = any;

/* =========================
   Helpers
========================= */
function articleUrl(a: Article) {
  const category = a?.category?.slug;
  const topic = a?.topic ?? "latest";
  const slug = a?.slug;
  if (!category || !slug) return "#";
  return `/${category}/${topic}/${slug}`;
}

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
      delayChildren: 0.12,
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
  const hero = topStories[0];
  const secondary = topStories.slice(1, 6);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 space-y-20">
      {/* ================= HERO + TOP STORIES ================= */}
      {hero && (
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-10 lg:grid-cols-12"
        >
          {/* Hero */}
          <motion.div variants={fadeUp} className="lg:col-span-8">
            <Link
              href={articleUrl(hero)}
              className="relative block overflow-hidden rounded-3xl bg-slate-950 text-white"
            >
              {cover(hero) && (
                <Image
                  src={cover(hero)!}
                  alt={hero.title}
                  width={1400}
                  height={900}
                  priority
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                />
              )}

              <div className="relative z-10 p-10 space-y-4">
                <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase">
                  Top Story
                </span>

                <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                  {hero.title}
                </h1>

                {hero.excerpt && (
                  <p className="max-w-2xl text-lg text-white/85">
                    {hero.excerpt}
                  </p>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Top Stories Rail */}
          <motion.aside
            variants={stagger}
            className="lg:col-span-4 space-y-4"
          >
            <motion.h2 variants={fadeUp} className="text-lg font-bold">
              Top Stories
            </motion.h2>

            <div className="divide-y rounded-2xl border bg-white">
              {secondary.map((a) => (
                <motion.div key={a.id} variants={fadeUp}>
                  <Link
                    href={articleUrl(a)}
                    className="block p-4 hover:bg-slate-50 transition"
                  >
                    <p className="font-semibold leading-snug hover:text-indigo-600">
                      {a.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {a.category?.name}
                      {a.publishedAt && ` • ${formatDate(a.publishedAt)}`}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        </motion.section>
      )}

      {/* ================= EDITORS PICKS ================= */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-10 lg:grid-cols-12"
      >
        <div className="lg:col-span-8 space-y-8">
          <motion.h2 variants={fadeUp} className="text-2xl font-bold">
            Editors’ Picks
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {editorsPicks.map((a) => (
              <motion.div
                key={a.id}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                <Link
                  href={articleUrl(a)}
                  className="block overflow-hidden rounded-2xl border bg-white hover:shadow-lg transition"
                >
                  {cover(a) && (
                    <Image
                      src={cover(a)!}
                      alt={a.title}
                      width={800}
                      height={500}
                      className="h-48 w-full object-cover"
                    />
                  )}

                  <div className="p-5 space-y-2">
                    <span className="text-xs uppercase text-slate-500">
                      {a.category?.name}
                    </span>

                    <h3 className="font-semibold leading-snug hover:text-indigo-600">
                      {a.title}
                    </h3>

                    {a.excerpt && (
                      <p className="text-sm text-slate-600 line-clamp-3">
                        {a.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending */}
        <motion.aside
          variants={fadeUp}
          className="lg:col-span-4 space-y-6"
        >
          <h3 className="text-lg font-bold">Trending</h3>

          <ol className="rounded-2xl border bg-white p-5 space-y-5">
            {trending.map((a, i) => (
              <li key={a.id} className="flex gap-4">
                <span className="text-3xl font-extrabold text-slate-200">
                  {i + 1}
                </span>
                <Link href={articleUrl(a)}>
                  <p className="font-medium hover:text-indigo-600">
                    {a.title}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </motion.aside>
      </motion.section>
    </main>
  );
}
