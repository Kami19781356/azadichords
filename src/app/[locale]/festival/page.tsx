import type { Metadata } from "next";
import Festival from "@/components/sections/Festival";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Festival 2027 — Azadichords",
    description:
      "Azadichords Festival, January 8–9, 2027 near Paris: an international competition and live concert for free voices. Free entry for artists.",
  },
  fa: {
    title: "جشنواره ۲۰۲۷ — آزادی‌کورد",
    description:
      "جشنواره‌ی آزادی‌کورد، ۸ و ۹ ژانویه ۲۰۲۷ در نزدیکی پاریس: رقابت بین‌المللی و کنسرت زنده برای صداهای آزاد. ارسال اثر رایگان.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as Locale] ?? meta.en;
  return {
    ...m,
    alternates: {
      canonical: `/${locale}/festival`,
      languages: { en: "/en/festival", fa: "/fa/festival" },
    },
  };
}

export default function FestivalPage() {
  return <Festival />;
}
