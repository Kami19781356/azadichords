"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";

export default function Films() {
  return (
    <section
      id="films"
      className="flex min-h-screen flex-col gap-14 border-t border-paper/8 bg-ink px-6 py-24 md:px-16 md:py-36"
    >
      <motion.div {...reveal}>
        <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
          {content.films.eyebrow}
        </div>
        <h2 className="m-0 font-serif text-[clamp(36px,5vw,64px)] font-semibold">
          {content.films.title}
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
        >
          <Placeholder
            caption={content.films.imageCaption}
            variant="dark135"
            aspect="16/10"
            className="w-full"
          />
        </motion.div>
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.2 }}
          className="flex flex-col justify-center gap-4"
        >
          <h3 className="m-0 font-serif text-[26px]">{content.films.filmTitle}</h3>
          <p className="m-0 text-base tracking-[0.03em] text-gold">
            {content.films.award}
          </p>
          <p className="mt-2 mb-0 text-[15px] text-paper/50">{content.films.soon}</p>
        </motion.div>
      </div>
    </section>
  );
}
