import type { Metadata } from "next";
import Services from "@/components/sections/Services";
import type { Locale } from "@/lib/content.types";
import { pageMeta } from "@/lib/seo";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "What the Label Offers — Azadichords",
    description:
      "Production, distribution, visual identity, live performance, and licensing support for the artists Azadichords works with.",
  },
  fa: {
    title: "آنچه لیبل ارائه می‌دهد — آکوردهای آزادی",
    description:
      "پشتیبانیِ تولید، توزیع، هویت بصری، اجرای زنده و لایسنس برای هنرمندانی که با آکوردهای آزادی کار می‌کنند.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(meta[locale as Locale] ?? meta.en, locale, "/services");
}

export default function ServicesPage() {
  return <Services />;
}
