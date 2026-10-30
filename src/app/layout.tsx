// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";

export const metadata: Metadata = {
  title: {
    default: "Adryan — Full Stack Developer",
    template: "%s — Adryan",
  },
  description:
    "Portfolio Adryan, Full Stack Developer & UI/UX Designer. Membangun web app yang cepat, accessible, dan enak dipakai.",
  keywords: [
    "Adryan",
    "Full Stack Developer",
    "Frontend Developer",
    "UI/UX Designer",
    "Portfolio",
  ],
  authors: [{ name: "Adryan" }],
  openGraph: {
    title: "Adryan — Full Stack Developer",
    description:
      "Portfolio Adryan, Full Stack Developer & UI/UX Designer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme') || 'system';
                  var d = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (d) document.documentElement.classList.add('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}