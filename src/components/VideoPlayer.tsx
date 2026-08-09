"use client";

import { useEffect, useRef, useState } from "react";

// Accepts a Cloudflare Stream iframe embed URL (e.g.
// https://customer-XXXX.cloudflarestream.com/<uid>/iframe) — paste it
// into the album's musicVideoUrl field in the CMS. Autoplay-muted
// only starts once the player has actually scrolled into view, per
// the SEO/Media spec's "autoplay-muted when scrolled into view" UI
// pattern; a real <iframe> only mounts at that point so nothing loads
// (bandwidth-wise) before then.
export default function VideoPlayer({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const embedSrc = (() => {
    try {
      const url = new URL(src);
      url.searchParams.set("autoplay", "true");
      url.searchParams.set("muted", "true");
      url.searchParams.set("loop", "true");
      url.searchParams.set("controls", "true");
      return url.toString();
    } catch {
      return src;
    }
  })();

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded"
      style={{ aspectRatio: "16 / 9" }}
    >
      {inView ? (
        <iframe
          src={embedSrc}
          title={caption ?? "Music video"}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-[13px] text-paper/40">
          {caption ?? "Loading video…"}
        </div>
      )}
    </div>
  );
}
