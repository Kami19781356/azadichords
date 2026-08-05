// All copy lives here (not inline in JSX) so a future locale is a content
// change, not a component rebuild. English-only for now per the brief.

export const content = {
  nav: {
    brand: "AZADICHORDS",
    links: [
      { href: "#manifesto", label: "Manifesto" },
      { href: "#music", label: "Music" },
      { href: "#films", label: "Films" },
      { href: "#recognition", label: "Recognition" },
      { href: "#artist", label: "The Artist" },
      { href: "#press", label: "Press" },
      { href: "#contact", label: "Contact" },
    ],
  },
  hero: {
    eyebrow: "Independent Music Label — Paris",
    title: "AZADICHORDS",
    subhead: "An independent label for the voice that refuses to be silent.",
    ctaPrimary: { label: "Listen", href: "#music" },
    ctaSecondary: { label: "Our Story", href: "#manifesto" },
    scrollHint: "(Scroll for more)",
  },
  manifesto: {
    eyebrow: "Manifesto",
    title: "A Label Built in Exile",
    imageCaption: "portrait — Kamran Rasoolzadeh, Paris",
    paragraphs: [
      "Azadichords was founded in Paris in 2026 by Kamran Rasoolzadeh — a poet, composer, and filmmaker who spent nearly a decade barred from performing in his own country.",
      "We believe music is one of the last languages that cannot be fully policed. A melody crosses borders that people cannot. A lyric survives censorship that speeches do not.",
      "Azadichords exists for that music — songs written by those who were told to stop writing, sung by voices that were told to go quiet. We are independent by choice, not necessity: no committee decides what we release, and no permission is required for what we say.",
      "This is not a protest label. It is a human one. Some of what we release speaks directly to a moment in history. Most of it speaks, as music always has, to love, loss, and the ordinary weight of being alive.",
    ],
    bio: {
      name: "Kamran Rasoolzadeh",
      text: "Kamran Rasoolzadeh is an Iranian poet, singer-songwriter, and filmmaker. His 2014 album <em>CHESHMAT</em> became one of the defining records of its generation, despite — and in part because of — the restrictions placed on his work. After years of censorship and repeated pressure from state authorities, he left Iran and settled in France, where Azadichords was born.",
    },
  },
  music: {
    eyebrow: "Music",
    title: "Music",
    imageCaption: "CHESHMAT — 2014 album art",
    forthcoming: "A debut album is forthcoming.",
    revisit:
      "In the meantime, revisit <em>CHESHMAT</em> (2014) — the record that started it all.",
    cta: { label: "Listen to CHESHMAT", href: "#" },
    soon: "New music arriving soon.",
  },
  films: {
    eyebrow: "Films & Videos",
    title: "Films & Videos",
    imageCaption: "GAVCHAH — film still",
    filmTitle: "GAVCHAH",
    award: "Best Travel Film — Voronet International Film Festival, 2021",
    soon: "New music videos premiering with the album.",
  },
  recognition: {
    eyebrow: "Recognition",
    title: "Recognition",
    columns: ["Award", "Category", "Year"],
    rows: [
      {
        award: "Iranian Film Festival San Francisco",
        category: "Best Music Video",
        year: "2022",
      },
      {
        award: "Fajr Music Festival",
        category: "Best Songwriting",
        year: "2022",
      },
      {
        award: "Voronet International Film Festival",
        category: "Best Travel Film — GAVCHAH",
        year: "2021",
      },
    ],
  },
  artist: {
    eyebrow: "The Artist",
    title: "The Artist",
    imageCaption: "portrait — Kamran, close crop",
    bio: "Kamran Rasoolzadeh writes, composes, and performs in the space between exile and return. His work has been banned, awarded, and — after years of silence — is beginning again.",
    cta: { label: "Explore the Music →", href: "#music" },
  },
  press: {
    eyebrow: "Press",
    title: "Press",
    paragraphs: [
      "Press materials and interviews will appear here as they're published.",
      "For press inquiries, use the contact form.",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in Touch",
    subhead: "For music, press, or performance inquiries.",
    fields: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      category: "Category",
    },
    categories: ["General", "Press", "Booking", "Licensing"],
    submit: "Send",
  },
  footer: {
    copyright: "AZADICHORDS © 2026 — Paris",
    social: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Spotify", href: "#" },
      { label: "Telegram", href: "#" },
    ],
    disclaimer:
      "Azadichords is an independent label with no affiliation to any political party, movement, or government.",
  },
} as const;
