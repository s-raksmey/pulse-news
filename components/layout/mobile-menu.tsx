// components/mobile-menu.tsx - UPDATED VERSION
"use client";

import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { navigationData } from "@/data/navigation";
import { dropdownData } from "@/data/dropdown-data";

interface MobileMenuProps {
  open: boolean;
  language: "EN" | "KH";
  onLanguageChange: (lang: "EN" | "KH") => void;
  onClose: () => void;
}

export default function MobileMenu({
  open,
  language,
  onLanguageChange,
  onClose,
}: MobileMenuProps) {
  const [active, setActive] = useState<string | null>(null);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 z-50 bg-white flex flex-col"
      >
        {/* Header */}
        <div className="shrink-0 bg-white">
          <div className="flex items-center justify-between px-4 sm:px-6 h-20 border-b border-gray-200 bg-white">
            {/* Logo Container - Fixed to ensure visibility */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {/* PULSE text */}
                <span className="text-2xl font-black tracking-tight text-gray-900">
                  PULSE
                </span>
                {/* NEWS badge */}
                <span className="rounded-full bg-linear-to-r from-blue-500 to-blue-700 px-2.5 py-1 text-[10px] font-bold text-white">
                  NEWS
                </span>
              </div>
              {/* Subtitle */}
              <p className="text-xs text-gray-500 mt-1">
                Where news meets insight
              </p>
            </div>

            {/* Close button */}
            <button 
              onClick={onClose} 
              aria-label="Close menu"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-6 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLanguageChange("EN")}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    language === "EN"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  EN
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => onLanguageChange("KH")}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    language === "KH"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  KH
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto bg-white">
          <nav className="px-2 py-4">
            {navigationData.map((item) => {
              const isDropdown = item.type === "dropdown";
              const isOpen = active === item.label;

              /* Static Link */
              if (!isDropdown) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-3.5 text-[15px] font-medium text-gray-900 hover:bg-gray-50 rounded-lg mx-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }

              /* Dropdown */
              const category = dropdownData[item.dropdownKey];

              return (
                <div key={item.label} className="mx-2 mb-2">
                  <button
                    onClick={() =>
                      setActive(isOpen ? null : item.label)
                    }
                    className="flex w-full items-center justify-between px-4 py-3.5 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-gray-50 rounded-lg mt-1"
                      >
                        {category.items.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={onClose}
                            className="block px-6 py-3 text-[13px] text-gray-700 hover:bg-gray-100 border-t border-gray-200 first:border-t-0"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Optional: Add a footer with subscribe button */}
        <div className="shrink-0 border-t border-gray-200 bg-white p-4">
          <button className="w-full rounded-full bg-linear-to-r from-blue-500 to-blue-700 px-6 py-3.5 text-sm font-bold text-white hover:shadow-lg transition-shadow">
            Subscribe Now
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}