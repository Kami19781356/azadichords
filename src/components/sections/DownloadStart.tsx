"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { reveal, staggerParent, staggerChild } from "@/lib/motionVariants";

function fileName(url: string) {
  return url.split("/").pop() || "download.mp3";
}

export default function DownloadStart({ slug }: { slug: string }) {
  const content = useContent();
  const locale = useLocale();
  const release = content.releases.find((r) => r.slug === slug);
  const d = content.download;
  const started = useRef(false);
  const url = release?.downloadUrl ?? "";
  // Goes through the counter, which redirects to the file.
  const href = url ? `/api/dl/${slug}` : "";

  // Start the download once, as soon as the page opens.
  useEffect(() => {
    if (!url || started.current) return;
    started.current = true;
    const a = document.createElement("a");
    a.href = href;
    a.download = fileName(url);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [url, href]);

  if (!release) return null;

  return (
    <section className="flex min-h-screen flex-col gap-20 bg-ink px-6 pt-36 pb-24 md:px-16">
      <motion.div {...reveal} className="max-w-[680px]">
        <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
          {d.eyebrow} · «{release.title}»
        </div>
        <h1 className="m-0 mb-6 font-serif text-[clamp(34px,5vw,60px)] font-semibold">
          {url ? d.title : release.title}
        </h1>
        <p className="m-0 mb-8 text-lg leading-[1.8] text-paper/70">
          {url ? d.body : d.unavailable}
        </p>
        {url && (
          <a
            href={href}
            download={fileName(url)}
            className="inline-flex items-center gap-2.5 rounded-full border border-paper px-8 py-4 text-sm tracking-[0.06em] text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
          >
            <span aria-hidden>↓</span>
            {d.buttonLabel}
          </a>
        )}
      </motion.div>

      <motion.div {...reveal} className="border-t border-paper/10 pt-14">
        <h2 className="m-0 mb-4 max-w-[720px] font-serif text-[clamp(26px,3.4vw,40px)] leading-[1.3] font-semibold">
          {d.supportTitle}
        </h2>
        <p className="m-0 mb-10 max-w-[640px] text-lg leading-[1.8] text-paper/65">
          {d.supportIntro}
        </p>
        <motion.div
          {...staggerParent}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {d.paths.map((p) => (
            <motion.div
              key={p.title}
              {...staggerChild}
              className="flex flex-col gap-4 rounded border border-paper/12 p-8"
            >
              <h3 className="m-0 font-serif text-2xl font-semibold text-gold">
                {p.title}
              </h3>
              <p className="m-0 mb-4 text-[16px] leading-[1.8] text-paper/70">
                {p.description}
              </p>
              <Link
                href={localizeHref(p.cta.href, locale)}
                className="mt-auto self-start rounded-full border border-gold px-6 py-3 text-[13px] tracking-[0.06em] text-gold transition-colors duration-200 hover:bg-gold hover:text-ink"
              >
                {p.cta.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
