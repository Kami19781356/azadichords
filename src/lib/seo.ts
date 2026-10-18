import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Azadichords — Home for Free Voices",
};

// Adds what search engines and link previews need to a page's own
// title/description: canonical URL, the en/fa alternates, and Open Graph.
// (A page-level openGraph replaces the layout's, so it carries the image.)
export function pageMeta(base: Metadata, locale: string, path: string): Metadata {
  const loc = locale === "fa" ? "fa" : "en";
  const url = `/${loc}${path}`;
  return {
    ...base,
    alternates: {
      canonical: url,
      languages: {
        en: `/en${path}`,
        fa: `/fa${path}`,
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Azadichords",
      locale: loc === "fa" ? "fa_IR" : "en_US",
      alternateLocale: loc === "fa" ? ["en_US"] : ["fa_IR"],
      url,
      title: typeof base.title === "string" ? base.title : undefined,
      description: base.description ?? undefined,
      images: [OG_IMAGE],
    },
  };
}

export const ORG_ID = `${SITE_URL}/#organization`;
