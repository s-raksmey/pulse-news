"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search, Menu } from "lucide-react";
import MegaMenu from "@/components/layout/mega-menu";
import LanguageToggle from "@/components/layout/language-toggle";
import MobileMenu from "@/components/layout/mobile-menu";
import SearchBar from "@/components/layout/search-bar";

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "/" },
  { key: "world", label: "World", href: "/world" },
  { key: "tech", label: "Tech", href: "/tech" },
  { key: "business", label: "Business", href: "/business" },
  { key: "politics", label: "Politics", href: "/politics" },
  { key: "sports", label: "Sports", href: "/sports" },
  { key: "culture", label: "Culture", href: "/culture" },
];

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="relative z-50 border-b bg-white" onMouseLeave={() => setActive(null)}>
        <div className="relative mx-auto h-16 max-w-7xl px-6">
          <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <Link href="/" className="font-semibold tracking-wide">
              PULSE <span className="text-xs text-slate-500">NEWS</span>
            </Link>
          </div>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const hasDropdown = item.key !== "home";
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onMouseEnter={() => setActive(hasDropdown ? item.key : null)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-800 hover:text-slate-900"
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        active === item.key ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="absolute right-6 top-1/2 flex -translate-y-1/2 items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-3 md:flex">
              <LanguageToggle />
              <Link href="/admin" className="rounded-md border px-3 py-1.5 text-sm hover:bg-slate-100">
                CMS
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Dropdown (keep style) */}
        <MegaMenu activeKey={active} />
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
