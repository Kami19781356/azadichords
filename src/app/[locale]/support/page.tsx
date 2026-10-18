import type { Metadata } from "next";
import Support from "@/components/sections/Support";
import type { Locale } from "@/lib/content.types";
import { pageMeta } from "@/lib/seo";

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
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/support");
}

export default function SupportPage() {
  return <Support />;
}
