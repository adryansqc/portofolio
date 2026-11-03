// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";

function preferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const idIndex = accept.indexOf("id");
  const enIndex = accept.indexOf("en");

  if (idIndex !== -1 && (enIndex === -1 || idIndex < enIndex)) return "id";
  if (enIndex !== -1) return "en";
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const firstSegmentIsLocale = isLocale(firstSegment);

  if (
    firstSegmentIsLocale &&
    (pathname === `/${firstSegment}` ||
      pathname.startsWith(`/${firstSegment}/`))
  ) {
    return NextResponse.next();
  }

  const locale = preferredLocale(request);
  const suffix = pathname === "/" ? "" : pathname;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${suffix}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
