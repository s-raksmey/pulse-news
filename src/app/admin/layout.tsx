import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">CMS</div>
          <h1 className="text-xl font-semibold">Pulse News Dashboard</h1>
        </div>
        <div className="flex gap-3 text-sm">
          <Link className="text-slate-600 hover:text-slate-900" href="/admin/articles">Articles</Link>
          <Link className="text-slate-600 hover:text-slate-900" href="/">Public Site</Link>
        </div>
      </div>
      {children}
    </div>
  );
}
