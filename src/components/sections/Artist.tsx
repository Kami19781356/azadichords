"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";

export default function Artist() {
  return (
    <section
      id="artist"
      className="grid min-h-screen grid-cols-1 items-center gap-12 border-t border-paper/8 bg-ink px-6 py-24 md:grid-cols-2 md:gap-16 md:px-16 md:py-36"
    >
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
        <h2 className="m-0 mb-7 font-serif text-[clamp(32px,4.5vw,52px)] font-semibold">
          {content.artist.title}
        </h2>
        <p className="m-0 mb-8 text-[19px] leading-[1.7] text-paper/75">
          {content.artist.bio}
        </p>
        <a
          href={content.artist.cta.href}
          className="text-sm tracking-[0.06em] text-gold uppercase transition-colors duration-200 hover:text-paper"
        >
          {content.artist.cta.label}
        </a>
      </motion.div>
    </section>
  );
}
