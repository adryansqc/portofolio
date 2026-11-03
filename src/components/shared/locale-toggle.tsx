// src/components/shared/locale-toggle.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { isLocale, LOCALES, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { useDict, useLocale } from "./locale-provider";
import { cn } from "@/lib/utils";

const LOCALE_NAMES: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
};

export function LocaleToggle() {
  const { locale } = useLocale();
  const dict = useDict();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; samesite=lax`;
    document.documentElement.lang = next;

    const segments = pathname.split("/");
    if (segments.length >= 2 && isLocale(segments[1])) {
      segments[1] = next;
      router.push(segments.join("/") || `/${next}`);
    } else {
      router.push(`/${next}${pathname === "/" ? "" : pathname}`);
    }
  }

  return (
    <div className="inline-flex h-9 items-center rounded-lg border border-border p-0.5">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLocale(l)}
          className={cn(
            "h-7 rounded-md px-2 text-xs font-medium transition-colors",
            locale === l
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={dict.aria.setLocale.replace("{language}", LOCALE_NAMES[l])}
          aria-pressed={locale === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
