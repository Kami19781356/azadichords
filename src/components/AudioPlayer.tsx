"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function AudioPlayer({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<import("wavesurfer.js").default | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    let disposed = false;

    import("wavesurfer.js").then(({ default: WaveSurfer }) => {
      if (disposed || !containerRef.current) return;
      const ws = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "rgba(245,243,239,0.25)",
        progressColor: "#C9A227",
        cursorColor: "transparent",
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        height: 36,
        url: src,
      });
      ws.on("ready", () => setReady(true));
      ws.on("play", () => setPlaying(true));
      ws.on("pause", () => setPlaying(false));
      ws.on("finish", () => setPlaying(false));
      wavesurferRef.current = ws;
    });

    return () => {
      disposed = true;
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
    };
  }, [src]);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        disabled={!ready}
        onClick={() => wavesurferRef.current?.playPause()}
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold text-gold transition-colors duration-200 hover:bg-gold hover:text-ink disabled:opacity-30"
      >
        {playing ? <Pause size={14} /> : <Play size={14} className="ms-0.5" />}
      </button>
      <div ref={containerRef} className="min-w-0 flex-1" />
    </div>
  );
}
