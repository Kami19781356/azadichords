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
    .map((r) => ({
      slug: r.slug,
      title: r.title,
      type: r.type,
      artist: r.artist,
      status: r.status,
      releaseDate: r.release_date,
      coverImageCaption: r.coverImageCaption,
      tagline: t(r, "tagline", lang),
      description: t(r, "description", lang) || r.body,
      demoAudioUrl: r.demo_audio_url || "",
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
      getReleaseLabel: t(music, "getReleaseLabel", lang),
      getReleaseNote: t(music, "getReleaseNote", lang),
      getReleaseCtaLabel: t(music, "getReleaseCtaLabel", lang),
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
      note: t(submissions, "note", lang),
      cta: { label: t(submissions, "ctaLabel", lang), href: submissions.ctaHref },
    },
    support: {
      eyebrow: t(support, "eyebrow", lang),
      title: t(support, "title", lang),
      intro: t(support, "intro", lang),
      tiers: support.tiers.map((tier) => ({
        name: tier.name,
        title: t(tier, "title", lang),
        description: t(tier, "description", lang),
        note: t(tier, "note", lang) || "",
      })),
      cta: { label: t(support, "ctaLabel", lang), href: support.ctaHref },
      transparency: t(support, "transparency", lang),
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
      },
      categories: t(contact, "categories", lang),
      submit: t(contact, "submitLabel", lang),
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
