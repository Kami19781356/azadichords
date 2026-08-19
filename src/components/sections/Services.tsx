"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { reveal, staggerChild, staggerParent } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";

export default function Services() {
  const content = useContent();
  const locale = useLocale();
  return (
    <section
      id="services"
      className="border-t border-paper/8 bg-ink px-6 py-24 md:px-16 md:py-36"
    >
      <motion.div {...reveal} className="mb-16 max-w-[640px]">
        <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
          {content.services.eyebrow}
        </div>
        <SplitReveal
          as="h2"
          text={content.services.title}
          className="m-0 mb-7 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
        />
        <p className="m-0 text-lg leading-[1.7] text-paper/70">
          {content.services.intro}
        </p>
      </motion.div>

      <motion.div
        {...staggerParent}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {content.services.items.map((service) => (
          <motion.div
            key={service.title}
            {...staggerChild}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded border border-paper/12 p-8"
          >
            <h3 className="m-0 mb-3 font-serif text-xl font-semibold">
              {service.title}
            </h3>
            <p className="m-0 text-[15px] leading-[1.7] text-paper/65">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.15 }}
        className="mt-14"
      >
        <Link
          href={localizeHref(content.services.cta.href, locale)}
          className="text-sm tracking-[0.06em] text-gold uppercase transition-colors duration-200 hover:text-paper"
        >
          {content.services.cta.label}
        </Link>
      </motion.div>
    </section>
  );
}
