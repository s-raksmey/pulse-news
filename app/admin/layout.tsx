import AdminSidebar from "@/components/layout/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <SidebarInset className="overflow-auto">
          <div className="flex flex-col min-h-screen">
            <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-6">
              <section className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
                {children}
              </section>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}