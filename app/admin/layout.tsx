import AdminSidebar from "@/components/layout/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <AdminSidebar />
        <SidebarInset className="w-full overflow-auto">
          <div className="flex min-h-screen flex-col">
            <div className="relative isolate w-full bg-white/60 px-4 py-6 shadow-sm ring-1 ring-gray-100 backdrop-blur supports-[backdrop-filter]:bg-white/70 sm:px-6">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="font-semibold text-gray-900">Pulse News CMS</p>
                  <p className="text-xs sm:text-sm">Manage dashboard, newsroom content, and settings from one place.</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-100">Synchronized</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 ring-1 ring-blue-100">Responsive layout</span>
                </div>
              </div>
            </div>

            <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <section className="mx-auto w-full max-w-6xl rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm ring-1 ring-gray-100 backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:p-6">
                {children}
              </section>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}