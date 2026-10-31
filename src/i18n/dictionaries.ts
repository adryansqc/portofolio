// src/i18n/dictionaries.ts
import type { Locale } from "./config";
import { id } from "./dictionaries/id";
import { en } from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/id";

const dictionaries: Record<Locale, Dictionary> = { id, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };