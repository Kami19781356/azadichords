import type { Metadata } from "next";
import Submissions from "@/components/sections/Submissions";
import type { Locale } from "@/lib/content.types";
import { pageMeta } from "@/lib/seo";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Submit a Song — Azadichords Song Festival",
    description:
      "Submit a song to the Azadichords Song Festival: a special section for songs written for the road to freedom, and an international section for songs in any language. Nine winning songs from both sections are produced for one international album, Freedom Chords.",
  },
  fa: {
    title: "ارسالِ ترانه — جشنواره‌ی ترانه‌ی آکوردهای آزادی",
    description:
      "ارسالِ ترانه به جشنواره‌ی ترانه‌ی آکوردهای آزادی: بخشِ ویژه برای ترانه‌های فارسی به یادِ جاویدنامانِ ایران، و بخشِ بین‌المللی برای ترانه به هر زبان. نُه ترانه‌ی برنده از میانِ هر دو بخش در یک آلبومِ بین‌المللی به نامِ «آکوردهای آزادی» (Freedom Chords) منتشر می‌شوند.",
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
