import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Music from "@/components/sections/Music";
import Artists from "@/components/sections/Artists";
import Activity from "@/components/sections/Activity";
import Press from "@/components/sections/Press";
import Services from "@/components/sections/Services";
import Submissions from "@/components/sections/Submissions";
import Support from "@/components/sections/Support";
import Contact from "@/components/sections/Contact";
import type { Locale } from "@/lib/content.types";

const meta: Record<Locale, Metadata> = {
  en: {
    title: "Azadichords — Independent Music Label, Paris",
    description:
      "An independent label for the voice that refuses to be silent.",
  },
  fa: {
    title: "آزادی‌کورد — لیبل مستقل موسیقی، پاریس",
    description: "لیبلی مستقل برای صدایی که حاضر نیست ساکت بماند.",
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
      <Music />
      <Artists />
      <Activity />
      <Press />
      <Services />
      <Submissions />
      <Support />
      <Contact />
    </>
  );
}
