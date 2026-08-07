"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { content } from "@/lib/content";
import { reveal, staggerChild, staggerParent } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";
import SplitReveal from "@/components/SplitReveal";

export default function Artists() {
  return (
    <section className="bg-ink px-6 py-24 md:px-16 md:py-36">
      <motion.div {...reveal} className="mb-16 max-w-[640px]">
        <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
          {content.artistsPage.eyebrow}
        </div>
        <SplitReveal
          as="h2"
          text={content.artistsPage.title}
          className="m-0 mb-7 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
        />
        <p className="m-0 text-lg leading-[1.7] text-paper/70">
          {content.artistsPage.intro}
        </p>
      </motion.div>

      <motion.div
        {...staggerParent}
        className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16"
      >
        {content.artists.map((artist) => (
          <motion.div key={artist.slug} {...staggerChild}>
            <Placeholder
              caption={artist.imageCaption}
              variant="dark90"
              aspect="4/5"
              className="mb-6 w-full"
            />
            <div className="mb-2 text-[13px] tracking-[0.15em] text-gold uppercase">
              {artist.role}
            </div>
            <h3 className="m-0 mb-4 font-serif text-2xl font-semibold">
              {artist.name}
            </h3>
            <p className="m-0 mb-5 text-base leading-[1.7] text-paper/65">
              {artist.intro}
            </p>
            <Link
              href={`/artists/${artist.slug}`}
              className="text-sm tracking-[0.06em] text-gold uppercase transition-colors duration-200 hover:text-paper"
            >
              {content.artistsPage.viewProfile}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
