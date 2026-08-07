"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";
import SplitReveal from "@/components/SplitReveal";
import type { content } from "@/lib/content";

type Artist = (typeof content)["artists"][number];

export default function ArtistDetail({ artist }: { artist: Artist }) {
  return (
    <section className="bg-ink px-6 py-24 md:px-16 md:py-36">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <motion.div {...reveal}>
          <Placeholder
            caption={artist.imageCaption}
            variant="dark90"
            aspect="4/5"
            className="w-full"
          />
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
          <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
            {artist.role}
          </div>
          <SplitReveal
            as="h2"
            text={artist.name}
            className="m-0 mb-7 font-serif text-[clamp(32px,4.5vw,52px)] font-semibold"
          />
          <p className="m-0 text-[19px] leading-[1.7] text-paper/75">
            {artist.intro}
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
          dangerouslySetInnerHTML={{ __html: artist.bio }}
        />
      </motion.div>

      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.1 }}
        className="mt-12"
      >
        <Link
          href={artist.cta.href}
          className="text-sm tracking-[0.06em] text-gold uppercase transition-colors duration-200 hover:text-paper"
        >
          {artist.cta.label}
        </Link>
      </motion.div>
    </section>
  );
}
