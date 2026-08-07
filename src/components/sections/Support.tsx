"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { content } from "@/lib/content";
import { reveal, staggerChild, staggerParent } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";

export default function Support() {
  return (
    <section className="bg-ink px-6 py-24 md:px-16 md:py-36">
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
        {content.support.tiers.map((tier) => (
          <motion.div
            key={tier.name}
            {...staggerChild}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col rounded border border-paper/12 p-8"
          >
            <div className="mb-3 text-[13px] tracking-[0.15em] text-gold uppercase">
              {tier.name}
            </div>
            <h3 className="m-0 mb-4 font-serif text-2xl font-semibold">
              {tier.title}
            </h3>
            <p className="m-0 mb-4 text-[15px] leading-[1.7] text-paper/65">
              {tier.description}
            </p>
            {"note" in tier && tier.note && (
              <p className="m-0 mt-auto border-t border-paper/12 pt-4 text-[13px] leading-[1.6] text-paper/45">
                {tier.note}
              </p>
            )}
          </motion.div>
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
          className="inline-block rounded-full bg-garnet px-8 py-3.5 text-[13px] tracking-[0.08em] text-paper uppercase transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-garnet-hover"
        >
          {content.support.cta.label}
        </Link>
      </motion.div>
    </section>
  );
}
