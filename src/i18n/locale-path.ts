// src/i18n/locale-path.ts
import type { Locale } from "./config";

export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return `/${locale}/${path}`;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length >= 2 && (segments[1] === "id" || segments[1] === "en")) {
    const rest = segments.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}
