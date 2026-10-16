// Regenerates src/lib/content.ts from the editable files in content/
// (pages/*.yml, artists/*.md, releases/*.md). Runs automatically before
// `next dev` and `next build` (see package.json), so anything committed
// through the CMS is picked up on the next run/deploy with no manual step.
//
// Source files use a bilingual `_en`/`_fa` field-pair convention (e.g.
// `title_en` / `title_fa`). This generator builds one full content tree
// per locale (see buildContent below); any `_fa` field left blank falls
// back to its `_en` value, so the Persian site never shows a gap — it
// just shows English until the field is filled in.
//
// Do not hand-edit src/lib/content.ts — edit the files in content/ instead.

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import matter from "gray-matter";

const root = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(root, "..", "content");
const outFile = path.join(root, "..", "src", "lib", "content.ts");

function readYaml(name) {
  const file = path.join(contentDir, "pages", `${name}.yml`);
  return loadYaml(readFileSync(file, "utf8"));
}

function readFolder(folder) {
  const dir = path.join(contentDir, folder);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const { data, content: body } = matter(readFileSync(path.join(dir, f), "utf8"));
      return { ...data, body: body.trim() };
    });
}

function isEmpty(v) {
  if (v == null) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  return false;
}

// Reads the `_{lang}` half of a bilingual field pair, falling back to
// `_en` when the localized value is missing/blank (works for strings
// and arrays alike).
function t(obj, key, lang) {
  const localized = obj[`${key}_${lang}`];
  return isEmpty(localized) ? obj[`${key}_en`] : localized;
}

const nav = readYaml("nav");
const home = readYaml("home");
const manifesto = readYaml("manifesto");
const music = readYaml("music");
const artistsPage = readYaml("artists-page");
const activityPage = readYaml("activity");
const press = readYaml("press");
const services = readYaml("services");
const submissions = readYaml("submissions");
const support = readYaml("support");
const contact = readYaml("contact");
const footer = readYaml("footer");
const festival = readYaml("festival");
const download = readYaml("download");

const artistFiles = readFolder("artists");
const activityFiles = readFolder("activity");
const releaseFiles = readFolder("releases");

