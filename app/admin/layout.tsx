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

        <SidebarInset className="flex flex-1 flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-3 bg-white px-6">
            <SidebarTrigger className="rounded-lg p-2 transition hover:bg-neutral-100" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Pulse News
              </span>
              <span className="text-sm font-semibold text-neutral-900">
                Content Studio
              </span>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 px-4 py-8">
            <section className="mx-auto max-w-7xl space-y-6">
              <div className="rounded-2xl bg-white p-6">
                {children}
              </div>
            </section>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}