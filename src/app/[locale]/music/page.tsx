import type { Metadata } from "next";
import Music from "@/components/sections/Music";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Music — Azadichords",
    description:
      "Listen to releases from Azadichords, an independent Paris label for uncensored voices.",
  },
  fa: {
    title: "موسیقی — آزادی‌کورد",
    description:
      "ریلیزهای آزادی‌کورد را بشنوید — لیبلی مستقل در پاریس برای صداهای سانسورنشده.",
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
