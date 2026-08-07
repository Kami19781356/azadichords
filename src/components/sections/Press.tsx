"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";
import WaveDivider from "@/components/WaveDivider";

export default function Press() {
  return (
    <motion.section
      {...reveal}
      className="relative flex min-h-[60vh] flex-col justify-center bg-paper px-6 py-24 text-ink md:px-16 md:py-36"
    >
      <div className="mb-5 text-[13px] tracking-[0.2em] text-garnet uppercase">
        {content.press.eyebrow}
      </div>
      <SplitReveal
        as="h2"
        text={content.press.title}
        className="m-0 mb-7 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
      />
      {content.press.paragraphs.map((paragraph, i) => (
        <p
          key={paragraph.slice(0, 20)}
          className={`m-0 max-w-[560px] text-[19px] leading-[1.7] text-ink/70 ${
            i === 0 ? "mb-2" : ""
          }`}
        >
          {paragraph}
        </p>
      ))}
      <WaveDivider fill="var(--color-ink)" />
    </motion.section>
  );
}
