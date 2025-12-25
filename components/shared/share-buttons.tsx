// components/shared/share-buttons.tsx

"use client";

import { usePathname, useSearchParams } from "next/navigation";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Build URL deterministically (no window, no effect, no state)
  const url =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}${pathname}${
          searchParams?.toString()
            ? `?${searchParams.toString()}`
            : ""
        }`;

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
        href={
          url
            ? `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
            : "#"
        }
        target="_blank"
        rel="noreferrer"
        suppressHydrationWarning
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
