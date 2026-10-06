import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "fa"];
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except API routes, Next internals, and files with an
  // extension (favicon, robots.txt, sitemap.xml, etc.) — those stay
  // locale-unprefixed.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
