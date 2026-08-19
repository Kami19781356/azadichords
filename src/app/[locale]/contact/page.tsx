import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Contact — Azadichords",
    description: "For music, press, or performance inquiries.",
  },
  fa: {
    title: "تماس — آزادی‌کورد",
    description: "برای درخواست‌های موسیقی، مطبوعات یا اجرا.",
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

export default function ContactPage() {
  return <Contact />;
}
