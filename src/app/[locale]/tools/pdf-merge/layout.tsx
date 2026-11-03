// src/app/[locale]/tools/pdf-merge/layout.tsx
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
    title: dict.metadata.pdfMergeTitle,
    description: dict.metadata.pdfMergeDescription,
    alternates: {
      canonical: `/${locale}/tools/pdf-merge`,
      languages: {
        id: "/id/tools/pdf-merge",
        en: "/en/tools/pdf-merge",
        "x-default": "/id/tools/pdf-merge",
      },
    },
  };
}

export default function PdfMergeLayout({ children }: Props) {
  return <>{children}</>;
}
