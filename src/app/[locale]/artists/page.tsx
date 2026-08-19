import type { Metadata } from "next";
import Artists from "@/components/sections/Artists";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Kamran Rasoolzadeh — Azadichords",
    description:
      "Iranian poet, composer, and singer-songwriter. Composer and producer of CHESHMAT (2014) and Azadichords' first artist.",
  },
  fa: {
    title: "کامران رسول‌زاده — آزادی‌کورد",
    description:
      "شاعر، آهنگساز و خواننده-ترانه‌سرای ایرانی. سازنده و تهیه‌کننده‌ی چشمت (۲۰۱۴) و اولین هنرمند آزادی‌کورد.",
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

export default function ArtistsPage() {
  return <Artists />;
}
