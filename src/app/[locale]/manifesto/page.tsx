import type { Metadata } from "next";
import Manifesto from "@/components/sections/Manifesto";
import type { Locale } from "@/lib/content.types";
import { pageMeta } from "@/lib/seo";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Manifesto — Azadichords",
    description:
      "Azadichords is a label and a song festival for voices that cannot, and will not, stay silent.",
  },
  fa: {
    title: "مانیفست — آکوردهای آزادی",
    description:
      "آکوردهای آزادی لیبل و جشنواره‌ی ترانه‌ای است برای صداهایی که نمی‌توانند، و نمی‌خواهند، ساکت بمانند.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/manifesto");
}

export default function ManifestoPage() {
  return <Manifesto />;
}
