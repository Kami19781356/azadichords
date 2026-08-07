"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";
import SplitReveal from "@/components/SplitReveal";
import RecognitionTable from "@/components/RecognitionTable";

export default function Artist() {
  return (
    <section className="bg-ink px-6 py-24 md:px-16 md:py-36">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div {...reveal}>
          <Placeholder
            caption={content.artist.imageCaption}
            variant="dark90"
            aspect="4/5"
            className="w-full"
          />
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
            {content.artist.eyebrow}
          </div>
          <SplitReveal
            as="h2"
            text={content.artist.title}
            className="m-0 mb-7 font-serif text-[clamp(32px,4.5vw,52px)] font-semibold"
          />
          <p className="m-0 text-[19px] leading-[1.7] text-paper/75">
            {content.artist.intro}
          </p>
        </motion.div>
      </div>

      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.2 }}
        className="mt-16 max-w-[720px] border-t border-paper/12 pt-12 md:mt-24"
      >
        <p
          className="m-0 text-lg leading-[1.7] text-paper/70"
          dangerouslySetInnerHTML={{ __html: content.artist.bio }}
        />
      </motion.div>

      <div className="mt-16 md:mt-24">
        <RecognitionTable />
      </div>

      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.1 }}
        className="mt-12"
      >
        <Link
          href={content.artist.cta.href}
          className="text-sm tracking-[0.06em] text-gold uppercase transition-colors duration-200 hover:text-paper"
        >
          {content.artist.cta.label}
        </Link>
      </motion.div>
    </section>
  );
}
