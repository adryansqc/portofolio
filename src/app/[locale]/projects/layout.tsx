// src/app/[locale]/projects/layout.tsx
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
    title: dict.metadata.projectsTitle,
    description: dict.metadata.projectsDescription,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        id: "/id/projects",
        en: "/en/projects",
        "x-default": "/id/projects",
      },
    },
  };
}

export default function ProjectsLayout({ children }: Props) {
  return <>{children}</>;
}
