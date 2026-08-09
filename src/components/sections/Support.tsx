"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { content } from "@/lib/content";
import { reveal, staggerParent } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";
import SupportTierCard from "@/components/SupportTierCard";

export default function Support() {
  return (
    <section
      id="support"
      className="border-t border-paper/8 bg-ink px-6 py-24 md:px-16 md:py-36"
    >
      <motion.div {...reveal} className="mb-14 max-w-[720px]">
        <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
          {content.support.eyebrow}
        </div>
        <SplitReveal
          as="h2"
          text={content.support.title}
          className="m-0 mb-8 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
        />
        {content.support.intro.map((paragraph, i) => (
          <p
            key={paragraph.slice(0, 20)}
            className={`m-0 text-lg leading-[1.7] text-paper/70 ${
              i < content.support.intro.length - 1 ? "mb-4" : ""
            }`}
          >
            {paragraph}
          </p>
        ))}
      </motion.div>

      <motion.div
        {...staggerParent}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {content.support.tiers.map((tier, i) => (
          <SupportTierCard key={tier.name} tier={tier} index={i} />
        ))}
      </motion.div>

      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.15 }}
        className="mt-14 flex flex-col items-start gap-6 border-t border-paper/8 pt-10 md:flex-row md:items-center md:justify-between"
      >
        <p className="m-0 max-w-[520px] text-sm text-paper/50">
          {content.support.transparency}
        </p>
        <Link
          href={content.support.cta.href}
          className="text-sm tracking-[0.06em] text-gold uppercase transition-colors duration-200 hover:text-paper"
        >
          {content.support.cta.label}
        </Link>
      </motion.div>
    </section>
  );
}
