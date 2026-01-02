import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Pulse News",
  description: "News website with CMS dashboard and Editor.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-white">
      <body className="min-h-screen bg-white text-slate-900">
        <Header />
        <div className="min-h-[calc(100vh-140px)]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
