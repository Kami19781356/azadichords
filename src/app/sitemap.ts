import type { MetadataRoute } from "next";
import { SITE_URL, PAGES } from "@/lib/site";
import { content } from "@/lib/content";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [
    ...PAGES,
    ...content.fa.releases
      .filter((r) => r.status === "out_now")
      .map((r) => `/music/${r.slug}`),
  ];
  return paths.flatMap((path) =>
    (["en", "fa"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority:
        path === "" ? 1 : path === "/festival" ? 0.9 : path.startsWith("/music/") ? 0.8 : 0.7,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          fa: `${SITE_URL}/fa${path}`,
        },
      },
    })),
  );
}
