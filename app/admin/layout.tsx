import AdminSidebar from "@/components/layout/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <SidebarInset>
          <div className="mx-auto flex w-full max-w-7xl px-4 py-10">
            <section className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
              {children}
            </section>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
