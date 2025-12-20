// components/layout/footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container-8xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-gray-900">PULSE</span>
              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">NEWS</span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Where news meets insight.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Sections</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <Link href="/world" className="hover:text-blue-600">World</Link>
              <Link href="/tech" className="hover:text-blue-600">Tech</Link>
              <Link href="/business" className="hover:text-blue-600">Business</Link>
              <Link href="/politics" className="hover:text-blue-600">Politics</Link>
              <Link href="/blog" className="hover:text-blue-600">Blog</Link>
              <Link href="/search" className="hover:text-blue-600">Search</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Company</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <Link href="/about" className="block hover:text-blue-600">About</Link>
              <Link href="/contact" className="block hover:text-blue-600">Contact</Link>
              <Link href="/privacy" className="block hover:text-blue-600">Privacy</Link>
              <Link href="/terms" className="block hover:text-blue-600">Terms</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} PULSE NEWS. All rights reserved.</span>
          <span>Frontend-only build (CMS later)</span>
        </div>
      </div>
    </footer>
  );
}
