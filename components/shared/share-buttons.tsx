// components/shared/share-buttons.tsx
"use client";

import { useMemo } from "react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const url = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const encoded = (v: string) => encodeURIComponent(v);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        href={`https://twitter.com/intent/tweet?text=${encoded(title)}&url=${encoded(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        Share
      </a>
      <button
        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        onClick={() => {
          if (!url) return;
          navigator.clipboard.writeText(url).catch(() => {});
        }}
      >
        Copy link
      </button>
    </div>
  );
}
