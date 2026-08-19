import type { Metadata } from "next";
import Press from "@/components/sections/Press";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Press — Azadichords",
    description:
      "Press materials and interviews from Azadichords, an independent music label based in Paris.",
  },
  fa: {
    title: "مطبوعات — آزادی‌کورد",
    description: "مطالب مطبوعاتی و مصاحبه‌های آزادی‌کورد، لیبل مستقل موسیقی در پاریس.",
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

export default function PressPage() {
  return <Press />;
}
