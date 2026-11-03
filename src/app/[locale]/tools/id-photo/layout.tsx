// src/app/[locale]/tools/id-photo/layout.tsx
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
    title: dict.metadata.idPhotoTitle,
    description: dict.metadata.idPhotoDescription,
    alternates: {
      canonical: `/${locale}/tools/id-photo`,
      languages: {
        id: "/id/tools/id-photo",
        en: "/en/tools/id-photo",
        "x-default": "/id/tools/id-photo",
      },
    },
  };
}

export default function IdPhotoLayout({ children }: Props) {
  return <>{children}</>;
}
