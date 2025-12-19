// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlueWave - Modern Solutions",
  description: "A modern website with beautiful blue and white gradients",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
