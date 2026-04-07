import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ThemeProvider } from "@/lib/theme";
import { ToastProvider } from "@/components/shared/Toast";

export const metadata: Metadata = {
  title: "INNOVA Visual Language Platform",
  description: "Brand visual system for INNOVA AM Tech — illustration, photography, icons, layout, motion, and patterns.",
  icons: {
    icon: '/brandmark.svg',
  },
  openGraph: {
    title: 'INNOVA Visual Language Platform',
    description: 'Brand visual system for INNOVA AM Tech — illustration, photography, icons, layout, motion, and patterns.',
    images: ['/og-image.svg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-ink-950 text-ink-100" style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
        <ThemeProvider>
          <ToastProvider>
            <div className="flex h-full">
              <Sidebar />
              <main className="flex-1 overflow-auto lg:ml-60">
                {children}
              </main>
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
