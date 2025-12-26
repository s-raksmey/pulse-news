import AdminSidebar from "@/components/layout/admin-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-neutral-50">
        <AdminSidebar />

        <SidebarInset
          className="
            transition-[margin]
            duration-300
            ease-in-out
            data-[sidebar=collapsed]:ml-0
          "
        >
          {/* Top bar */}
          <header className="flex h-14 items-center gap-3 px-4">
            <SidebarTrigger className="rounded-lg hover:bg-neutral-100" />
            <span className="text-sm font-semibold text-neutral-900">
              Pulse News CMS
            </span>
          </header>

          {/* Content */}
          <main className="px-4 py-6">
            <section className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-sm">
              {children}
            </section>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
