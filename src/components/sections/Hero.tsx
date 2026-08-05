"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "@/lib/content";
import { easeCustom } from "@/lib/motionVariants";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const step = (translate: number, delayMs: number) => {
    const distance = prefersReducedMotion ? 0 : translate;
    return {
      initial: { opacity: 0, y: distance },
      animate: mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
      transition: { duration: 0.8, ease: easeCustom, delay: delayMs / 1000 },
    };
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(122,31,43,0.25), transparent 60%)",
        }}
      />
      <div className="relative">
        <motion.div
          {...step(16, 0)}
          className="mb-7 text-[13px] tracking-[0.2em] text-gold uppercase"
        >
          {content.hero.eyebrow}
        </motion.div>
        <motion.h1
          {...step(24, 120)}
          className="m-0 mb-8 font-serif text-[clamp(64px,12vw,168px)] leading-[0.95] font-bold tracking-[-0.01em]"
        >
          {content.hero.title}
        </motion.h1>
        <motion.p
          {...step(20, 260)}
          className="mx-auto mb-12 max-w-[640px] text-[clamp(18px,2vw,26px)] font-light text-paper/75"
        >
          {content.hero.subhead}
        </motion.p>
        <motion.div
          {...step(16, 380)}
          className="flex flex-wrap justify-center gap-5"
        >
          <a
            href={content.hero.ctaPrimary.href}
            className="rounded-full border border-paper px-9 py-4 text-sm tracking-[0.08em] text-paper uppercase transition-colors duration-[250ms] hover:bg-paper hover:text-ink"
          >
            {content.hero.ctaPrimary.label}
          </a>
          <a
            href={content.hero.ctaSecondary.href}
            className="rounded-full border border-transparent px-9 py-4 text-sm tracking-[0.08em] text-gold uppercase transition-colors duration-[250ms] hover:text-paper"
          >
            {content.hero.ctaSecondary.label}
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-10 text-xs tracking-[0.1em] text-paper/40">
        {content.hero.scrollHint}
      </div>
    </section>
  );
}
