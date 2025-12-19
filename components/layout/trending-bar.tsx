// components/trending-bar.tsx
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function TrendingBar() {
  const trendingTopics = [
    "AI Breakthrough",
    "Election 2024",
    "Climate Summit",
    "Stock Rally",
    "Space Mission",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="hidden lg:block border-t border-gray-100 bg-gray-50 relative z-30 overflow-hidden"
    >
      <div className="container-8xl h-10">
        <div className="flex h-full items-center justify-between xl:px-0 lg:px-2">
          <div className="flex gap-4 text-xs font-semibold text-gray-700">
            <span className="text-gray-500">TRENDING:</span>
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                className="hover:text-primary-600 transition-colors duration-200 whitespace-nowrap"
              >
                {topic}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap">
            More <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}