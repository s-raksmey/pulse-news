import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-white px-6">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-100 blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        {/* Big 404 */}
        <div className="relative">
          <span className="block text-[120px] font-black leading-none tracking-tight text-gray-900 sm:text-[160px]">
            404
          </span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold tracking-widest text-blue-600">
            BREAKING NEWS
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
          This page is missing
        </h1>

        {/* Subheadline */}
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          The story you’re looking for may have been moved, removed, or never
          existed. Our newsroom couldn’t find it.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:shadow-lg transition"
          >
            Back to homepage
          </Link>

          <Link
            href="/world"
            className="rounded-full border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Read latest news
          </Link>
        </div>

        {/* Footer hint */}
        <p className="mt-10 text-xs text-gray-400">
          Error code: 404 · PULSE NEWS
        </p>
      </div>
    </section>
  );
}
