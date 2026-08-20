"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { easeCustom, preloaderDurationMs } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";
import AudioPlayer from "@/components/AudioPlayer";

export default function Hero() {
  const content = useContent();
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [listenOpen, setListenOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  // content.releases is sorted newest-first, so [0] is always the
  // release the Hero's inline player should feature.
  const latestRelease = content.releases[0] ?? null;

  useEffect(() => {
    const base = prefersReducedMotion ? 60 : preloaderDurationMs - 200;
    const t = setTimeout(() => setMounted(true), base);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-28 text-center sm:px-6"
    >
      <video
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        src="/video/hero-bg.mp4"
        poster="/video/hero-bg-poster.jpg"
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        src="/video/hero-bg-mobile.mp4"
        poster="/video/hero-bg-mobile-poster.jpg"
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-ink/65" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(122,31,43,0.35), transparent 60%)",
        }}
      />
      <div className="relative">
        <motion.div
          {...step(16, 0)}
          className="mb-7 text-[13px] tracking-[0.2em] text-gold uppercase"
        >
          {content.hero.eyebrow}
        </motion.div>
        <h1
          dir="ltr"
          className="m-0 mb-8 font-serif text-[clamp(32px,11vw,168px)] leading-[0.95] font-bold tracking-[-0.01em] whitespace-nowrap"
        >
          <SplitReveal
            text={content.hero.title}
            mode="letter"
            triggerOnMount
            active={mounted}
            stagger={0.035}
            delayChildren={0.12}
          />
        </h1>
        <motion.p
          {...step(20, 260)}
          className="mx-auto mb-8 max-w-[640px] text-[clamp(18px,2vw,26px)] font-light text-paper/75"
        >
          {content.hero.subhead}
        </motion.p>
        <motion.div
          {...step(16, 380)}
          className="flex flex-wrap justify-center gap-5"
        >
          <span className="relative inline-flex">
            {!prefersReducedMotion && !listenOpen && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border border-gold"
                animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
            <button
              type="button"
              onClick={() => setListenOpen((v) => !v)}
              aria-expanded={listenOpen}
              className="relative rounded-full border border-paper px-9 py-4 text-sm tracking-[0.08em] text-paper uppercase transition-colors duration-[250ms] hover:bg-paper hover:text-ink"
            >
              {content.hero.ctaPrimary.label}
            </button>
          </span>
          <Link
            href={localizeHref(content.hero.ctaSecondary.href, locale)}
            className="rounded-full border border-transparent px-9 py-4 text-sm tracking-[0.08em] text-gold uppercase transition-colors duration-[250ms] hover:text-paper"
          >
            {content.hero.ctaSecondary.label}
          </Link>
        </motion.div>

        <AnimatePresence>
          {listenOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 28 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: easeCustom }}
              className="mx-auto w-full max-w-[420px] overflow-hidden"
            >
              <div className="rounded-full border border-paper/20 bg-ink/40 px-6 py-4 backdrop-blur-sm">
                {latestRelease?.demoAudioUrl ? (
                  <AudioPlayer
                    src={latestRelease.demoAudioUrl}
                    title={latestRelease.title}
                  />
                ) : (
                  <p className="m-0 text-sm text-paper/60">
                    {latestRelease
                      ? `"${latestRelease.title}" — ${latestRelease.tagline}`
                      : content.music.demoComingSoonLabel}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div {...step(12, 460)} className="mt-10 flex justify-center">
          <Link
            href={localizeHref(content.hero.promoBar.href, locale)}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-[13px] tracking-[0.02em] text-paper/90 transition-colors duration-200 hover:border-gold hover:bg-gold/15 hover:text-paper"
          >
            <motion.span
              className="inline-block text-xl leading-none"
              animate={
                prefersReducedMotion
                  ? undefined
                  : { rotate: [0, -14, 10, -8, 0] }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 2.4,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "50% 0%" }}
            >
              🎟
            </motion.span>
            <span>{content.hero.promoBar.label}</span>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-10 text-xs tracking-[0.1em] text-paper/40">
        {content.hero.scrollHint}
      </div>
    </section>
  );
}
