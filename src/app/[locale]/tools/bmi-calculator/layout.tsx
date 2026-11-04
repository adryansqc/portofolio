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
    title: dict.metadata.bmiCalculatorTitle,
    description: dict.metadata.bmiCalculatorDescription,
    alternates: {
      canonical: `/${locale}/tools/bmi-calculator`,
      languages: {
        id: "/id/tools/bmi-calculator",
        en: "/en/tools/bmi-calculator",
        "x-default": "/id/tools/bmi-calculator",
      },
    },
  };
}

export default function BmiCalculatorLayout({ children }: Props) {
  return <>{children}</>;
}
