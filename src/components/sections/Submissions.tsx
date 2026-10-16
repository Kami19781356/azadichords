"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/lib/ContentProvider";
import { reveal } from "@/lib/motionVariants";
import SplitReveal from "@/components/SplitReveal";
import WaveDivider from "@/components/WaveDivider";

const inputClass =
  "w-full border-0 border-b border-ink/25 bg-transparent px-1 py-3 font-sans text-base text-ink outline-none transition-colors duration-200 placeholder:text-ink/45 focus:border-garnet";

type Status = "idle" | "sending" | "success" | "error";

const TEXT_FIELDS = [
  "artistName",
  "email",
  "songTitle",
  "lyricist",
  "composer",
  "dedication",
  "lyrics",
  "demoUrl",
  "note",
  "website",
] as const;

export default function Submissions() {
  const content = useContent();
  const s = content.submissions;
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, unknown> = {};
    for (const key of TEXT_FIELDS) payload[key] = String(data.get(key) ?? "");
    payload.consentRights = data.get("consentRights") === "on";
    payload.consentAlbum = data.get("consentAlbum") === "on";

    setStatus("sending");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="submissions"
      className="relative bg-paper px-6 pt-24 pb-40 text-ink md:px-16 md:pt-36"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <motion.div {...reveal}>
          <div className="mb-5 text-[13px] tracking-[0.2em] text-garnet uppercase">
            {s.eyebrow}
          </div>
          <SplitReveal
            as="h2"
            text={s.title}
            className="m-0 mb-7 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
          />
          <p className="m-0 mb-8 max-w-[560px] text-lg leading-[1.8] text-ink/80">
            {s.intro}
          </p>
          <ul className="m-0 mb-8 flex list-none flex-col gap-3 p-0">
            {s.guidelines.map((line) => (
              <li
                key={line}
                className="max-w-[540px] border-s-2 border-garnet/40 ps-4 text-[16px] leading-[1.7] text-ink/75"
              >
                {line}
              </li>
            ))}
          </ul>
          <p className="m-0 mb-10 max-w-[540px] rounded bg-ink/[0.06] p-5 text-[15px] leading-[1.7] text-ink/75">
            {s.safetyNote}
          </p>
          <div className="max-w-[540px] border-t border-ink/15 pt-6">
            <p className="m-0 mb-4 text-[15px] leading-[1.7] text-ink/60">
              {s.generalNote}
            </p>
            <a
              href={s.generalCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-[0.06em] text-garnet uppercase transition-colors duration-200 hover:text-ink"
            >
              {s.generalCta.label}
            </a>
          </div>
        </motion.div>

        <motion.form
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded border border-ink/12 bg-white/40 p-6 md:p-10"
        >
          <input type="text" name="artistName" required maxLength={120} placeholder={s.fields.artistName} className={inputClass} />
          <input type="email" name="email" required maxLength={200} dir="ltr" placeholder={s.fields.email} className={`${inputClass} text-start`} />
          <input type="text" name="songTitle" required maxLength={200} placeholder={s.fields.songTitle} className={inputClass} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input type="text" name="lyricist" maxLength={200} placeholder={s.fields.lyricist} className={inputClass} />
            <input type="text" name="composer" maxLength={200} placeholder={s.fields.composer} className={inputClass} />
          </div>
          <input type="text" name="dedication" maxLength={300} placeholder={s.fields.dedication} className={inputClass} />
          <textarea name="lyrics" required rows={9} maxLength={8000} placeholder={s.fields.lyrics} className={`${inputClass} resize-y leading-[1.9]`} />
          <input type="url" name="demoUrl" maxLength={500} dir="ltr" placeholder={s.fields.demoUrl} className={`${inputClass} text-start`} />
          <textarea name="note" rows={3} maxLength={2000} placeholder={s.fields.note} className={`${inputClass} resize-y`} />
          {/* Honeypot: hidden from people, filled by bots. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

          <label className="mt-3 flex items-start gap-3 text-[14px] leading-[1.7] text-ink/75">
            <input type="checkbox" name="consentRights" required className="mt-1.5 h-4 w-4 shrink-0 accent-garnet" />
            <span>{s.consentRights}</span>
          </label>
          <label className="flex items-start gap-3 text-[14px] leading-[1.7] text-ink/75">
            <input type="checkbox" name="consentAlbum" required className="mt-1.5 h-4 w-4 shrink-0 accent-garnet" />
            <span>{s.consentAlbum}</span>
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-4 rounded-full bg-garnet px-4 py-4 text-sm tracking-[0.08em] text-paper uppercase transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-garnet-hover disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {status === "sending" ? s.sending : s.submit}
          </button>
          <div aria-live="polite">
            {status === "success" && (
              <p className="m-0 text-center text-[15px] leading-[1.7] text-garnet">{s.successMessage}</p>
            )}
            {status === "error" && (
              <p className="m-0 text-center text-[15px] leading-[1.7] text-garnet">{s.errorMessage}</p>
            )}
          </div>
        </motion.form>
      </div>

      <WaveDivider fill="var(--color-ink)" />
    </section>
  );
}
