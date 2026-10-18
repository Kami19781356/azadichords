import type { Metadata } from "next";
import Activity from "@/components/sections/Activity";
import type { Locale } from "@/lib/content.types";
import { pageMeta } from "@/lib/seo";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Activity — Azadichords",
    description:
      "A running record of Azadichords' releases, performances, and milestones.",
  },
  fa: {
    title: "فعالیت‌ها — آکوردهای آزادی",
    description: "روایتی از ریلیزها، اجراها و نقاط عطفِ آکوردهای آزادی.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/activity");
}

export default function ActivityPage() {
  return <Activity />;
}
