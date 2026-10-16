import type { Metadata } from "next";
import Submissions from "@/components/sections/Submissions";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Submit a Persian Song — Azadichords Song Festival",
    description:
      "The special section of the Azadichords Song Festival: Persian songs in memory of Iran’s Javidnaman. Nine selected songs will be produced for the album «Azadichords».",
  },
  fa: {
    title: "ارسالِ ترانه — جشنواره‌ی ترانه‌ی آکوردهای آزادی",
    description:
      "بخشِ ویژه‌ی جشنواره‌ی ترانه‌ی آکوردهای آزادی: ترانه‌های فارسی به یادِ جاویدنامانِ ایران. نُه ترانه‌ی برگزیده در آلبومِ «آکوردهای آزادی» منتشر می‌شوند.",
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

export default function SubmissionsPage() {
  return <Submissions />;
}
