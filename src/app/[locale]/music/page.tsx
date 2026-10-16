import type { Metadata } from "next";
import Music from "@/components/sections/Music";
import type { Locale } from "@/lib/content.types";

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
  return meta[locale as Locale] ?? meta.en;
}

export default function MusicPage() {
  return <Music />;
}
