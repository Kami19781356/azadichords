# AZADICHORDS — SEO & Media Preview Specification

---

## PART 1 — SEO

### 1.1 Page metadata (every page needs unique title + description)

```
Home:        "Azadichords — Independent Music Label, Paris"
              "An independent label for the voice that refuses to be silent."

Manifesto:    "Our Story — Azadichords"
              "Azadichords began with an album that needed a home beyond 
               permission. This is why we exist."

Music:        "Music — Azadichords"
              "Listen to releases from Azadichords, an independent Paris 
               label for uncensored voices."

Artists:      "Kamran Rasoolzadeh — Azadichords"
              "Iranian poet, composer, and singer-songwriter. Composer and 
               producer of CHESHMAT (2014) and Azadichords' first artist."

Activity:     "Activity — Azadichords"
              "A running record of Azadichords' releases, performances, 
               and milestones."

Press:        "Press — Azadichords"

Services:     "What the Label Offers — Azadichords"
              "Production, distribution, visual identity, live performance, 
               and licensing support for the artists Azadichords works with."

Submissions:  "For the Next Voice — Submit Your Music — Azadichords"
              "Azadichords is an independent Persian label reviewing music 
               submissions from artists whose work needed a home beyond 
               permission."

Support:      "Support the Project — Azadichords"
Contact:      "Contact — Azadichords"
```

**Priority note:** Submissions is the highest-value page for search-intent matching — it's the page most likely to be found by artists actively searching for a label. Write its title/description to match real search phrasing ("independent label accepting submissions," "Persian music label submit music") rather than purely brand-voice copy.

Each needs to be implemented via Next.js `generateMetadata()` per route — not hardcoded once in a root layout.

### 1.2 Open Graph + Twitter Card

Every page needs OG tags so links preview properly when shared on Instagram/Telegram/Twitter:

```
og:title, og:description, og:image (1200x630), og:type, og:url
twitter:card = "summary_large_image"
```

**Action needed from you:** a dedicated 1200×630 share image (can reuse hero photography, cropped). Without this, shared links show a blank/generic preview — this alone noticeably affects click-through when press or fans share the site.

### 1.3 Structured data (JSON-LD) — the highest-leverage SEO item here

This is what lets Google show rich results (artist panels, album cards) instead of a plain blue link. Three schema types apply directly:

**On Home / Manifesto (Organization + MusicGroup):**
```json
{
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Azadichords",
  "url": "https://azadichords.com",
  "genre": "Independent",
  "foundingLocation": "Paris, France"
}
```

**On the Artists page (Person):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kamran Rasoolzadeh",
  "jobTitle": "Poet, Composer, Singer-songwriter",
  "url": "https://azadichords.com/artists"
}
```

**On Music page, per track (once released) — MusicRecording:**
```json
{
  "@context": "https://schema.org",
  "@type": "MusicRecording",
  "name": "[track title]",
  "byArtist": { "@type": "Person", "name": "Kamran Rasoolzadeh" },
  "inAlbum": { "@type": "MusicAlbum", "name": "[album title]" }
}
```
This last block only gets populated as tracks actually drop — no placeholder data before release, consistent with the standing rule that the site never gets ahead of the release strategy.

### 1.4 Technical checklist

- [ ] `sitemap.xml` auto-generated from routes (Next.js supports this natively via `sitemap.ts`)
- [ ] `robots.txt` allowing full indexing (nothing to hide here — this is the public-facing side)
- [ ] Canonical URL tag on every page
- [ ] One `<h1>` per page, proper heading hierarchy below it (currently looks correct from the screenshots)
- [ ] Real `alt` text on every image once photography replaces the `[portrait — ...]` placeholders — this is currently a gap since placeholders have no alt text to model from
- [ ] Core Web Vitals: since this is self-hosted (not on a CDN-backed platform), image optimization matters more than usual — use Next.js `<Image>` component everywhere, WebP/AVIF, lazy-load below the fold
- [ ] i18n/hreflang scaffolding — already noted as architecture-ready in the Master Brief (Section 5); activate only if/when Persian is added

### 1.5 Post-launch (not a dev task — your action after going live)

- Submit sitemap to Google Search Console and Bing Webmaster Tools
- Verify domain ownership in both
- Monitor indexing status weekly for the first month

---

## PART 2 — Preview Playback (Audio + Video)

### 2.1 A security consideration first — read before building

Preview clips are, by nature, **public promotional material** — different in kind from the source code/CMS decisions where we avoided US platforms for OPSEC reasons. A 20-second teaser clip has low leak/security value even if extracted; it's meant to be shared. So this section optimizes for **quality and control**, not the same lockdown logic as the Gitea decision.

The one real risk worth designing against: someone extracting a **full-length, full-quality** file before official release. The fix is architectural, not platform-choice — see 2.2.

### 2.2 Audio preview

**What:** 15–30 second clips per track, not full songs.

**How it's protected:**
- Clips are genuinely short exports (not the full song truncated client-side — the file itself should only ever contain the preview segment, exported that way at the production stage)
- Streamed through the page, not offered as a downloadable file — no visible `.mp3`/`.flac` link in the page source
- Hosted on Hetzner Object Storage (same provider as everything else) with the file path not guessable/enumerable

**UI:** A custom player matching the site's aesthetic — waveform visualization (fits the vinyl/turntable imagery already on the hero) rather than a generic browser audio bar. `wavesurfer.js` is a solid, lightweight library for this and pairs well with Framer Motion for the reveal animations already speced in v1.

**Where it lives:** Music page, one player per track — populated only as singles actually release. Can also support short teaser clips pre-release (e.g., a "Lalayi" warmup snippet) without waiting for the full Music page buildout.

### 2.3 Video preview

**What:** Short clips from music videos / the album trailer discussed earlier.

**Decision: Cloudflare Stream** (~$5/1000 min stored + delivered).

Clean embed with no third-party branding, adaptive quality for slow connections, minimal setup. The OPSEC reasoning that drove the Gitea decision doesn't apply here — this content is public marketing material by design, not source code or backend infrastructure — so the setup/maintenance savings win out over self-hosting.

**Account setup needed:** a Cloudflare account (free tier to start), Stream enabled on it, API token generated for the Next.js app to use when uploading/embedding clips.

**UI pattern:** autoplay-muted when scrolled into view (common, matches the editorial/premium feel from the Mōno X reference), click to unmute/expand to fullscreen. No YouTube-branded embed — keeps the page feeling like Azadichords, not a YouTube tab.

### 2.4 Build order

1. Register Cloudflare account + enable Stream (decision already locked — see 2.3)
2. Audio player component (wavesurfer.js + custom styling) — build now, even with placeholder/silent state until first clip exists
3. Video player component — same, build the shell now
4. Object storage buckets for audio clips (Hetzner)
5. Wire both into the Music page once "Lalayi" or the first single is ready to preview

---

*All decisions locked. This doc is ready to hand to Claude Code as-is, alongside the Master Brief (which now consolidates all content — v1 through v4 are superseded) and the sales process spec.*
