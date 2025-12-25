"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FilePenLine, FolderKanban, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FilePenLine },
  { href: "/admin/categories", label: "Categories", icon: FolderKanban },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-gray-200">
      <SidebarHeader>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white">PN</div>
          <div className="leading-none">
            <p className="text-xs uppercase tracking-wide text-gray-500">Pulse</p>
            <p>News CMS</p>
          </div>
        </div>
        <SidebarTrigger aria-label="Toggle sidebar" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CMS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <Link href={item.href} className="block">
                      <SidebarMenuButton
                        isActive={isActive}
                        leading={<Icon className="h-4 w-4" />}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <p className="px-2 text-xs text-gray-500">Local drafts stay on this device.</p>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
