"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";
import SplitReveal from "@/components/SplitReveal";

export default function Music() {
  return (
    <section className="flex min-h-screen flex-col gap-14 bg-ink px-6 py-24 md:px-16 md:py-36">
      <motion.div {...reveal}>
        <div className="mb-5 text-[13px] tracking-[0.2em] text-gold uppercase">
          {content.music.eyebrow}
        </div>
        <SplitReveal
          as="h2"
          text={content.music.title}
          className="m-0 mb-6 font-serif text-[clamp(36px,5vw,64px)] font-semibold"
        />
        <p className="m-0 max-w-[640px] text-xl leading-[1.6] text-paper/85">
          {content.music.intro}
        </p>
      </motion.div>

      <div className="flex flex-col gap-24">
        {content.albums.map((album) => (
          <motion.div
            key={album.slug}
            {...reveal}
            className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16"
          >
            <Placeholder
              caption={album.coverImageCaption}
              variant="dark45"
              aspect="1/1"
              className="w-full"
            />
            <div className="flex flex-col gap-6">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h3 className="m-0 font-serif text-2xl font-semibold">
                    {album.title}
                  </h3>
                  <span className="text-sm text-paper/40">{album.year}</span>
                  {album.status !== "released" && (
                    <span className="rounded-full border border-gold px-3 py-1 text-[11px] tracking-[0.08em] text-gold uppercase">
                      {content.music.comingSoonLabel}
                    </span>
                  )}
                </div>
                <p
                  className="m-0 text-lg leading-[1.7] text-paper/65"
                  dangerouslySetInnerHTML={{ __html: album.blurb }}
                />
              </div>

              <div>
                <div className="mb-3 text-[13px] tracking-[0.15em] text-paper/40 uppercase">
                  Tracks
                </div>
                {album.tracks.length > 0 ? (
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {album.tracks.map((track) => (
                      <li
                        key={track.title}
                        className="flex flex-col gap-2 border-b border-paper/10 pb-3"
                      >
                        <div className="flex items-center justify-between text-[15px] text-paper/80">
                          <span>{track.title}</span>
                          {track.durationLabel && (
                            <span className="text-paper/40">
                              {track.durationLabel}
                            </span>
                          )}
                        </div>
                        {track.audioUrl && (
                          <audio
                            controls
                            preload="none"
                            src={track.audioUrl}
                            className="h-9 w-full"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="m-0 text-sm text-paper/40">
                    {content.music.tracksComingSoonLabel}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-3 text-[13px] tracking-[0.15em] text-paper/40 uppercase">
                  Video
                </div>
                {album.musicVideoUrl ? (
                  <video
                    controls
                    preload="none"
                    src={album.musicVideoUrl}
                    className="w-full rounded"
                  />
                ) : (
                  <p className="m-0 text-sm text-paper/40">
                    {content.music.videoComingSoonLabel}
                  </p>
                )}
              </div>

              {album.externalListen.href && (
                <a
                  href={album.externalListen.href}
                  className="inline-block w-fit rounded-full border border-gold px-8 py-3.5 text-[13px] tracking-[0.08em] text-gold uppercase transition-colors duration-[250ms] hover:bg-gold hover:text-ink"
                >
                  {album.externalListen.label}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="m-0 text-sm tracking-[0.05em] text-paper/40">
        {content.music.closing}
      </p>
    </section>
  );
}
