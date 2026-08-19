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
  // Everything except API routes, the Decap admin panel, Next internals,
  // and files with an extension (favicon, robots.txt, etc.) — those stay
  // locale-unprefixed, matching the plan's routing decision.
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};
