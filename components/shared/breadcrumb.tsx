// components/shared/breadcrumb.tsx
import Link from "next/link";
import type { NavCrumb } from "@/types/article";

export default function Breadcrumb({ items }: { items: NavCrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-xs text-gray-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((c, idx) => (
          <li key={c.href} className="flex items-center gap-2">
            <Link href={c.href} className="hover:text-blue-600 transition-colors">
              {c.label}
            </Link>
            {idx !== items.length - 1 ? <span className="opacity-40">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
