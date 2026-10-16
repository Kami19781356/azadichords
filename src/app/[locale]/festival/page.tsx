import type { Metadata } from "next";
import Festival from "@/components/sections/Festival";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Song Festival 2027 — Azadichords",
    description:
      "Azadichords Song Festival, January 8–9, 2027 in Paris: international music videos, and a special section for Persian songs in memory of Iran’s Javidnaman.",
  },
  fa: {
    title: "جشنواره‌ی ترانه — آکوردهای آزادی",
    description:
      "جشنواره‌ی ترانه‌ی آکوردهای آزادی، ۸ و ۹ ژانویه ۲۰۲۷ در پاریس: موزیک‌ویدیوهای بین‌المللی، و بخشِ ویژه‌ی ترانه‌های فارسی به یادِ جاویدنامانِ ایران.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as Locale] ?? meta.en;
  return {
    ...m,
    alternates: {
      canonical: `/${locale}/festival`,
      languages: { en: "/en/festival", fa: "/fa/festival" },
    },
  };
}

export default function FestivalPage() {
  return <Festival />;
}
