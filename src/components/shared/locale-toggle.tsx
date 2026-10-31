// src/components/shared/locale-toggle.tsx
"use client";

import { LOCALES, LOCALE_LABELS } from "@/i18n/config";
import { useLocale } from "./locale-provider";
import { cn } from "@/lib/utils";

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="inline-flex h-9 items-center rounded-lg border border-border p-0.5">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={cn(
            "h-7 rounded-md px-2 text-xs font-medium transition-colors",
            locale === l
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`Set locale to ${l}`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}