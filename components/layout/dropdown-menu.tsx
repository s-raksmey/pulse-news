// components/dropdown-menu.tsx
"use client";

import Link from "next/link";
import { dropdownData } from "@/data/dropdown-data";
import { DropdownItem, FeaturedItem } from "@/types/dropdown";

interface DropdownMenuProps {
  isOpen: boolean;
  dropdownKey: keyof typeof dropdownData | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DropdownMenu({
  isOpen,
  dropdownKey,
  onMouseEnter,
  onMouseLeave,
}: DropdownMenuProps) {
  if (!dropdownKey) return null;

  const content = dropdownData[dropdownKey];

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-30 left-0 right-0 bg-surface border-t border-gray-200 shadow-2xl z-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container-8xl px-6 py-6">
        <div className="flex">
          {/* MAIN */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {content.title}
            </h2>

            <div className="grid grid-cols-4 gap-x-6 gap-y-3">
              {content.items.map((item: DropdownItem) => (
                <Link key={item.label} href={item.href} className="group block">
                  <div className="px-2 py-1.5 rounded-md hover:bg-primary-50 transition-colors">
                    <div className="flex items-start gap-2">
                      <span className="text-primary-500 font-bold select-none">
                        |
                      </span>
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary-600 leading-tight">
                          {item.label}
                        </h3>
                        <p className="text-xs text-gray-600 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* FEATURED */}
          <div className="w-72 ml-8 pl-8 border-l border-gray-200">
            <h3 className="text-base font-bold text-gray-900 mb-3">
              Featured in {content.title}
            </h3>

            <div className="space-y-3">
              {content.featured.map((feature: FeaturedItem) => (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="block px-3 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {feature.isBreaking && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-xs font-semibold text-red-500">BREAKING</span>
                    </div>
                  )}
                  <h4 className="text-sm font-semibold text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    Read full story →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}