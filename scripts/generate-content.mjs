// Regenerates src/lib/content.ts from the editable files in content/
// (pages/*.yml, artists/*.md, albums/*.md). Runs automatically before
// `next dev` and `next build` (see package.json), so anything committed
// through the CMS is picked up on the next run/deploy with no manual step.
//
// Source files use a bilingual `_en`/`_fa` field-pair convention (e.g.
// `title_en` / `title_fa`) so that adding real i18n later — or
// migrating to a CMS with native i18n (Payload, etc.) — is a matter of
// reading a different suffix, not a schema rewrite. The site itself
// only renders English right now, so this generator reads `_en` and
// emits the same flat, unprefixed shape it always has; `_fa` values
// live in the source files but aren't consumed yet.
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

// Reads the `_en` half of a bilingual field pair.
const en = (obj, key) => obj[`${key}_en`];

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

const artists = readFolder("artists").map((a) => ({
  slug: a.slug,
  name: a.name,
  role: en(a, "role"),
  badge: en(a, "badge") || "",
  imageCaption: a.imageCaption,
  intro: en(a, "intro"),
  bio: en(a, "bio") || a.body, // fall back to markdown body for older entries
  cta: { label: en(a, "ctaLabel"), href: a.ctaHref },
  recognition: a.recognition ?? [],
}));

const activity = readFolder("activity").map((a) => ({
  date: a.date,
  title: en(a, "title"),
  description: en(a, "body") || a.body,
  link: a.link || "",
}));

// Releases (albums/singles/EPs) share one schema and are sorted by
// release_date (newest first) instead of a manual order field — see
// Azadichords_Release_Template.md. content.releases[0] is always the
// newest/featured one.
const releases = readFolder("releases")
  .map((r) => ({
    slug: r.slug,
    title: r.title,
    type: r.type,
    artist: r.artist,
    status: r.status,
    releaseDate: r.release_date,
    coverImageCaption: r.coverImageCaption,
    tagline: en(r, "tagline"),
    description: en(r, "description") || r.body,
    demoAudioUrl: r.demo_audio_url || "",
    videoUrl: r.video_url || "",
    videoCaption: en(r, "musicVideoCaption") || "",
    tracks: (r.tracks ?? []).map((t) => ({
      trackNumber: t.track_number,
      title: en(t, "title"),
      duration: t.duration || "",
      previewUrl: t.preview_url || "",
    })),
    streamingLinks: (r.streaming_links ?? []).map((s) => ({
      platform: s.platform,
      url: s.url,
    })),
    supportTierLink: !!r.support_tier_link,
    purchaseNote: en(r, "purchaseNote") || "",
  }))
  .sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1));

const content = {
  nav: {
    brand: nav.brand,
    tagline: en(nav, "tagline"),
    links: nav.links.map((l) => ({ href: l.href, label: en(l, "label") })),
  },
  hero: {
    eyebrow: en(home, "eyebrow"),
    title: home.title,
    subhead: en(home, "subhead"),
    ctaPrimary: { label: en(home, "ctaPrimaryLabel"), href: home.ctaPrimaryHref },
    ctaSecondary: { label: en(home, "ctaSecondaryLabel"), href: home.ctaSecondaryHref },
    scrollHint: en(home, "scrollHint"),
    promoBar: { label: en(home, "promoBarLabel"), href: home.promoBarHref },
  },
  manifesto: {
    eyebrow: en(manifesto, "eyebrow"),
    title: en(manifesto, "title"),
    imageCaption: manifesto.imageCaption,
    paragraphs: manifesto.paragraphs_en,
    closing: en(manifesto, "closing"),
    cta: { label: en(manifesto, "ctaLabel"), href: manifesto.ctaHref },
  },
  music: {
    eyebrow: en(music, "eyebrow"),
    title: en(music, "title"),
    intro: en(music, "intro"),
    closing: en(music, "closing"),
    comingSoonLabel: en(music, "comingSoonLabel"),
    tracksComingSoonLabel: en(music, "tracksComingSoonLabel"),
    videoComingSoonLabel: en(music, "videoComingSoonLabel"),
    demoComingSoonLabel: en(music, "demoComingSoonLabel"),
    getReleaseLabel: en(music, "getReleaseLabel"),
    getReleaseNote: en(music, "getReleaseNote"),
    getReleaseCtaLabel: en(music, "getReleaseCtaLabel"),
  },
  artistsPage: {
    eyebrow: en(artistsPage, "eyebrow"),
    title: en(artistsPage, "title"),
    intro: en(artistsPage, "intro"),
  },
  artists,
  releases,
  activityPage: {
    eyebrow: en(activityPage, "eyebrow"),
    title: en(activityPage, "title"),
    intro: en(activityPage, "intro"),
    emptyStateNote: en(activityPage, "emptyStateNote"),
  },
  activity,
  press: {
    eyebrow: en(press, "eyebrow"),
    title: en(press, "title"),
    paragraphs: press.paragraphs_en,
  },
  services: {
    eyebrow: en(services, "eyebrow"),
    title: en(services, "title"),
    intro: en(services, "intro"),
    items: services.services.map((s) => ({
      title: en(s, "title"),
      description: en(s, "description"),
    })),
    cta: { label: en(services, "ctaLabel"), href: services.ctaHref },
  },
  submissions: {
    eyebrow: en(submissions, "eyebrow"),
    title: en(submissions, "title"),
    intro: en(submissions, "intro"),
    guidelines: submissions.guidelines_en,
    note: en(submissions, "note"),
    cta: { label: en(submissions, "ctaLabel"), href: submissions.ctaHref },
  },
  support: {
    eyebrow: en(support, "eyebrow"),
    title: en(support, "title"),
    intro: support.intro_en,
    tiers: support.tiers.map((t) => ({
      name: t.name,
      title: en(t, "title"),
      description: en(t, "description"),
      note: en(t, "note") || "",
    })),
    cta: { label: en(support, "ctaLabel"), href: support.ctaHref },
    transparency: en(support, "transparency"),
  },
  contact: {
    eyebrow: en(contact, "eyebrow"),
    title: en(contact, "title"),
    subhead: en(contact, "subhead"),
    fields: {
      name: en(contact, "fieldNameLabel"),
      email: en(contact, "fieldEmailLabel"),
      subject: en(contact, "fieldSubjectLabel"),
      category: en(contact, "fieldCategoryLabel"),
    },
    categories: contact.categories_en,
    submit: en(contact, "submitLabel"),
  },
  footer: {
    copyright: footer.copyright,
    social: footer.social,
    disclaimer: en(footer, "disclaimer"),
  },
};

const banner = `// AUTO-GENERATED by scripts/generate-content.mjs — do not edit by hand.
// Edit the files in content/ instead (or use the CMS at /admin), then
// re-run \`npm run generate-content\` (also runs automatically before
// dev/build).

import type { Content } from "./content.types";

`;

writeFileSync(
  outFile,
  banner + `export const content: Content = ${JSON.stringify(content, null, 2)};\n`,
);

console.log(`Generated ${path.relative(process.cwd(), outFile)}`);
