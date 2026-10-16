import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Music from "@/components/sections/Music";
import Festival from "@/components/sections/Festival";
import Support from "@/components/sections/Support";
import Contact from "@/components/sections/Contact";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Azadichords — Independent Label & Song Festival, Paris",
    description:
      "A home for free voices: an independent label and a song festival. New single «Golouleh» out now. Festival January 8–9, 2027 in Paris.",
  },
  fa: {
    title: "آکوردهای آزادی — لیبل و جشنواره‌ی ترانه، پاریس",
    description:
      "خانه‌ای برای صداهای آزاد: لیبلی مستقل و جشنواره‌ی ترانه. «گلوله» منتشر شد و دانلودش برای مخاطبانِ داخلِ ایران رایگان است.",
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

export default function Home() {
  return (
    <>
      <Hero />
      <Music />
      <Festival compact />
      <Manifesto />
      <Support />
      <Contact />
    </>
  );
}
