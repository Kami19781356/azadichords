"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/lib/ContentProvider";
import { useLocale, localizeHref } from "@/lib/locale";
import { reveal } from "@/lib/motionVariants";
import Placeholder from "@/components/Placeholder";
import SplitReveal from "@/components/SplitReveal";
import AudioPlayer from "@/components/AudioPlayer";
import VideoPlayer from "@/components/VideoPlayer";
import type { Release } from "@/lib/content.types";

function GetReleaseBlock({ release }: { release: Release }) {
  const content = useContent();
  const locale = useLocale();
  if (!release.supportTierLink) return null;
  return (
    <p className="m-0 max-w-[520px] text-sm leading-[1.7] text-paper/60">
      {release.purchaseNote || content.music.getReleaseNote}{" "}
      <Link
        href={localizeHref("/support", locale)}
        className="text-gold transition-colors duration-200 hover:text-paper"
      >
        {content.music.getReleaseCtaLabel}
      </Link>
    </p>
  );
}

function Cover({ release, className }: { release: Release; className?: string }) {
  if (release.coverImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={release.coverImage}
        alt={release.coverImageCaption || release.title}
        className={`aspect-square w-full rounded object-cover ${className ?? ""}`}
      />
    );
  }
  return (
    <Placeholder
      caption={release.coverImageCaption}
      variant="dark45"
      aspect="1/1"
      className={`w-full ${className ?? ""}`}
    />
  );
}

// Free download — Persian site only (the audience inside Iran, where
// streaming platforms are blocked). Goes through /fa/download/<slug>,
// which starts the file and shows the ways to support.
export function DownloadButton({ release }: { release: Release }) {
  const content = useContent();
  const locale = useLocale();
  if (locale !== "fa" || !release.downloadUrl) return null;
  return (
    <div className="flex flex-col items-start gap-2">
      <Link
        href={`/fa/download/${release.slug}`}
        className="inline-flex items-center gap-2.5 rounded-full bg-garnet px-8 py-4 text-sm tracking-[0.06em] text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-garnet-hover"
      >
        <span aria-hidden>↓</span>
        {content.music.downloadLabel}
      </Link>
      {content.music.downloadNote && (
        <span className="text-sm text-paper/50">{content.music.downloadNote}</span>
      )}
    </div>
  );
}

