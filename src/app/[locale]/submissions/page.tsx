import type { Metadata } from "next";
import Submissions from "@/components/sections/Submissions";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "For the Next Voice — Submit Your Music — Azadichords",
    description:
      "Azadichords is an independent Persian label reviewing music submissions from artists whose work needed a home beyond permission.",
  },
  fa: {
    title: "برای صدای بعدی — اثرت را ارسال کن — آزادی‌کورد",
    description:
      "آزادی‌کورد لیبلی مستقل و فارسی‌زبان است که آثار هنرمندانی را بررسی می‌کند که کارشان به خانه‌ای فراتر از اجازه نیاز داشت.",
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
