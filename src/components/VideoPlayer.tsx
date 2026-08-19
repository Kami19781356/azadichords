"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// Accepts a raw YouTube (watch/share/youtu.be) or Vimeo URL from the
// CMS's video_url field — detects the provider, shows a thumbnail
// facade, and only mounts the real embed <iframe> once clicked (no
// network request to the video host before then).
function parseVideo(src: string): { embedUrl: string; thumbnailUrl: string | null } | null {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.slice(1);
      if (!id) return null;
      return {
        embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      };
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = url.pathname.startsWith("/embed/")
        ? url.pathname.split("/embed/")[1]
        : url.searchParams.get("v");
      if (!id) return null;
      return {
        embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1`,
        thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      };
    }
    if (host === "vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      if (!id) return null;
      return {
        embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`,
        // Vimeo thumbnails need an oEmbed network call to resolve, which
        // would defeat the "no request before click" goal — fall back
        // to a plain facade instead.
        thumbnailUrl: null,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export default function VideoPlayer({
  src,
  caption,
}: {
  src: string;
  caption?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const video = parseVideo(src);

  if (!video) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded bg-black/40"
      style={{ aspectRatio: "16 / 9" }}
    >
      {playing ? (
        <iframe
          src={video.embedUrl}
          title={caption ?? "Video"}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${caption ?? "video"}`}
          className="group absolute inset-0 flex h-full w-full items-center justify-center border-0 bg-cover bg-center p-0"
          style={
            video.thumbnailUrl
              ? { backgroundImage: `url(${video.thumbnailUrl})` }
              : undefined
          }
        >
          <div className="absolute inset-0 bg-black/35 transition-colors duration-200 group-hover:bg-black/20" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-paper/70 bg-ink/50 text-paper transition-transform duration-200 group-hover:scale-110">
            <Play size={22} className="ms-1" />
          </span>
          {caption && (
            <span className="absolute bottom-3 start-3 text-[13px] text-paper/80">
              {caption}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
