import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Music from "@/components/sections/Music";
import Artists from "@/components/sections/Artists";
import Festival from "@/components/sections/Festival";
import Services from "@/components/sections/Services";
import Submissions from "@/components/sections/Submissions";
import Support from "@/components/sections/Support";
import Contact from "@/components/sections/Contact";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Azadichords — Independent Label & Festival for Free Voices, Paris",
    description:
      "A home for free voices: an independent music label and an international festival. First festival January 8–9, 2027 near Paris.",
  },
  fa: {
    title: "آزادی‌کورد — لیبل و جشنواره‌ی مستقل صداهای آزاد، پاریس",
    description:
      "خانه‌ای برای صداهای آزاد: لیبل مستقل موسیقی و جشنواره‌ای بین‌المللی. نخستین جشنواره ۸ و ۹ ژانویه ۲۰۲۷ در نزدیکی پاریس.",
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
      <Manifesto />
      <Festival compact />
      <Music />
      <Artists />
      <Services />
      <Submissions />
      <Support />
      <Contact />
    </>
  );
}
