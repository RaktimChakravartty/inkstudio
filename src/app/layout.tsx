import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeProvider } from "@/lib/theme";

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
      <body className="h-full bg-ink-950 text-ink-100">
        <ThemeProvider>
          <div className="flex h-full">
            <Sidebar />
            <main className="flex-1 overflow-auto lg:ml-60">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