function buildContent(lang) {
  const artists = artistFiles.map((a) => ({
    slug: a.slug,
    name: a.name,
    role: t(a, "role", lang),
    badge: t(a, "badge", lang) || "",
    imageCaption: a.imageCaption,
    intro: t(a, "intro", lang),
    bio: t(a, "bio", lang) || a.body, // fall back to markdown body for older entries
    cta: { label: t(a, "ctaLabel", lang), href: a.ctaHref },
    recognition: a.recognition ?? [],
    priorWork: isEmpty(a.priorWorkTitle_en)
      ? null
      : {
          title: t(a, "priorWorkTitle", lang),
          description: t(a, "priorWorkDescription", lang),
          videoUrl: a.priorWorkVideoUrl || "",
        },
  }));

  const activity = activityFiles.map((a) => ({
    date: a.date,
    title: t(a, "title", lang),
    description: t(a, "body", lang) || a.body,
    link: a.link || "",
  }));

  // Releases (albums/singles/EPs) share one schema and are sorted by
  // release_date (newest first) instead of a manual order field — see
  // Azadichords_Release_Template.md. content.releases[0] is always the
  // newest/featured one. Tracks are sorted by track_number, not file
  // order, so re-saving in the CMS can't silently reshuffle them.
  const releases = releaseFiles
    .filter((r) => !r.hidden)
    .map((r) => ({
      slug: r.slug,
      title: r[`title_${lang}`] || r.title_en || r.title,
      catalogNumber: r.catalog_number || "",
      type: r.type,
      artist: r.artist,
      status: r.status,
      releaseDate: r.release_date,
      coverImageCaption: r.coverImageCaption,
      tagline: t(r, "tagline", lang),
      description: t(r, "description", lang) || r.body,
      demoAudioUrl: r.demo_audio_url || "",
      // Free download — offered on the Persian site only (for listeners
      // inside Iran, where streaming platforms are blocked).
      downloadUrl: r.download_url || "",
      coverImage: r.cover_image || "",
      credits: (r.credits ?? []).map((c) => ({
        role: t(c, "role", lang),
        name: t(c, "name", lang),
      })),
      videoUrl: r.video_url || "",
      videoCaption: t(r, "musicVideoCaption", lang) || "",
      tracks: (r.tracks ?? [])
        .map((tr) => ({
          trackNumber: tr.track_number,
          title: t(tr, "title", lang),
          duration: tr.duration || "",
          previewUrl: tr.preview_url || "",
        }))
        .sort((a, b) => a.trackNumber - b.trackNumber),
      streamingLinks: (r.streaming_links ?? []).map((s) => ({
        platform: s.platform,
        url: s.url,
      })),
      supportTierLink: !!r.support_tier_link,
      purchaseNote: t(r, "purchaseNote", lang) || "",
    }))
    .sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1));

  return {
    nav: {
      brand: nav.brand,
      tagline: t(nav, "tagline", lang),
      links: nav.links.map((l) => ({ href: l.href, label: t(l, "label", lang) })),
    },
    hero: {
      eyebrow: t(home, "eyebrow", lang),
      title: home.title,
      subhead: t(home, "subhead", lang),
      ctaPrimary: { label: t(home, "ctaPrimaryLabel", lang), href: home.ctaPrimaryHref },
      ctaSecondary: { label: t(home, "ctaSecondaryLabel", lang), href: home.ctaSecondaryHref },
      scrollHint: t(home, "scrollHint", lang),
      promoBar: { label: t(home, "promoBarLabel", lang), href: home.promoBarHref },
    },
    manifesto: {
      eyebrow: t(manifesto, "eyebrow", lang),
      title: t(manifesto, "title", lang),
      imageCaption: manifesto.imageCaption,
      image: manifesto.image || "",
      paragraphs: t(manifesto, "paragraphs", lang),
      closing: t(manifesto, "closing", lang),
      cta: { label: t(manifesto, "ctaLabel", lang), href: manifesto.ctaHref },
    },
    music: {
      eyebrow: t(music, "eyebrow", lang),
      title: t(music, "title", lang),
      intro: t(music, "intro", lang),
      closing: t(music, "closing", lang),
      comingSoonLabel: t(music, "comingSoonLabel", lang),
      tracksComingSoonLabel: t(music, "tracksComingSoonLabel", lang),
      videoComingSoonLabel: t(music, "videoComingSoonLabel", lang),
      demoComingSoonLabel: t(music, "demoComingSoonLabel", lang),
      listenLabel: t(music, "listenLabel", lang),
      tracksLabel: t(music, "tracksLabel", lang),
      videoLabel: t(music, "videoLabel", lang),
      typeLabels: {
        album: t(music, "albumLabel", lang),
        single: t(music, "singleLabel", lang),
        ep: t(music, "epLabel", lang),
      },
      getReleaseLabel: t(music, "getReleaseLabel", lang),
      getReleaseNote: t(music, "getReleaseNote", lang),
      getReleaseCtaLabel: t(music, "getReleaseCtaLabel", lang),
      downloadLabel: t(music, "downloadLabel", lang),
      downloadNote: t(music, "downloadNote", lang),
      outNowLabel: t(music, "outNowLabel", lang),
      creditsLabel: t(music, "creditsLabel", lang),
    },
    download: {
      eyebrow: t(download, "eyebrow", lang),
      title: t(download, "title", lang),
      body: t(download, "body", lang),
      buttonLabel: t(download, "buttonLabel", lang),
      unavailable: t(download, "unavailable", lang),
      supportTitle: t(download, "supportTitle", lang),
      supportIntro: t(download, "supportIntro", lang),
      paths: download.paths.map((p) => ({
        title: t(p, "title", lang),
        description: t(p, "description", lang),
        cta: { label: t(p, "ctaLabel", lang), href: p.ctaHref },
      })),
    },
    artistsPage: {
      eyebrow: t(artistsPage, "eyebrow", lang),
      title: t(artistsPage, "title", lang),
      intro: t(artistsPage, "intro", lang),
    },
    artists,
    releases,
    activityPage: {
      eyebrow: t(activityPage, "eyebrow", lang),
      title: t(activityPage, "title", lang),
      intro: t(activityPage, "intro", lang),
      emptyStateNote: t(activityPage, "emptyStateNote", lang),
    },
    activity,
    press: {
      eyebrow: t(press, "eyebrow", lang),
      title: t(press, "title", lang),
      paragraphs: t(press, "paragraphs", lang),
    },
    services: {
      eyebrow: t(services, "eyebrow", lang),
      title: t(services, "title", lang),
      intro: t(services, "intro", lang),
      items: services.services.map((s) => ({
        title: t(s, "title", lang),
        description: t(s, "description", lang),
      })),
      cta: { label: t(services, "ctaLabel", lang), href: services.ctaHref },
    },
    submissions: {
      eyebrow: t(submissions, "eyebrow", lang),
      title: t(submissions, "title", lang),
      intro: t(submissions, "intro", lang),
      guidelines: t(submissions, "guidelines", lang),
      safetyNote: t(submissions, "safetyNote", lang),
      fields: {
        artistName: t(submissions, "fieldArtistName", lang),
        email: t(submissions, "fieldEmail", lang),
        songTitle: t(submissions, "fieldSongTitle", lang),
        lyricist: t(submissions, "fieldLyricist", lang),
        composer: t(submissions, "fieldComposer", lang),
        dedication: t(submissions, "fieldDedication", lang),
        lyrics: t(submissions, "fieldLyrics", lang),
        demoUrl: t(submissions, "fieldDemoUrl", lang),
        note: t(submissions, "fieldNote", lang),
      },
      consentRights: t(submissions, "consentRights", lang),
      consentAlbum: t(submissions, "consentAlbum", lang),
      submit: t(submissions, "submitLabel", lang),
      sending: t(submissions, "sendingLabel", lang),
      successMessage: t(submissions, "successMessage", lang),
      errorMessage: t(submissions, "errorMessage", lang),
      closedMessage: t(submissions, "closedMessage", lang),
      generalNote: t(submissions, "generalNote", lang),
      generalCta: { label: t(submissions, "generalCtaLabel", lang), href: submissions.generalCtaHref },
    },
    support: {
      eyebrow: t(support, "eyebrow", lang),
      title: t(support, "title", lang),
      intro: t(support, "intro", lang),
      ways: support.ways.map((w) => ({
        name: w.name,
        title: t(w, "title", lang),
        description: t(w, "description", lang),
        cta: { label: t(w, "ctaLabel", lang), href: w.ctaHref },
        soonNote: w.soonNote_en ? t(w, "soonNote", lang) : undefined,
      })),
      transparency: t(support, "transparency", lang),
    },
    festival: {
      eyebrow: t(festival, "eyebrow", lang),
      title: t(festival, "title", lang),
      intro: t(festival, "intro", lang),
      sectionsTitle: t(festival, "sectionsTitle", lang),
      sections: festival.sections.map((s) => ({
        label: t(s, "label", lang),
        title: t(s, "title", lang),
        description: t(s, "description", lang),
        tags: t(s, "tags", lang) ?? [],
        points: t(s, "points", lang) ?? [],
        cta: { label: t(s, "ctaLabel", lang), href: s.ctaHref },
        highlight: !!s.highlight,
      })),
      datesTitle: t(festival, "datesTitle", lang),
      dates: festival.dates.map((d) => ({
        date: String(d.date),
        endDate: d.endDate ? String(d.endDate) : "",
        label: t(d, "label", lang),
        highlight: !!d.highlight,
      })),
      datesNote: t(festival, "datesNote", lang) || "",
      entryFee: t(festival, "entryFee", lang),
      programmeTitle: t(festival, "programmeTitle", lang),
      programme: festival.programme.map((p) => ({
        date: String(p.date),
        title: t(p, "title", lang),
        description: t(p, "description", lang),
      })),
      juryTitle: t(festival, "juryTitle", lang),
      juryText: t(festival, "juryText", lang),
      venueTitle: t(festival, "venueTitle", lang),
      venueText: t(festival, "venueText", lang),
      cta: { label: t(festival, "ctaLabel", lang), href: festival.ctaHref },
      ctaNote: t(festival, "ctaNote", lang),
      detailsLabel: t(festival, "detailsLabel", lang),
    },
    contact: {
      eyebrow: t(contact, "eyebrow", lang),
      title: t(contact, "title", lang),
      subhead: t(contact, "subhead", lang),
      fields: {
        name: t(contact, "fieldNameLabel", lang),
        email: t(contact, "fieldEmailLabel", lang),
        subject: t(contact, "fieldSubjectLabel", lang),
        category: t(contact, "fieldCategoryLabel", lang),
        message: t(contact, "fieldMessageLabel", lang),
      },
      categories: t(contact, "categories", lang),
      submit: t(contact, "submitLabel", lang),
      sending: t(contact, "sendingLabel", lang),
      successMessage: t(contact, "successMessage", lang),
      errorMessage: t(contact, "errorMessage", lang),
    },
    footer: {
      copyright: footer.copyright,
      social: footer.social,
      disclaimer: t(footer, "disclaimer", lang),
    },
  };
}

const content = {
  en: buildContent("en"),
  fa: buildContent("fa"),
};

const banner = `// AUTO-GENERATED by scripts/generate-content.mjs — do not edit by hand.
// Edit the files in content/ instead (or use the CMS at /admin), then
// re-run \`npm run generate-content\` (also runs automatically before
// dev/build).

import type { Content, Locale } from "./content.types";

`;

writeFileSync(
  outFile,
  banner +
    `export const content: Record<Locale, Content> = ${JSON.stringify(content, null, 2)};\n`,
);

console.log(`Generated ${path.relative(process.cwd(), outFile)}`);
