"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { reveal, staggerParent, staggerChild } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";
import { formatIndex } from "@/lib/formatDate";

const EXTERNAL_RE = /^https?:\/\//i;

export default function Support() {
  const content = useContent();
  const locale = useLocale();
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
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {content.support.ways.map((way, i) => {
          const external = EXTERNAL_RE.test(way.cta.href);
          const href = localizeHref(way.cta.href, locale);
          const linkClass =
            "mt-auto self-start rounded-full border border-gold px-6 py-3 text-[13px] tracking-[0.08em] text-gold uppercase transition-colors duration-200 hover:bg-gold hover:text-ink";
          return (
            <motion.div
              key={way.name}
              {...staggerChild}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded border border-paper/12 p-8"
            >
              <div className="mb-3 text-[13px] tracking-[0.15em] text-gold uppercase">
                {formatIndex(i + 1, locale)}
              </div>
              <h3 className="m-0 mb-4 font-serif text-2xl font-semibold">
                {way.title}
              </h3>
              <p className="m-0 mb-8 text-[15px] leading-[1.7] text-paper/65">
                {way.description}
              </p>
              {external ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {way.cta.label}
                </a>
              ) : (
                <Link href={href} className={linkClass}>
                  {way.cta.label}
                </Link>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.p
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.15 }}
        className="m-0 mt-14 max-w-[620px] border-t border-paper/8 pt-10 text-sm text-paper/50"
      >
        {content.support.transparency}
      </motion.p>
    </section>
  );
}
