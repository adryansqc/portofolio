// src/app/[locale]/tools/base64/layout.tsx
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
    title: dict.metadata.base64Title,
    description: dict.metadata.base64Description,
    alternates: {
      canonical: `/${locale}/tools/base64`,
      languages: {
        id: "/id/tools/base64",
        en: "/en/tools/base64",
        "x-default": "/id/tools/base64",
      },
    },
  };
}

export default function Base64Layout({ children }: Props) {
  return <>{children}</>;
}
