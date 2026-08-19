import type { Metadata } from "next";
import Activity from "@/components/sections/Activity";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Activity — Azadichords",
    description:
      "A running record of Azadichords' releases, performances, and milestones.",
  },
  fa: {
    title: "فعالیت‌ها — آزادی‌کورد",
    description: "روایتی از ریلیزها، اجراها و نقاط عطفِ آزادی‌کورد.",
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

export default function ActivityPage() {
  return <Activity />;
}
