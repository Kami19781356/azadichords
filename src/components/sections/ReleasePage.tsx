"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { Spotlight } from "@/components/sections/Music";

// A release's own page (/music/<slug>): the same spotlight block the
// music page shows, with the title as the page heading.
export default function ReleasePage({ slug }: { slug: string }) {
  const content = useContent();
  const locale = useLocale();
  const release = content.releases.find((r) => r.slug === slug);
  if (!release) notFound();
  return (
    <section className="bg-ink px-6 pt-36 pb-24 md:px-16 md:pt-44 md:pb-36">
      <Link
        href={localizeHref("/music", locale)}
        className="mb-12 inline-block text-[13px] tracking-[0.15em] text-gold uppercase transition-colors duration-200 hover:text-paper"
      >
        {locale === "fa" ? "→ همه‌ی ترانه‌ها" : "← All music"}
      </Link>
      <Spotlight release={release} asPage />
    </section>
  );
}
