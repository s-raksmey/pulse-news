import Link from "next/link";
import { LayoutDashboard, FilePenLine, FolderKanban, Settings } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FilePenLine },
  { href: "/admin/categories", label: "Categories", icon: FolderKanban },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full max-w-xs border-r border-gray-200 bg-white/60">
      <div className="px-4 py-6">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">CMS</div>
        <nav className="mt-4 space-y-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <item.icon className="h-4 w-4 text-gray-500" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
