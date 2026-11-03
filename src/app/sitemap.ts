// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";
import { getProjectSlugs, SITE } from "@/lib/constants";
import { localePath } from "@/i18n/locale-path";

const baseUrl = SITE.url.replace(/\/$/, "");

const STATIC_PATHS = [
  "/",
  "/about",
  "/projects",
  "/tools/pdf-merge",
  "/tools/image-tools",
  "/tools/qr-generator",
  "/tools/password-generator",
  "/tools/base64",
] as const;

function alternates(path: string) {
  return {
    languages: Object.fromEntries([
      ...LOCALES.map((locale) => [locale, `${baseUrl}${localePath(locale, path)}`]),
      ["x-default", `${baseUrl}${localePath("id", path)}`],
    ]),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...getProjectSlugs().map((slug) => `/projects/${slug}`),
  ];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${baseUrl}${localePath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.startsWith("/projects/") ? 0.7 : 0.8,
      alternates: alternates(path),
    }))
  );
}
