"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FilePenLine,
  FolderKanban,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

/* =========================
   Sidebar Items
========================= */
const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FilePenLine },
  { href: "/admin/categories", label: "Categories", icon: FolderKanban },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      className="border-none"
    >
      {/* =========================
          MAIN NAV
      ========================= */}
      <SidebarContent className="pt-4">
        <SidebarMenu className="gap-3">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="
                    h-12
                    gap-3
                    px-5
                    rounded-xl
                    transition-all
                  "
                >
                  <Link href={item.href}>
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* =========================
          USER / AVATAR
      ========================= */}
      <SidebarFooter className="px-3 pb-4">
        <div
          className="
            flex items-center gap-3
            rounded-xl
            px-3 py-2
            transition-all
            hover:bg-gray-100
            data-[sidebar=collapsed]:justify-center
            data-[sidebar=collapsed]:px-0
          "
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            N
          </div>

          {/* User Info (hidden when collapsed) */}
          <div className="flex flex-col truncate text-sm data-[sidebar=collapsed]:hidden">
            <span className="font-semibold text-gray-900">
              Narin Sok
            </span>
            <span className="truncate text-xs text-gray-500">
              narin.sok@pulsenews.dev
            </span>
          </div>
        </div>
      </SidebarFooter>

      {/* =========================
          ICON RAIL (Collapsed)
      ========================= */}
      <SidebarRail />
    </Sidebar>
  )
}
