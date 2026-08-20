import type { NextRequest } from "next/server";

// Traefik forwards to this app on an internal address, so
// request.nextUrl.origin resolves to that internal hop (e.g.
// localhost:3000) instead of the public domain. Reverse proxies set
// X-Forwarded-Proto/X-Forwarded-Host for exactly this reason — prefer
// those, and only fall back to nextUrl.origin for local dev where
// there's no proxy in front at all.
export function getSiteOrigin(request: NextRequest): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }
  return request.nextUrl.origin;
}
