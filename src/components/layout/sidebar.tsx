"use client";

import { motion } from "framer-motion";
import TrendingWidget from "@/components/sidebar/trending-widget";
import NewsletterSignup from "@/components/sidebar/newsletter-signup";

interface Article {
  id: string;
  title: string;
  slug: string;
  coverImage?: {
    url: string;
    alt?: string;
  };
  category?: {
    name: string;
    slug: string;
    color?: string;
  };
  topic?: string;
  publishedAt: string;
  readTime?: number;
  views?: number;
}

interface SidebarProps {
  trendingArticles?: Article[];
  showNewsletter?: boolean;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Sidebar({
  trendingArticles = [],
  showNewsletter = true,
  className = "",
}: SidebarProps) {
  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`space-y-6 ${className}`}
    >
      {/* Trending Articles */}
      {trendingArticles.length > 0 && (
        <motion.div variants={itemVariants}>
          <TrendingWidget articles={trendingArticles} />
        </motion.div>
      )}

      {/* Newsletter Signup */}
      {showNewsletter && (
        <motion.div variants={itemVariants}>
          <NewsletterSignup />
        </motion.div>
      )}

      {/* Categories Quick Navigation */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Categories</h3>
          <div className="space-y-2">
            {[
              { name: "World", slug: "world", color: "#EF4444" },
              { name: "Technology", slug: "tech", color: "#3B82F6" },
              { name: "Business", slug: "business", color: "#10B981" },
              { name: "Politics", slug: "politics", color: "#8B5CF6" },
              { name: "Sports", slug: "sports", color: "#F59E0B" },
              { name: "Culture", slug: "culture", color: "#EC4899" },
            ].map((category) => (
              <a
                key={category.slug}
                href={`/${category.slug}`}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium text-slate-700">
                  {category.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Social Media Links */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Follow Us</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Twitter", icon: "🐦", url: "#", color: "bg-blue-500" },
              { name: "Facebook", icon: "📘", url: "#", color: "bg-blue-600" },
              { name: "Instagram", icon: "📷", url: "#", color: "bg-pink-500" },
              { name: "LinkedIn", icon: "💼", url: "#", color: "bg-blue-700" },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                className={`flex items-center justify-center gap-2 rounded-lg p-3 text-white transition-transform hover:scale-105 ${social.color}`}
              >
                <span className="text-lg">{social.icon}</span>
                <span className="text-xs font-medium">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Advertisement Placeholder */}
      <motion.div variants={itemVariants}>
        <div className="rounded-xl bg-slate-100 p-6 text-center">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            Advertisement
          </div>
          <div className="flex h-32 items-center justify-center rounded-lg bg-slate-200">
            <span className="text-slate-400">Ad Space</span>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  );
}
