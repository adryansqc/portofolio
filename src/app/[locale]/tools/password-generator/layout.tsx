// src/app/[locale]/tools/password-generator/layout.tsx
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
    title: dict.metadata.passwordGeneratorTitle,
    description: dict.metadata.passwordGeneratorDescription,
    alternates: {
      canonical: `/${locale}/tools/password-generator`,
      languages: {
        id: "/id/tools/password-generator",
        en: "/en/tools/password-generator",
        "x-default": "/id/tools/password-generator",
      },
    },
  };
}

export default function PasswordGeneratorLayout({ children }: Props) {
  return <>{children}</>;
}
