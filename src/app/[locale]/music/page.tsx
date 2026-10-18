import type { Metadata } from "next";
import Music from "@/components/sections/Music";
import type { Locale } from "@/lib/content.types";
import { pageMeta, ORG_ID } from "@/lib/seo";
import { content } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Music — Azadichords",
    description:
      "Songs released by Azadichords, an independent label in Paris for free voices.",
  },
  fa: {
    title: "موسیقی — آکوردهای آزادی",
    description:
      "ترانه‌های آکوردهای آزادی را بشنوید. دانلود برای مخاطبانِ داخلِ ایران رایگان است.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/music");
}

export default async function MusicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = locale === "fa" ? "fa" : "en";
  const released = content[loc].releases.filter((r) => r.status === "out_now");
  return (
    <>
      {released.map((r) => (
        <JsonLd
          key={r.slug}
          data={{
            "@context": "https://schema.org",
            "@type": "MusicRecording",
            name: r.title,
            datePublished: r.releaseDate,
            inLanguage: "fa",
            byArtist: { "@type": "Person", name: "Kamran Rasoolzadeh" },
            publisher: { "@id": ORG_ID },
            image: r.coverImage ? `${SITE_URL}${r.coverImage}` : undefined,
            url: `${SITE_URL}/${loc}/music`,
            sameAs: r.streamingLinks.map((l) => l.url),
          }}
        />
      ))}
      <Music />
    </>
  );
}
