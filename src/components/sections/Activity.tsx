"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { reveal } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";

export default function Activity() {
  const content = useContent();
  const locale = useLocale();
  return (
    <section
      id="activity"
      className="min-h-[60vh] bg-paper px-6 py-24 text-ink md:px-16 md:py-36"
    >
      <motion.div {...reveal} className="max-w-[640px]">
        <div className="mb-5 text-[13px] tracking-[0.2em] text-garnet uppercase">
          {content.activityPage.eyebrow}
        </div>
        <SplitReveal
          as="h2"
          text={content.activityPage.title}
          className="m-0 mb-7 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
        />
        <p className="m-0 text-lg leading-[1.7] text-ink/80">
          {content.activityPage.intro}
        </p>
      </motion.div>

      {content.activity.length > 0 ? (
        <div className="mt-16 border-t border-ink/15">
          {content.activity.map((item, i) => (
            <motion.div
              key={item.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 * (i + 1) }}
              className="grid grid-cols-1 gap-2 border-b border-ink/15 py-7 md:grid-cols-[120px_1fr]"
            >
              <div className="text-sm tracking-[0.05em] text-ink/50">
                {item.date}
              </div>
              <div>
                <h3 className="m-0 mb-1 font-serif text-xl font-semibold">
                  {item.link ? (
                    <a
                      href={localizeHref(item.link ?? "", locale)}
                      className="transition-colors duration-200 hover:text-garnet"
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="m-0 text-[15px] leading-[1.6] text-ink/70">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          className="mt-10 max-w-[520px] text-[15px] leading-[1.7] text-ink/50"
        >
          {content.activityPage.emptyStateNote}
        </motion.p>
      )}
    </section>
  );
}