function Credits({ release }: { release: Release }) {
  const content = useContent();
  if (release.credits.length === 0) return null;
  return (
    <div>
      <div className="mb-3 text-[13px] tracking-[0.15em] text-paper/40 uppercase">
        {content.music.creditsLabel}
      </div>
      <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[15px]">
        {release.credits.map((c) => (
          <div key={c.role + c.name} className="contents">
            <dt className="text-paper/45">{c.role}</dt>
            <dd className="m-0 text-paper/80">{c.name}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function TrackList({ tracks }: { tracks: Release["tracks"] }) {
  const content = useContent();
  if (tracks.length === 0) {
    return (
      <p className="m-0 text-sm text-paper/40">
        {content.music.tracksComingSoonLabel}
      </p>
    );
  }
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {tracks.map((track) => (
        <li
          key={track.trackNumber}
          className="flex flex-col gap-2 border-b border-paper/10 pb-3"
        >
          <div className="flex items-center justify-between text-[15px] text-paper/80">
            <span>
              <span className="me-2 text-paper/30">{track.trackNumber}.</span>
              {track.title}
            </span>
            {track.duration && (
              <span className="text-paper/40">{track.duration}</span>
            )}
          </div>
          {track.previewUrl && (
            <AudioPlayer src={track.previewUrl} title={track.title} />
          )}
        </li>
      ))}
    </ul>
  );
}

function Spotlight({ release }: { release: Release }) {
  const content = useContent();
  return (
    <motion.div
      {...reveal}
      className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16"
    >
      <Cover release={release} />
      <div className="flex flex-col gap-7">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-gold px-3 py-1 text-[11px] tracking-[0.08em] text-gold uppercase">
              {release.status === "upcoming"
                ? content.music.comingSoonLabel
                : `${content.music.typeLabels[release.type]} · ${content.music.outNowLabel}`}
            </span>
            {release.catalogNumber && (
              <span dir="ltr" className="text-[11px] tracking-[0.12em] text-paper/40 uppercase">
                {release.catalogNumber}
              </span>
            )}
            <h3 className="m-0 font-serif text-3xl font-semibold">
              {release.title}
            </h3>
          </div>
          <p className="m-0 mb-3 text-lg text-gold/90">{release.tagline}</p>
          <p
            className="m-0 text-lg leading-[1.7] text-paper/65"
            dangerouslySetInnerHTML={{ __html: release.description }}
          />
        </div>

        <DownloadButton release={release} />

        <div>
          <div className="mb-3 text-[13px] tracking-[0.15em] text-paper/40 uppercase">
            {content.music.listenLabel}
          </div>
          {release.demoAudioUrl ? (
            <AudioPlayer src={release.demoAudioUrl} title={release.title} />
          ) : (
            <p className="m-0 text-sm text-paper/40">
              {content.music.demoComingSoonLabel}
            </p>
          )}
        </div>

        {(release.tracks.length > 0 || release.type !== "single") && (
          <div>
            <div className="mb-3 text-[13px] tracking-[0.15em] text-paper/40 uppercase">
              {content.music.tracksLabel}
            </div>
            <TrackList tracks={release.tracks} />
          </div>
        )}

        {release.videoUrl && (
          <div>
            <div className="mb-3 text-[13px] tracking-[0.15em] text-paper/40 uppercase">
              {content.music.videoLabel}
            </div>
            <VideoPlayer
              src={release.videoUrl}
              caption={release.videoCaption || release.title}
            />
          </div>
        )}

        <Credits release={release} />

        {release.streamingLinks.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {release.streamingLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gold px-6 py-3 text-[13px] tracking-[0.08em] text-gold uppercase transition-colors duration-200 hover:bg-gold hover:text-ink"
              >
                {link.platform.replace("_", " ")}
              </a>
            ))}
          </div>
        )}

        <GetReleaseBlock release={release} />
      </div>
    </motion.div>
  );
}

function CatalogItem({ release }: { release: Release }) {
  const content = useContent();
  const year = release.releaseDate.slice(0, 4);
  return (
    <motion.div
      {...reveal}
      className="grid grid-cols-1 gap-8 border-t border-paper/12 py-12 md:grid-cols-[220px_1fr] md:gap-12"
    >
      <Cover release={release} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="m-0 font-serif text-xl font-semibold">
            {release.title}
          </h4>
          <span className="text-sm text-paper/40">
            {content.music.typeLabels[release.type]} · {year}
          </span>
        </div>
        <p
          className="m-0 text-base leading-[1.7] text-paper/60"
          dangerouslySetInnerHTML={{ __html: release.description }}
        />
        {release.demoAudioUrl && (
          <AudioPlayer src={release.demoAudioUrl} title={release.title} />
        )}
        <DownloadButton release={release} />
        {release.tracks.length > 0 && <TrackList tracks={release.tracks} />}
        {release.streamingLinks.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {release.streamingLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.05em] text-paper/60 uppercase transition-colors duration-200 hover:text-gold"
              >
                {link.platform.replace("_", " ")}
              </a>
            ))}
          </div>
        )}
        <GetReleaseBlock release={release} />
      </div>
    </motion.div>
  );
}

export default function Music() {
  const content = useContent();
  const [latest, ...rest] = content.releases;

  return (
    <section
      id="music"
      className="flex min-h-screen flex-col gap-14 border-t border-paper/8 bg-ink px-6 py-24 md:px-16 md:py-36"
    >
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

      {latest && <Spotlight release={latest} />}

      {rest.length > 0 && (
        <div className="flex flex-col">
          {rest.map((release) => (
            <CatalogItem key={release.slug} release={release} />
          ))}
        </div>
      )}

      <p className="m-0 text-sm tracking-[0.05em] text-paper/40">
        {content.music.closing}
      </p>
    </section>
  );
}
