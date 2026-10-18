"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { reveal, staggerParent, staggerChild } from "@/lib/motionVariants";
import { formatDateRange, formatDayMonth } from "@/lib/formatDate";
import { cn } from "@/lib/cn";
import SplitReveal from "@/components/SplitReveal";

const EXTERNAL_RE = /^https?:\/\//i;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 text-[13px] tracking-[0.15em] text-paper/40 uppercase">
      {children}
    </div>
  );
}

function Cta() {
  const content = useContent();
  const locale = useLocale();
  const { cta, ctaNote } = content.festival;
  const external = EXTERNAL_RE.test(cta.href);
  const className =
    "inline-flex rounded-full bg-garnet px-8 py-4 text-[13px] tracking-[0.08em] text-paper uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-garnet-hover";
  return (
    <div className="flex flex-col items-start gap-3">
      {external ? (
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {cta.label}
        </a>
      ) : (
        <Link href={localizeHref(cta.href, locale)} className={className}>
          {cta.label}
        </Link>
      )}
      {content.festival.entryFee && (
        <p className="m-0 rounded-full border border-gold/50 px-4 py-1.5 text-sm text-gold">
          {content.festival.entryFee}
        </p>
      )}
      {ctaNote && <p className="m-0 text-sm text-paper/50">{ctaNote}</p>}
    </div>
  );
}

function KeyDates() {
  const content = useContent();
  const locale = useLocale();
  const { dates, datesTitle } = content.festival;
  return (
    <motion.div {...reveal}>
      <SectionLabel>{datesTitle}</SectionLabel>
      <motion.ol
        {...staggerParent}
        className="m-0 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-4"
      >
        {dates.map((d) => (
          <motion.li
            key={d.date + d.label}
            {...staggerChild}
            className={cn(
              "relative flex gap-4 border-s py-4 ps-5 md:flex-col md:gap-2 md:border-s-0 md:border-t md:ps-0 md:pe-6 md:pt-6",
              d.highlight ? "border-gold" : "border-paper/15",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute -start-[5px] top-[22px] h-[9px] w-[9px] rounded-full md:start-0 md:-top-[5px]",
                d.highlight ? "bg-gold" : "bg-paper/30",
              )}
            />
            <span
              suppressHydrationWarning
              className={cn(
                "min-w-[140px] font-serif text-lg font-semibold md:min-w-0",
                d.highlight ? "text-gold" : "text-paper",
              )}
            >
              {formatDateRange(d.date, d.endDate, locale)}
            </span>
            <span
              className={cn(
                "text-[15px]",
                d.highlight ? "text-paper" : "text-paper/60",
              )}
            >
              {d.label}
            </span>
          </motion.li>
        ))}
      </motion.ol>
      {content.festival.datesNote && (
        <p className="m-0 mt-6 text-sm text-paper/45">{content.festival.datesNote}</p>
      )}
    </motion.div>
  );
}

function SectionLink({ href, label, primary }: { href: string; label: string; primary: boolean }) {
  const locale = useLocale();
  const className = cn(
    "mt-auto self-start rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] uppercase transition-all duration-200 hover:-translate-y-0.5",
    primary
      ? "bg-garnet text-paper hover:bg-garnet-hover"
      : "border border-gold text-gold hover:bg-gold hover:text-ink",
  );
  if (EXTERNAL_RE.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={localizeHref(href, locale)} className={className}>
      {label}
    </Link>
  );
}

