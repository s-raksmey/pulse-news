// components/layout/header.tsx

"use client";

import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Navigation from "./navigation";
import DropdownMenu from "./dropdown-menu";
import MobileMenu from "./mobile-menu";
import TopInfoBar from "./top-info-bar";
import { dropdownData } from "@/data/dropdown-data";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownKey, setDropdownKey] = useState<
    keyof typeof dropdownData | null
  >(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"EN" | "KH">("EN");

  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Memoized handlers
  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    if (label in dropdownData) {
      setDropdownKey(label as keyof typeof dropdownData);
      setDropdownOpen(true);
    }
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
      setDropdownKey(null);
    }, 150);
  }, []);

  const handleDropdownMouseEnter = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
      setDropdownKey(null);
    }, 150);
  }, []);

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  const handleLanguageToggle = useCallback(() => {
    setSelectedLanguage((prev) => (prev === "EN" ? "KH" : "EN"));
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleLanguageChange = useCallback((language: "EN" | "KH") => {
    setSelectedLanguage(language);
  }, []);

  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false);
        } else if (searchOpen) {
          setSearchOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [mobileOpen, searchOpen]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  return (
    <LayoutGroup>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-white"
        }`}
      >
        <TopInfoBar />

        {/* Main Header - FIXED: Added responsive container classes */}
        <div className="container-8xl w-full">
          <div className="flex h-20 items-center justify-between px-4 lg:px-0">
            {/* Logo & Mobile Menu - Adjusted for 1024px */}
            <div className="flex items-center gap-4 lg:gap-4">
              <button
                className="lg:hidden"
                onClick={handleMobileMenuToggle}
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>

              <Link href="/" className="flex items-center gap-2 min-w-0">
                {/* Mobile & Tablet Logo - FIXED: Use solid text for visibility */}
                <div className="flex items-center gap-2 lg:hidden">
                  <h1 className="mobile-title">
                    PULSE
                  </h1>
                  <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shrink-0">
                    NEWS
                  </span>
                </div>

                {/* Desktop Logo - Responsive sizing */}
                <div className="hidden lg:flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl lg:text-4xl font-black tracking-tighter bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                      PULSE
                    </h1>
                    <span className="rounded-full bg-linear-to-r from-blue-500 to-blue-700 px-2.5 py-1 text-xs font-bold text-white shrink-0">
                      NEWS
                    </span>
                  </div>
                  <p className="text-xs lg:text-sm text-gray-500 mt-1 truncate">
                    Where news meets insight
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Responsive for 1024px */}
            <div className="hidden lg:flex flex-1 justify-center min-w-0 mx-4 lg:mx-6">
              <Navigation
                onDropdownEnter={handleDropdownEnter}
                onDropdownLeave={handleDropdownLeave}
              />
            </div>

            {/* Actions - Responsive for 1024px */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Language Selector - Tablet only */}
              <div className="hidden md:flex lg:hidden items-center border-r border-gray-200 pr-2">
                <button
                  onClick={handleLanguageToggle}
                  className="flex items-center gap-1 px-1.5 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Toggle language"
                >
                  <span
                    className={`${
                      selectedLanguage === "EN"
                        ? "font-bold text-blue-600"
                        : "opacity-60 text-gray-400"
                    }`}
                  >
                    EN
                  </span>
                  <span className="text-gray-300 mx-0.5">|</span>
                  <span
                    className={`${
                      selectedLanguage === "KH"
                        ? "font-bold text-blue-600"
                        : "opacity-60 text-gray-400"
                    }`}
                  >
                    KH
                  </span>
                </button>
              </div>

              {/* Desktop Language Selector */}
              <div className="hidden lg:flex items-center border-r border-gray-200 pr-3">
                <button
                  onClick={handleLanguageToggle}
                  className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label="Toggle language"
                >
                  <span
                    className={`${
                      selectedLanguage === "EN"
                        ? "font-bold text-blue-600"
                        : "opacity-60 text-gray-400"
                    }`}
                  >
                    EN
                  </span>
                  <span className="text-gray-300 mx-1">|</span>
                  <span
                    className={`${
                      selectedLanguage === "KH"
                        ? "font-bold text-blue-600"
                        : "opacity-60 text-gray-400"
                    }`}
                  >
                    KH
                  </span>
                </button>
              </div>

              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={handleSearchToggle}
                  className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label={searchOpen ? "Close search" : "Open search"}
                >
                  {searchOpen ? (
                    <X className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
                  ) : (
                    <Search className="h-4 w-4 lg:h-5 lg:w-5 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Subscribe - Responsive sizing */}
              <button className="rounded-full bg-linear-to-r from-blue-500 to-blue-700 px-3 py-1.5 lg:px-4 lg:py-2.5 text-xs lg:text-sm font-bold text-white hover:shadow-lg transition-shadow whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Animated Border - Using layout animation */}
        <motion.div
          layout
          className="border-b border-gray-200"
          initial={false}
          animate={{
            opacity: dropdownOpen || searchOpen ? 0 : 1,
            scaleY: dropdownOpen || searchOpen ? 0 : 1,
            transformOrigin: "top",
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          style={{
            willChange: "transform, opacity",
          }}
        />

        <AnimatePresence>
          <MobileMenu
            open={mobileOpen}
            language={selectedLanguage}
            onLanguageChange={handleLanguageChange}
            onClose={() => setMobileOpen(false)}
          />
        </AnimatePresence>
      </header>

      {/* Search Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 lg:top-30 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40"
            ref={searchContainerRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container-8xl px-4 lg:px-6 py-4">
              <div className="flex flex-col lg:flex-row">
                {/* Main Search Content */}
                <div className="flex-1">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 lg:left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      autoFocus
                      placeholder="Search for news, topics, journalists..."
                      className="w-full pl-10 lg:pl-12 pr-4 py-3 text-[14px] border-b border-gray-300 focus:border-blue-500 outline-none placeholder:text-gray-400 text-gray-700"
                    />
                  </div>

                  {/* Quick Suggestions */}
                  <div className="mb-4">
                    <h3 className="text-[11px] font-semibold tracking-wide text-gray-500 uppercase mb-3">
                      Quick Suggestions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "AI", "Climate", "Stocks", "Election", 
                        "Tech", "Space", "Crypto", "Politics",
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          className="px-2 lg:px-3 py-1 lg:py-1.5 text-[11px] bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      {[
                        { term: "AI Regulations", time: "2h ago" },
                        { term: "Market Analysis", time: "Yesterday" },
                        { term: "Tech News", time: "2 days ago" },
                      ].map((search) => (
                        <div
                          key={search.term}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Search className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-sm text-gray-700">
                              {search.term}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {search.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Search Filters - Hidden on mobile */}
                <div className="hidden lg:block w-64 ml-8 pl-8 border-l border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Filter
                  </h3>

                  <div className="space-y-4">
                    {/* Category */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">
                        Category
                      </h4>
                      <div className="space-y-1">
                        {["All", "World", "Tech", "Business", "Politics"].map(
                          (category) => (
                            <button
                              key={category}
                              className="block w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded transition-colors"
                            >
                              {category}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-700 mb-2">
                        Date
                      </h4>
                      <div className="space-y-1">
                        {["Today", "Week", "Month", "Year"].map((date) => (
                          <button
                            key={date}
                            className="block w-full text-left px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded transition-colors"
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown Menu */}
      {dropdownOpen && !searchOpen && (
        <DropdownMenu
          isOpen={dropdownOpen}
          dropdownKey={dropdownKey}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        />
      )}
    </LayoutGroup>
  );
}
