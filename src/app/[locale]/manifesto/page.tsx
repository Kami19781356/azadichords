import type { Metadata } from "next";
import Manifesto from "@/components/sections/Manifesto";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Our Story — Azadichords",
    description:
      "Azadichords began with an album that needed a home beyond permission. This is why we exist.",
  },
  fa: {
    title: "مانیفست — آزادی‌کورد",
    description:
      "آزادی‌کورد با آلبومی شروع شد که به خانه‌ای فراتر از اجازه نیاز داشت. برای همین وجود داریم.",
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

export default function ManifestoPage() {
  return <Manifesto />;
}
