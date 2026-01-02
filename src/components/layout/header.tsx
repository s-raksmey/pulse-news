"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import MegaMenu from "./mega-menu";

const NAV_ITEMS = [
  { key: "world", label: "World", href: "/category/world" },
  { key: "tech", label: "Tech", href: "/category/tech" },
  { key: "business", label: "Business", href: "/category/business" },
  { key: "politics", label: "Politics", href: "/category/politics" },
  { key: "sports", label: "Sports", href: "/category/sports" },
  { key: "culture", label: "Culture", href: "/category/culture" },
];

export default function Header() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header
      className="relative z-50 border-b bg-white"
      onMouseLeave={() => setActive(null)}
    >
      <div className="relative mx-auto h-16 max-w-7xl px-6">
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <Link href="/" className="font-semibold">
            PULSE <span className="text-xs">NEWS</span>
          </Link>
        </div>

        <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onMouseEnter={() => setActive(item.key)}
              className="flex items-center gap-1 text-sm font-medium"
            >
              {item.label}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  active === item.key ? "rotate-180" : ""
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <Link
            href="/admin"
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100"
          >
            CMS
          </Link>
        </div>
      </div>

      <MegaMenu activeKey={active} />
    </header>
  );
}
