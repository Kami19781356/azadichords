"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";
import SplitReveal from "@/components/SplitReveal";
import WaveDivider from "@/components/WaveDivider";

export default function Manifesto() {
  const content = useContent();
  const locale = useLocale();
  return (
    <section
      id="manifesto"
      className="relative grid min-h-screen grid-cols-1 bg-paper text-ink md:grid-cols-2"
    >
      <div className="sticky top-0 hidden h-screen md:block">
        <Placeholder
          caption={content.manifesto.imageCaption}
          variant="warm"
          rounded={false}
          className="h-full w-full"
        />
      </div>
      <div className="block md:hidden">
        <Placeholder
          caption={content.manifesto.imageCaption}
          variant="warm"
          rounded={false}
          aspect="4/3"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-8 px-6 py-24 md:px-16 md:py-36">
        <motion.div {...reveal}>
          <div className="mb-5 text-[13px] tracking-[0.2em] text-garnet uppercase">
            {content.manifesto.eyebrow}
          </div>
          <SplitReveal
            as="h2"
            text={content.manifesto.title}
            className="m-0 font-serif text-[clamp(36px,5vw,56px)] leading-[1.05] font-semibold"
          />
        </motion.div>
        {content.manifesto.paragraphs.map((paragraph, i) => (
          <motion.p
            key={paragraph.slice(0, 20)}
            {...reveal}
            transition={{ ...reveal.transition, delay: (0.08 * (i + 1)) }}
            className="m-0 text-lg leading-[1.7] text-ink/80"
          >
            {paragraph}
          </motion.p>
        ))}
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.42 }}
          className="mt-6 flex flex-col gap-5 border-t border-ink/15 pt-8"
        >
          <p className="m-0 text-lg leading-[1.7] text-ink/80">
            {content.manifesto.closing}
          </p>
          <Link
            href={localizeHref(content.manifesto.cta.href, locale)}
            className="text-sm tracking-[0.06em] text-garnet uppercase transition-colors duration-200 hover:text-ink"
          >
            {content.manifesto.cta.label}
          </Link>
        </motion.div>
      </div>
      <WaveDivider fill="var(--color-ink)" />
    </section>
  );
}