function Sections() {
  const content = useContent();
  const { sections, sectionsTitle } = content.festival;
  return (
    <motion.div {...reveal}>
      <SectionLabel>{sectionsTitle}</SectionLabel>
      <motion.div
        {...staggerParent}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {sections.map((s) => (
          <motion.div
            key={s.title}
            {...staggerChild}
            className={cn(
              "flex flex-col gap-5 rounded border p-8 md:p-10",
              s.highlight
                ? "border-gold/50 bg-garnet/10"
                : "border-paper/12 bg-ink",
            )}
          >
            <span className="text-[13px] tracking-[0.15em] text-gold uppercase">
              {s.label}
            </span>
            <h3 className="m-0 font-serif text-[clamp(24px,2.6vw,32px)] leading-[1.25] font-semibold">
              {s.title}
            </h3>
            <p className="m-0 text-[16px] leading-[1.7] text-paper/70">
              {s.description}
            </p>
            {s.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-paper/20 px-3 py-1 text-[13px] text-paper/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <ul className="m-0 mb-3 flex list-none flex-col gap-2.5 p-0">
              {s.points.map((point) => (
                <li
                  key={point}
                  className="border-s-2 border-gold/40 ps-4 text-[15px] leading-[1.6] text-paper/70"
                >
                  {point}
                </li>
              ))}
            </ul>
            <SectionLink href={s.cta.href} label={s.cta.label} primary={s.highlight} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

function Programme() {
  const content = useContent();
  const locale = useLocale();
  const f = content.festival;
  return (
    <motion.div {...reveal}>
      <SectionLabel>{f.programmeTitle}</SectionLabel>
      <div className="grid grid-cols-1 gap-x-20 md:grid-cols-2">
        {f.programme.map((p) => (
          <div
            key={p.date + p.title}
            className="flex flex-col gap-2 border-t border-paper/12 py-6"
          >
            <span
              suppressHydrationWarning
              className="text-[13px] tracking-[0.12em] text-gold uppercase"
            >
              {formatDayMonth(p.date, locale)}
            </span>
            <h3 className="m-0 font-serif text-2xl font-semibold">{p.title}</h3>
            <p className="m-0 text-[15px] leading-[1.7] text-paper/60">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function JuryAndVenue() {
  const content = useContent();
  const f = content.festival;
  return (
    <motion.div
      {...reveal}
      className="grid grid-cols-1 gap-10 border-t border-paper/8 pt-12 md:grid-cols-2 md:gap-20"
    >
      <div>
        <SectionLabel>{f.juryTitle}</SectionLabel>
        <p className="m-0 text-lg leading-[1.7] text-paper/70">{f.juryText}</p>
      </div>
      <div>
        <SectionLabel>{f.venueTitle}</SectionLabel>
        <p className="m-0 text-lg leading-[1.7] text-paper/70">
          {f.venueText}
        </p>
      </div>
    </motion.div>
  );
}

// `compact` is the home-page teaser: header, key dates and CTA, plus a
// link through to the full festival page.
export default function Festival({ compact = false }: { compact?: boolean }) {
  const content = useContent();
  const locale = useLocale();
  const f = content.festival;

  return (
    <section
      id="festival"
      className="relative flex flex-col gap-20 overflow-hidden border-t border-paper/8 bg-ink px-6 py-24 md:px-16 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 85% 0%, rgba(122,31,43,0.28), transparent 55%)",
        }}
      />
      <motion.div {...reveal} className="relative max-w-[760px]">
        <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
          {f.eyebrow}
        </div>
        <SplitReveal
          as="h2"
          text={f.title}
          className="m-0 mb-8 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
        />
        {f.intro.map((paragraph, i) => (
          <p
            key={paragraph.slice(0, 20)}
            className={cn(
              "m-0 text-lg leading-[1.7]",
              i === 0 ? "text-xl text-paper/85" : "text-paper/65",
              i < f.intro.length - 1 && "mb-4",
            )}
          >
            {paragraph}
          </p>
        ))}
        <div className="mt-10">
          <Cta />
        </div>
      </motion.div>

      <div className="relative flex flex-col gap-20">
        <Sections />
        <KeyDates />
        {compact ? (
          <motion.div {...reveal}>
            <Link
              href={localizeHref("/festival", locale)}
              className="text-sm tracking-[0.06em] text-gold uppercase transition-colors duration-200 hover:text-paper"
            >
              {f.detailsLabel}
            </Link>
          </motion.div>
        ) : (
          <>
            <Programme />
            <JuryAndVenue />
          </>
        )}
      </div>
    </section>
  );
}
