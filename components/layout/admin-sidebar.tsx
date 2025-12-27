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
  SidebarHeader,
  useSidebar,
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

function SidebarContentComponent() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <SidebarMenu className="gap-1 px-3">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || 
          (item.href !== "/admin" && pathname?.startsWith(item.href))

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className="h-11 gap-3 rounded-lg px-4 text-sm transition-all hover:bg-neutral-100"
            >
              <Link href={item.href}>
                <Icon className="h-4 w-4 shrink-0" />
                {state !== "collapsed" && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

function SidebarFooterComponent() {
  const { state } = useSidebar()

  return (
    <div className={`
      flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-neutral-100
      ${state === "collapsed" ? "justify-center px-2" : ""}
    `}>
      {/* Avatar */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
        N
      </div>

      {/* User Info - Only show when sidebar is expanded */}
      {state !== "collapsed" && (
        <div className="flex flex-col truncate text-sm">
          <span className="font-semibold text-neutral-900">
            Narin Sok
          </span>
          <span className="truncate text-xs text-neutral-500">
            narin.sok@pulsenews.dev
          </span>
        </div>
      )}
    </div>
  )
}

export default function AdminSidebar() {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 pt-3">
        <div className={`
          flex items-center rounded-lg bg-neutral-50 px-3 py-2
          ${state === "collapsed" ? "justify-center" : ""}
        `}>
          <div className="flex items-center gap-3">
            {/* Logo - Always visible */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
              PN
            </div>
            
            {/* Title - Only show when sidebar is expanded */}
            {state !== "collapsed" && (
              <div className="space-y-0.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Admin
                </p>
                <p className="text-sm font-semibold text-neutral-900">Pulse News Studio</p>
              </div>
            )}
          </div>
        </div>
      </SidebarHeader>

      {/* =========================
          MAIN NAV
      ========================= */}
      <SidebarContent className="pt-2 ">
        <SidebarContentComponent />
      </SidebarContent>

      {/* =========================
          USER / AVATAR
      ========================= */}
      <SidebarFooter className="px-3 pb-4">
        <SidebarFooterComponent />
      </SidebarFooter>
    </Sidebar>
  )
}