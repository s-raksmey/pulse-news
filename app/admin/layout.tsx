import AdminSidebar from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-10">
        <AdminSidebar />
        <section className="flex-1 rounded-2xl border border-gray-200 bg-white shadow-sm">
          {children}
        </section>
      </div>
    </div>
  );
}
