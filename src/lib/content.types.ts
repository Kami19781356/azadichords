// Shape of the generated content object (see scripts/generate-content.mjs).
// Kept separate from content.ts so the generator can overwrite that file
// freely without clobbering type info.

export type Locale = "en" | "fa";

export type NavLink = { href: string; label: string };
export type Cta = { label: string; href: string };

export type ReleaseTrack = {
  trackNumber: number;
  title: string;
  duration?: string;
  previewUrl?: string;
};

export type StreamingLink = { platform: string; url: string };

// A Release is an album, single, or EP — one schema for the whole
// catalog. Sorted by releaseDate (see generate-content.mjs), so the
// newest one is always content.releases[0] — no manual ordering field.
export type Release = {
  slug: string;
  title: string;
  catalogNumber: string;
  type: "album" | "single" | "ep";
  artist: string;
  status: "upcoming" | "out_now";
  releaseDate: string;
  coverImageCaption: string;
  tagline: string;
  description: string;
  demoAudioUrl: string;
  videoUrl: string;
  videoCaption: string;
  tracks: ReleaseTrack[];
  streamingLinks: StreamingLink[];
  supportTierLink: boolean;
  purchaseNote: string;
};

export type RecognitionItem = {
  award: string;
  category: string;
  year: string;
};

// A single optional callout for work that predates the label (e.g.
// Kamran's CHESHMAT) — not a Release, just a bio-adjacent block with
// its own video.
export type PriorWork = {
  title: string;
  description: string;
  videoUrl: string;
};

export type Artist = {
  slug: string;
  name: string;
  role: string;
  badge: string;
  imageCaption: string;
  intro: string;
  bio: string;
  cta: Cta;
  recognition: RecognitionItem[];
  priorWork: PriorWork | null;
};

export type SupportWay = {
  name: string;
  title: string;
  description: string;
  cta: Cta;
};

export type FestivalDate = {
  date: string;
  endDate: string;
  label: string;
  highlight: boolean;
};

export type FestivalCategory = { title: string; description: string };

export type FestivalProgrammeItem = {
  date: string;
  title: string;
  description: string;
};

export type ActivityItem = {
  date: string;
  title: string;
  description: string;
  link?: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type Content = {
  nav: { brand: string; tagline: string; links: NavLink[] };
  hero: {
    eyebrow: string;
    title: string;
    subhead: string;
    ctaPrimary: Cta;
    ctaSecondary: Cta;
    scrollHint: string;
    promoBar: Cta;
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
    demoComingSoonLabel: string;
    listenLabel: string;
    tracksLabel: string;
    videoLabel: string;
    typeLabels: Record<Release["type"], string>;
    getReleaseLabel: string;
    getReleaseNote: string;
    getReleaseCtaLabel: string;
  };
  artistsPage: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  artists: Artist[];
  releases: Release[];
  activityPage: {
    eyebrow: string;
    title: string;
    intro: string;
    emptyStateNote: string;
  };
  activity: ActivityItem[];
  press: { eyebrow: string; title: string; paragraphs: string[] };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ServiceItem[];
    cta: Cta;
  };
  submissions: {
    eyebrow: string;
    title: string;
    intro: string;
    guidelines: string[];
    note: string;
    cta: Cta;
  };
  support: {
    eyebrow: string;
    title: string;
    intro: string[];
    ways: SupportWay[];
    transparency: string;
  };
  festival: {
    eyebrow: string;
    title: string;
    intro: string[];
    datesTitle: string;
    dates: FestivalDate[];
    categoriesTitle: string;
    categories: FestivalCategory[];
    entryTitle: string;
    entrySteps: string[];
    entryFee: string;
    programmeTitle: string;
    programme: FestivalProgrammeItem[];
    juryTitle: string;
    juryText: string;
    venueTitle: string;
    venueText: string;
    cta: Cta;
    ctaNote: string;
    detailsLabel: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subhead: string;
    fields: {
      name: string;
      email: string;
      subject: string;
      category: string;
      message: string;
    };
    categories: string[];
    submit: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
  };
  footer: { copyright: string; social: NavLink[]; disclaimer: string };
};
