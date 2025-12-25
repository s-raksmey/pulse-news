// components/shared/breadcrumb.tsx

import Link from "next/link";

export default function Breadcrumb({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <nav className="mb-4 text-sm text-gray-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, idx) => (
          <li key={it.href} className="flex items-center gap-2">
            <Link href={it.href} className="hover:text-blue-600">
              {it.label}
            </Link>
            {idx < items.length - 1 && <span className="opacity-40">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
