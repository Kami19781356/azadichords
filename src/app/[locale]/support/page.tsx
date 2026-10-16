import type { Metadata } from "next";
import Support from "@/components/sections/Support";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Support — Azadichords",
    description:
      "Azadichords is fully independent. Own the work, share the music, come to the festival, or partner with us.",
  },
  fa: {
    title: "حمایت — آکوردهای آزادی",
    description:
      "آکوردهای آزادی کاملاً مستقل است. آثار را تهیه کنید، موسیقی را به اشتراک بگذارید، به جشنواره بیایید یا همراهِ ما شوید.",
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
