import type { Metadata } from "next";
import Festival from "@/components/sections/Festival";
import type { Locale } from "@/lib/content.types";
import { pageMeta, ORG_ID } from "@/lib/seo";
import { content } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Song Festival 2027 — Azadichords",
    description:
      "Azadichords Song Festival, February 26–27, 2027 in Paris: international music videos, a special section for songs for the road to freedom, and an international section for songs in any language.",
  },
  fa: {
    title: "جشنواره‌ی ترانه — آکوردهای آزادی",
    description:
      "جشنواره‌ی ترانه‌ی آکوردهای آزادی، ۲۶ و ۲۷ فوریه ۲۰۲۷ در پاریس: موزیک‌ویدیوهای بین‌المللی، بخشِ ویژه‌ی ترانه‌های فارسی به یادِ جاویدنامانِ ایران، و بخشِ ترانه‌ی بین‌المللی به هر زبان.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/festival");
}

export default async function FestivalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = locale === "fa" ? "fa" : "en";
  const c = content[loc].festival;
  // The festival itself is the dated entry that has an end date.
  const fest = content.en.festival.dates.find((d) => d.endDate);
  const m = meta[loc];
  return (
    <>
      {fest && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            name: c.title,
            description: typeof m.description === "string" ? m.description : undefined,
            startDate: fest.date,
            endDate: fest.endDate,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: "Paris, France",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Paris",
                addressCountry: "FR",
              },
            },
            organizer: { "@id": ORG_ID },
            image: [`${SITE_URL}/og-image.jpg`],
            url: `${SITE_URL}/${loc}/festival`,
          }}
        />
      )}
      <Festival />
    </>
  );
}
