import type { Metadata } from "next";
import Services from "@/components/sections/Services";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "What the Label Offers — Azadichords",
    description:
      "Production, distribution, visual identity, live performance, and licensing support for the artists Azadichords works with.",
  },
  fa: {
    title: "آنچه لیبل ارائه می‌دهد — آزادی‌کورد",
    description:
      "پشتیبانیِ تولید، توزیع، هویت بصری، اجرای زنده و لایسنس برای هنرمندانی که با آزادی‌کورد کار می‌کنند.",
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

export default function ServicesPage() {
  return <Services />;
}
