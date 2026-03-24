import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "INNOVA Ink Studio",
  description: "AI illustration generation platform powered by The Ink Register style system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full flex bg-ink-950 text-ink-100" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <Sidebar />
        <main className="flex-1 overflow-auto ml-64">
          {children}
        </main>
      </body>
    </html>
  );
}
