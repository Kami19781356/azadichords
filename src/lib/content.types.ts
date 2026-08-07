// Shape of the generated content object (see scripts/generate-content.mjs).
// Kept separate from content.ts so the generator can overwrite that file
// freely without clobbering type info.

export type NavLink = { href: string; label: string };
export type Cta = { label: string; href: string };

export type Track = {
  title: string;
  durationLabel?: string;
  audioUrl?: string;
};

export type Album = {
  slug: string;
  title: string;
  artist: string;
  year: number;
  status: string;
  coverImageCaption: string;
  blurb: string;
  tracks: Track[];
  musicVideoUrl: string;
  musicVideoCaption: string;
  externalListen: Cta;
};

export type Artist = {
  slug: string;
  name: string;
  role: string;
  imageCaption: string;
  intro: string;
  bio: string;
  cta: Cta;
};

export type SupportTier = {
  name: string;
  title: string;
  description: string;
  note?: string;
};

export type Content = {
  nav: { brand: string; links: NavLink[] };
  hero: {
    eyebrow: string;
    title: string;
    subhead: string;
    ctaPrimary: Cta;
    ctaSecondary: Cta;
    scrollHint: string;
  };
  manifesto: {
    eyebrow: string;
    title: string;
    imageCaption: string;
    paragraphs: string[];
    closing: string;
    cta: Cta;
  };
  music: {
    eyebrow: string;
    title: string;
    intro: string;
    closing: string;
    comingSoonLabel: string;
    tracksComingSoonLabel: string;
    videoComingSoonLabel: string;
  };
  artistsPage: {
    eyebrow: string;
    title: string;
    intro: string;
    viewProfile: string;
  };
  artists: Artist[];
  albums: Album[];
  press: { eyebrow: string; title: string; paragraphs: string[] };
  support: {
    eyebrow: string;
    title: string;
    intro: string[];
    tiers: SupportTier[];
    cta: Cta;
    transparency: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subhead: string;
    fields: { name: string; email: string; subject: string; category: string };
    categories: string[];
    submit: string;
  };
  footer: { copyright: string; social: NavLink[]; disclaimer: string };
};
