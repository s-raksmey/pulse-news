// components/navigation.tsx
"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navigationData } from "@/data/navigation";
import { NavItem } from "@/types/dropdown";

interface NavigationProps {
  onDropdownEnter: (label: string) => void;
  onDropdownLeave: () => void;
}

export default function Navigation({ onDropdownEnter, onDropdownLeave }: NavigationProps) {
  return (
    <nav className="flex items-center space-x-1 lg:space-x-2">
      {navigationData.map((item: NavItem) => (
        <div
          key={item.label}
          className="relative group"
          onMouseEnter={() => item.type === "dropdown" && onDropdownEnter(item.label)}
          onMouseLeave={onDropdownLeave}
        >
          <Link
            href={item.href}
            className="flex items-center gap-1 px-3 py-2 text-[13px] lg:text-[14px] font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 whitespace-nowrap group"
          >
            {item.label}
            {item.type === "dropdown" && (
              <ChevronDown className="h-3.5 w-3.5 ml-0.5 transition-transform duration-200 ease-in-out group-hover:rotate-180" />
            )}
          </Link>
        </div>
      ))}
    </nav>
  );
}