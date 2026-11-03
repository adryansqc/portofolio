// src/app/[locale]/tools/qr-generator/layout.tsx
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
    title: dict.metadata.qrGeneratorTitle,
    description: dict.metadata.qrGeneratorDescription,
    alternates: {
      canonical: `/${locale}/tools/qr-generator`,
      languages: {
        id: "/id/tools/qr-generator",
        en: "/en/tools/qr-generator",
        "x-default": "/id/tools/qr-generator",
      },
    },
  };
}

export default function QrGeneratorLayout({ children }: Props) {
  return <>{children}</>;
}
