import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReleasePage from "@/components/sections/ReleasePage";
import JsonLd from "@/components/JsonLd";
import type { Locale } from "@/lib/content.types";
import { content } from "@/lib/content";
import { pageMeta, ORG_ID } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const ARTIST = { fa: "کامران رسول‌زاده", en: "Kamran Rasoolzadeh" } as const;

function find(locale: string, slug: string) {
  const loc: Locale = locale === "fa" ? "fa" : "en";
  return content[loc].releases.find((r) => r.slug === slug) ?? null;
}

function plain(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const release = find(locale, slug);
  if (!release) return {};
  const fa = locale === "fa";
  const base: Metadata = {
    title: fa
      ? `«${release.title}» — ${ARTIST.fa} | آکوردهای آزادی`
      : `${release.title} — ${ARTIST.en} | Azadichords`,
    description: plain(release.description),
  };
  const meta = pageMeta(base, locale, `/music/${slug}`);
  if (release.coverImage && meta.openGraph) {
    meta.openGraph = {
      ...meta.openGraph,
      images: [
        {
          url: release.coverImage,
          width: 1200,
          height: 1200,
          alt: release.coverImageCaption || release.title,
        },
      ],
    };
  }
  return meta;
}

export default async function ReleaseRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const release = find(locale, slug);
  if (!release) notFound();
  const loc: Locale = locale === "fa" ? "fa" : "en";
  const url = `${SITE_URL}/${loc}/music/${slug}`;
  const other = content[loc === "fa" ? "en" : "fa"].releases.find(
    (r) => r.slug === slug,
  );
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MusicRecording",
          name: release.title,
          alternateName: other && other.title !== release.title ? other.title : undefined,
          description: plain(release.description),
          datePublished: release.releaseDate,
          inLanguage: "fa",
          byArtist: { "@type": "Person", name: "Kamran Rasoolzadeh", alternateName: "کامران رسول‌زاده" },
          composer: { "@type": "Person", name: "Kamran Rasoolzadeh" },
          lyricist: { "@type": "Person", name: "Kamran Rasoolzadeh" },
          producer: { "@type": "Person", name: "Kamran Rasoolzadeh" },
          publisher: { "@id": ORG_ID },
          image: release.coverImage ? `${SITE_URL}${release.coverImage}` : undefined,
          url,
          sameAs: release.streamingLinks.map((l) => l.url),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: loc === "fa" ? "موسیقی" : "Music", item: `${SITE_URL}/${loc}/music` },
            { "@type": "ListItem", position: 2, name: release.title, item: url },
          ],
        }}
      />
      <ReleasePage slug={slug} />
    </>
  );
}
