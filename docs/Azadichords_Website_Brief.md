# AZADICHORDS — Website Content & Build Brief

**Prepared:** May 2026
**Status:** Full site, launching now with current (pre-album) content
**Language:** English only for this phase
**Stack target:** React + Tailwind CSS + Framer Motion (frontend) → later paired with backend/hosting by Claude Code

---

## 1. Brand Overview

Azadichords is an independent Persian music label founded in Paris by Kamran Rasoolzadeh — poet, composer, singer, and filmmaker. The site's job is to establish credibility and gravity *before* the debut album drops: this is not a startup pitch deck, it's an artist's home.

**Tone:** Literary, restrained, serious. No agency sales language ("book a call," "grow your brand"). No overt political sloganeering — the site speaks in human terms (silence, exile, voice), not in accusations or names. This keeps it legally safer and artistically stronger.

**What NOT to borrow from the Mōno X template:** pricing plans, "book a call" CTAs, client-logo grid, team-hiring language. These are agency-specific and have no place here.

**What TO borrow:** bold typography reveals, high-contrast editorial imagery, scroll-triggered fade/slide reveals, card hover-scale, sticky split-panel storytelling, the Awards table pattern (repurposed with real awards below).

---

## 2. Sitemap

1. **Home** — hero statement
2. **Manifesto** (About) — label story + founder bio
3. **Music** — discography (currently: CHESHMAT reference + "forthcoming" note)
4. **Films & Videos** — existing award-winning short film + "coming with the album" note
5. **Recognition** (Awards) — real awards, repurposed from template's awards-table pattern
6. **The Artist** — Kamran's profile (singular — no roster implication)
7. **Press** — empty shell, ready to populate
8. **Contact** — form only, no exposed personal contact info

---

## 3. Section-by-Section Copy

### HOME (Hero)

```
AZADICHORDS

An independent label for the voice that refuses to be silent.

[ Listen ]   [ Our Story ]
```

*Design note: this should be the boldest typographic moment on the site — treat "AZADICHORDS" the way the template treats "Mōno™ Studio." Full-bleed, oversized, first thing seen.*

---

### MANIFESTO (About)

**Header:** A Label Built in Exile

**Body copy:**

> Azadichords was founded in Paris in 2026 by Kamran Rasoolzadeh — a poet, composer, and filmmaker who spent nearly a decade barred from performing in his own country.
>
> We believe music is one of the last languages that cannot be fully policed. A melody crosses borders that people cannot. A lyric survives censorship that speeches do not.
>
> Azadichords exists for that music — songs written by those who were told to stop writing, sung by voices that were told to go quiet. We are independent by choice, not necessity: no committee decides what we release, and no permission is required for what we say.
>
> This is not a protest label. It is a human one. Some of what we release speaks directly to a moment in history. Most of it speaks, as music always has, to love, loss, and the ordinary weight of being alive.

**Founder bio (subsection):**

> Kamran Rasoolzadeh is an Iranian poet, singer-songwriter, and filmmaker. His 2014 album *CHESHMAT* became one of the defining records of its generation, despite — and in part because of — the restrictions placed on his work. After years of censorship and repeated pressure from state authorities, he left Iran and settled in France, where Azadichords was born.

*Note: intentionally excludes PhD/patent credentials — those belong to YOUALITY's bio, not Azadichords'. Keeping this bio purely artistic keeps the brand coherent.*

---

### MUSIC

**Header:** Music

> A debut album is forthcoming.
>
> In the meantime, revisit *CHESHMAT* (2014) — the record that started it all.

[Embed or link: CHESHMAT on Spotify/YouTube]

> New music arriving soon.

*No release dates, no track titles, no hints at subject matter. This section stays deliberately quiet until singles actually drop — the site should never be ahead of the release strategy.*

---

### FILMS & VIDEOS

**Header:** Films & Videos

> **GAVCHAH** — Best Travel Film, Voronet International Film Festival, 2021

[Embed or link if a public version exists]

> New music videos premiering with the album.

---

### RECOGNITION (Awards)

**Header:** Recognition

| Award | Category | Year |
|---|---|---|
| Iranian Film Festival San Francisco | Best Music Video | 2022 |
| Fajr Music Festival | Best Songwriting | 2022 |
| Voronet International Film Festival | Best Travel Film — *GAVCHAH* | 2021 |

*Direct reuse of the template's Awards table component — just swap in real data. This is the one section that maps almost perfectly from agency template to label site.*

---

### THE ARTIST

**Header:** The Artist

[Portrait photo]

> Kamran Rasoolzadeh writes, composes, and performs in the space between exile and return. His work has been banned, awarded, and — after years of silence — is beginning again.

