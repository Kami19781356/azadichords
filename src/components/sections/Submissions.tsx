"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";
import WaveDivider from "@/components/WaveDivider";

export default function Submissions() {
  return (
    <section
      id="submissions"
      className="relative min-h-[70vh] bg-paper px-6 py-24 text-ink md:px-16 md:py-36"
    >
      <motion.div {...reveal} className="max-w-[640px]">
        <div className="mb-5 text-[13px] tracking-[0.2em] text-garnet uppercase">
          {content.submissions.eyebrow}
        </div>
        <SplitReveal
          as="h2"
          text={content.submissions.title}
          className="m-0 mb-7 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
        />
        <p className="m-0 mb-10 text-lg leading-[1.7] text-ink/80">
          {content.submissions.intro}
        </p>
      </motion.div>

      <motion.ul
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.1 }}
        className="m-0 mb-8 flex list-none flex-col gap-3 p-0"
      >
        {content.submissions.guidelines.map((line) => (
          <li
            key={line}
            className="max-w-[560px] border-l-2 border-garnet/40 pl-4 text-[17px] leading-[1.6] text-ink/75"
          >
            {line}
          </li>
        ))}
      </motion.ul>

      <motion.p
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.2 }}
        className="m-0 mb-10 max-w-[520px] text-sm leading-[1.6] text-ink/50"
      >
        {content.submissions.note}
      </motion.p>

      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.25 }}>
        <a
          href={content.submissions.cta.href}
          className="inline-block rounded-full bg-garnet px-8 py-3.5 text-[13px] tracking-[0.08em] text-paper uppercase transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-garnet-hover"
        >
          {content.submissions.cta.label}
        </a>
      </motion.div>

      <WaveDivider fill="var(--color-ink)" />
    </section>
  );
}
