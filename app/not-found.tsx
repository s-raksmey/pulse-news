// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <div className="text-sm font-semibold text-blue-600">PULSE NEWS</div>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">404</h1>
        <p className="mt-2 text-sm text-gray-600">
          The page you’re looking for doesn’t exist (yet).
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:shadow-lg"
          >
            Go Home
          </Link>
          <Link
            href="/search"
            className="rounded-full border border-gray-200 px-5 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Search
          </Link>
        </div>
      </div>
    </main>
  );
}