[ Explore the Music → ]

*Deliberately singular ("The Artist," not "Artists" or "Roster"). No language implying expansion or a growing lineup.*

---

### PRESS

**Header:** Press

> Press materials and interviews will appear here as they're published.
>
> For press inquiries, use the contact form.

---

### CONTACT

**Header:** Get in Touch

> For music, press, or performance inquiries.

**Form fields:**
- Name
- Email
- Subject
- Category (dropdown: General / Press / Booking / Licensing)

*No personal email or phone number displayed anywhere on the page. A form only. If a fallback address is needed, use `contact@azadichords.com` — never a personal address or number.*

---

### FOOTER

```
AZADICHORDS © 2026 — Paris

[Instagram] [YouTube] [Spotify] [Telegram]

Azadichords is an independent label with no affiliation
to any political party, movement, or government.
```

*This last line is a deliberate legal/positioning choice, not boilerplate: it keeps Azadichords framed as an artistic project speaking to a human experience, not as the mouthpiece of an organized political faction. This distinction matters both for how press and audiences read the label, and for how it reads to anyone monitoring it.*

---

## 4. Design System (starting point — final call is yours)

- **Palette:** Black (`#0A0A0A`), off-white (`#F5F3EF`), one accent used sparingly — suggest a deep garnet (`#7A1F2B`) or muted gold (`#C9A227`) rather than bright red, to avoid any unintended violent/literal association given the content's subject matter.
- **Typography:** One bold display serif or grotesk for headlines (mirroring the template's oversized "Mōno™" treatment), one clean sans for body copy.
- **Imagery:** High-contrast editorial photography/portraits, full-bleed — consistent with the template's fashion-magazine feel, but the human subject is Kamran himself, not stock models.

---

## 5. Technical Build Brief (for Claude / Claude Code)

Refined version of the original animation spec, with three additions flagged below.

```
Build a modern, editorial-style artist/label website in 
React + Tailwind CSS + Framer Motion, based on the interaction 
patterns of Framer's "Mōno X" template, adapted for a music label
(not an agency) — content and sitemap provided separately in this brief.

1. Smooth Scroll Reveals:
   - Elements fade in with a slight upward slide 
     (translateY: 20px → 0, opacity: 0 → 1) as they enter viewport,
     using Framer Motion `whileInView`.
   - Stagger children within sections (~80-120ms delay between items).

2. Interactive Cards & Hover Effects:
   - Project/video cards scale slightly on hover (scale: 1.02),
     easing `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Images inside cards get an inner zoom/pan on hover; 
     container stays rounded and clips overflow.

3. Seamless Section/Page Transitions:
   - Navigation (Home, Manifesto, Music, Films, Recognition, 
     The Artist, Press, Contact) transitions without full reloads — 
     use AnimatePresence + route-based animated content switching.

4. Sticky/Layered Scroll (bento-style):
   - Structured grid sections with clean borders, high-contrast 
     dark/light blocks, sticky headers where appropriate 
     (e.g., Manifesto section split-panel storytelling).

5. [ADDED] Accessibility — Reduced Motion:
   - Respect `prefers-reduced-motion`: fall back to simple 
     opacity fades with no translate/scale for users who 
     have this OS setting enabled.

6. [ADDED] i18n-Ready Architecture (even though English-only at launch):
   - Store all copy in a single content object/JSON file, not 
     hardcoded inline in JSX. This costs nothing now and means 
     adding Persian (or any language) later is a content change,
     not a component rebuild.
   - Use CSS logical properties (margin-inline-start, not 
     margin-left) throughout, so RTL support later is a 
     stylesheet-level change, not a layout rewrite.

7. [ADDED] Performance for Self-Hosting:
   - Since this deploys to your own server (Coolify/Traefik/Hetzner
     stack), not Framer's CDN: serve images as WebP/AVIF with 
     lazy-loading, and keep the editorial full-bleed photography 
     compressed without visible quality loss.
```

---

## 6. Suggested Workflow

1. **Review this brief** — confirm copy, palette direction, section order.
2. **Hand this + the technical spec to Claude** for frontend scaffolding (React components, Tailwind, Framer Motion per spec above).
3. **Once frontend is built,** bring it into a session with Claude Code for backend/deployment work — connecting the contact form, hosting on your existing Hetzner/Coolify setup, and wiring up `azadichords.com` DNS (already configured).
4. **Populate Music/Films/Press sections** as singles and coverage actually happen — the site should always trail the release strategy, never lead it.

---

*This document is a starting point. Copy, palette, and structure are all editable — you're the director here.*
