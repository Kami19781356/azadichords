"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";
import WaveDivider from "@/components/WaveDivider";

export default function Recognition() {
  return (
    <section
      id="recognition"
      className="relative min-h-[80vh] bg-paper px-6 py-24 text-ink md:px-16 md:py-36"
    >
      <motion.div {...reveal}>
        <div className="mb-5 text-[13px] tracking-[0.2em] text-garnet uppercase">
          {content.recognition.eyebrow}
        </div>
        <SplitReveal
          as="h2"
          text={content.recognition.title}
          className="m-0 mb-14 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
        />
      </motion.div>
      <div className="border-t border-ink/15">
        <div className="grid grid-cols-[2fr_2fr_1fr] border-b border-ink/15 py-5 text-[13px] tracking-[0.08em] text-ink/50 uppercase">
          {content.recognition.columns.map((col) => (
            <div key={col}>{col}</div>
          ))}
        </div>
        {content.recognition.rows.map((row, i) => (
          <motion.div
            key={row.award}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 * (i + 1) }}
            className="grid grid-cols-[2fr_2fr_1fr] border-b border-ink/15 py-7 text-[19px] last:border-b-0"
          >
            <div>{row.award}</div>
            <div className="text-ink/65">{row.category}</div>
            <div>{row.year}</div>
          </motion.div>
        ))}
      </div>
      <WaveDivider fill="var(--color-ink)" />
    </section>
  );
}
