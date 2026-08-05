"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";

export default function Music() {
  return (
    <section
      id="music"
      className="flex min-h-screen flex-col gap-14 bg-ink px-6 py-24 md:px-16 md:py-36"
    >
      <motion.div {...reveal}>
        <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
          {content.music.eyebrow}
        </div>
        <h2 className="m-0 font-serif text-[clamp(36px,5vw,64px)] font-semibold">
          {content.music.title}
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
        >
          <Placeholder
            caption={content.music.imageCaption}
            variant="dark45"
            aspect="1/1"
            className="w-full"
          />
        </motion.div>
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.2 }}
        >
          <p className="m-0 mb-6 text-xl leading-[1.6] text-paper/85">
            {content.music.forthcoming}
          </p>
          <p
            className="m-0 mb-6 text-lg leading-[1.7] text-paper/65"
            dangerouslySetInnerHTML={{ __html: content.music.revisit }}
          />
          <a
            href={content.music.cta.href}
            className="mb-6 inline-block rounded-full border border-gold px-8 py-3.5 text-[13px] tracking-[0.08em] text-gold uppercase transition-colors duration-[250ms] hover:bg-gold hover:text-ink"
          >
            {content.music.cta.label}
          </a>
          <p className="m-0 text-sm tracking-[0.05em] text-paper/40">
            {content.music.soon}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
