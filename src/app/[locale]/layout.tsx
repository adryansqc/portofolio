// src/app/[locale]/layout.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { isLocale, LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/locale-path";
import { SITE } from "@/lib/constants";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { LocaleProvider } from "@/components/shared/locale-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);
  const openGraphLocale = locale === "id" ? "id_ID" : "en_US";
  const alternateLocale = locale === "id" ? "en_US" : "id_ID";

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: dict.metadata.homeTitle,
      template: `%s — ${SITE.name}`,
    },
    description: dict.metadata.homeDescription,
    keywords: [
      "Adryan",
      "Full Stack Developer",
      "Frontend Developer",
      "UI/UX Designer",
      "Portfolio",
    ],
    authors: [{ name: SITE.name }],
    alternates: {
      canonical: localePath(locale, "/"),
      languages: {
        id: "/id",
        en: "/en",
        "x-default": "/id",
      },
    },
    openGraph: {
      title: dict.metadata.homeTitle,
      description: dict.metadata.homeDescription,
      type: "website",
      url: localePath(locale, "/"),
      siteName: SITE.name,
      locale: openGraphLocale,
      alternateLocale: [alternateLocale],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <ThemeProvider>
          <LocaleProvider locale={locale}>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ChatWidget />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
