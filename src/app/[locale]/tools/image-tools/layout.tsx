// src/app/[locale]/tools/image-tools/layout.tsx
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
    title: dict.metadata.imageToolsTitle,
    description: dict.metadata.imageToolsDescription,
    alternates: {
      canonical: `/${locale}/tools/image-tools`,
      languages: {
        id: "/id/tools/image-tools",
        en: "/en/tools/image-tools",
        "x-default": "/id/tools/image-tools",
      },
    },
  };
}

export default function ImageToolsLayout({ children }: Props) {
  return <>{children}</>;
}
