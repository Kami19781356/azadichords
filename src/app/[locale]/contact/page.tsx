import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import type { Locale } from "@/lib/content.types";
import { pageMeta } from "@/lib/seo";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Contact — Azadichords",
    description: "For music, press, or performance inquiries.",
  },
  fa: {
    title: "تماس — آکوردهای آزادی",
    description: "برای درخواست‌های موسیقی، مطبوعات یا اجرا.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/contact");
}

export default function ContactPage() {
  return <Contact />;
}
