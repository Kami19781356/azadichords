import type { Metadata } from "next";
import Submissions from "@/components/sections/Submissions";
import type { Locale } from "@/lib/content.types";
import { pageMeta } from "@/lib/seo";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Submit a Song — Azadichords Song Festival",
    description:
      "Submit a song to the Azadichords Song Festival: a special section for Persian songs in memory of Iran’s Javidnaman, and an international section for songs in any language. Nine songs from each section are produced for an Azadichords album.",
  },
  fa: {
    title: "ارسالِ ترانه — جشنواره‌ی ترانه‌ی آکوردهای آزادی",
    description:
      "ارسالِ ترانه به جشنواره‌ی ترانه‌ی آکوردهای آزادی: بخشِ ویژه برای ترانه‌های فارسی به یادِ جاویدنامانِ ایران، و بخشِ بین‌المللی برای ترانه به هر زبان. از هر بخش نُه ترانه‌ی برگزیده در یک آلبومِ آکوردهای آزادی منتشر می‌شوند.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/submissions");
}

export default function SubmissionsPage() {
  return <Submissions />;
}
