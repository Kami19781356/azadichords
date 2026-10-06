import type { MetadataRoute } from "next";
import { SITE_URL, PAGES } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((path) =>
    (["en", "fa"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/festival" ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          fa: `${SITE_URL}/fa${path}`,
        },
      },
    })),
  );
}
