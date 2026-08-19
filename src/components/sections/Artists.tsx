"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";
import SplitReveal from "@/components/SplitReveal";
import VideoPlayer from "@/components/VideoPlayer";

export default function Artists() {
  const content = useContent();
  const locale = useLocale();
  return (
    <section
      id="artists"
      className="border-t border-paper/8 bg-ink px-6 py-24 md:px-16 md:py-36"
    >
      <motion.div {...reveal} className="mb-20 max-w-[640px]">
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

      <div className="flex flex-col gap-24">
        {content.artists.map((artist) => (
          <div key={artist.slug} id={artist.slug}>
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <motion.div {...reveal}>
                <Placeholder
                  caption={artist.imageCaption}
                  variant="dark90"
                  aspect="4/5"
                  className="w-full"
                />
              </motion.div>
              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.15 }}
              >
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="text-[13px] tracking-[0.2em] text-gold uppercase">
                    {artist.role}
                  </span>
                  {artist.badge && (
                    <span className="rounded-full border border-gold/60 px-3 py-1 text-[11px] tracking-[0.1em] text-gold uppercase">
                      {artist.badge}
                    </span>
                  )}
                </div>
                <SplitReveal
                  as="h3"
                  text={artist.name}
                  className="m-0 mb-7 font-serif text-[clamp(28px,4vw,44px)] font-semibold"
                />
                <p className="m-0 text-[19px] leading-[1.7] text-paper/75">
                  {artist.intro}
                </p>
              </motion.div>
            </div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.2 }}
              className="mt-16 max-w-[720px] border-t border-paper/12 pt-12"
            >
              <p
                className="m-0 text-lg leading-[1.7] text-paper/70"
                dangerouslySetInnerHTML={{ __html: artist.bio }}
              />
            </motion.div>

            {artist.priorWork && (
              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.22 }}
                className="mt-16 max-w-[720px] border-t border-paper/12 pt-12"
              >
                <div className="mb-4 text-[13px] tracking-[0.15em] text-gold uppercase">
                  Before Azadichords
                </div>
                <h4 className="m-0 mb-3 font-serif text-xl font-semibold">
                  {artist.priorWork.title}
                </h4>
                <p
                  className="m-0 mb-6 text-base leading-[1.7] text-paper/65"
                  dangerouslySetInnerHTML={{ __html: artist.priorWork.description }}
                />
                {artist.priorWork.videoUrl && (
                  <VideoPlayer
                    src={artist.priorWork.videoUrl}
                    caption={artist.priorWork.title}
                  />
                )}
              </motion.div>
            )}

            {artist.recognition.length > 0 && (
              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.25 }}
                className="mt-16 max-w-[720px]"
              >
                <div className="mb-6 text-[13px] tracking-[0.15em] text-gold uppercase">
                  Recognition
                </div>
                <div className="border-t border-paper/15">
                  {artist.recognition.map((item) => (
                    <div
                      key={`${item.award}-${item.category}`}
                      className="grid grid-cols-1 gap-1 border-b border-paper/15 py-4 md:grid-cols-[2fr_1fr] md:items-baseline"
                    >
                      <div>
                        <span className="text-[15px] text-paper/85">
                          {item.award}
                        </span>
                        <span className="ms-2 text-[15px] text-paper/50">
                          — {item.category}
                        </span>
                      </div>
                      <div className="text-sm text-paper/40">{item.year}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="mt-12"
            >
              <Link
                href={localizeHref(artist.cta.href, locale)}
                className="text-sm tracking-[0.06em] text-gold uppercase transition-colors duration-200 hover:text-paper"
              >
                {artist.cta.label}
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
