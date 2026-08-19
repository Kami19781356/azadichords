import type { Metadata } from "next";
import Support from "@/components/sections/Support";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Support the Project — Azadichords",
    description:
      "Azadichords is fully independent. Support brings this music directly to a stage.",
  },
  fa: {
    title: "حمایت از پروژه — آزادی‌کورد",
    description:
      "آزادی‌کورد کاملاً مستقل است. حمایت شما این موسیقی را مستقیم به روی صحنه می‌برد.",
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

export default function SupportPage() {
  return <Support />;
}
