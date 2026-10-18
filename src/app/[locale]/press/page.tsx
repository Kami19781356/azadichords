import type { Metadata } from "next";
import Press from "@/components/sections/Press";
import type { Locale } from "@/lib/content.types";
import { pageMeta } from "@/lib/seo";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Press — Azadichords",
    description:
      "Press materials and interviews from Azadichords, an independent music label based in Paris.",
  },
  fa: {
    title: "مطبوعات — آکوردهای آزادی",
    description: "مطالب مطبوعاتی و مصاحبه‌های آکوردهای آزادی، لیبل مستقل موسیقی در پاریس.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/press");
}

export default function PressPage() {
  return <Press />;
}
