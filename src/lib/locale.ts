"use client";

import { useParams } from "next/navigation";
import type { Locale } from "./content.types";

export function useLocale(): Locale {
  const params = useParams<{ locale: string }>();
  return params.locale === "fa" ? "fa" : "en";
}

const EXTERNAL_RE = /^([a-z][a-z0-9+.-]*:)?\/\//i;

// Prefixes an internal CMS href ("/music", "/") with the current
// locale ("/en/music", "/en"). Leaves external URLs, "#", "mailto:",
// and "tel:" links untouched, and is a no-op if already prefixed.
export function localizeHref(href: string, locale: Locale): string {
  if (!href || href === "#") return href;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (EXTERNAL_RE.test(href)) return href;
  if (href === `/${locale}` || href.startsWith(`/${locale}/`)) return href;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}
