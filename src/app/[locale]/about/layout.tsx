// src/app/[locale]/about/layout.tsx
import type { Metadata } from "next";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = getDictionary(locale);

  return {
    title: dict.metadata.aboutTitle,
    description: dict.metadata.aboutDescription,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        id: "/id/about",
        en: "/en/about",
        "x-default": "/id/about",
      },
    },
  };
}

export default function AboutLayout({ children }: Props) {
  return <>{children}</>;
}
