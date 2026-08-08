# AZADICHORDS — Website Master Brief (Final, Consolidated)

**This document replaces v1, v2, v3-patch, and v4-patch.** Everything from those four is merged here into final form — no patch instructions, just the finished content and specs, ready to build.

**Companion documents (still separate, hand these alongside this one):**
- `Azadichords_Sales_Process_Spec.md`
- `Azadichords_SEO_MediaPreview_Spec.md`

**Current infrastructure status:**
- Gitea live and running (v1.27.1) on the Hetzner VPS
- Repository `azadichords-site` created (private), code pushed, deploying successfully
- `staging.azadichords.com` live with valid SSL
- Next.js + TypeScript + Tailwind confirmed as the stack in use

---

## 1. Brand Overview

Azadichords is an independent Persian-founded music label based in Paris. The site's job is to read as **an institution first** — a real, operating label built to sign and grow with multiple artists — with Kamran Rasoolzadeh, its first artist, presented as content the label houses, not as the site's central character.

**Tagline: "The Voice of Freedom."** *Azadi* is Persian for "freedom" — the tagline both states the label's mission and translates the name for non-Persian readers. Place it as a small line beneath the AZADICHORDS wordmark in the nav (not competing with the existing hero subheading, which stays as-is).

**Tone:** Literary, restrained, serious. No agency sales language, no overt political sloganeering — the site speaks in human terms (silence, exile, voice), never in accusations or names. No filmmaking content anywhere on this site — that identity belongs to youality.fr, kept fully separate.

---

## 2. Sitemap (final — 10 standalone routes)

**Architecture (confirmed):** Home (`/`) is a full-scroll narrative experience with anchor links between sections, for first-time visitors reading the whole story in sequence. Every section also exists as its own standalone route — clicking any nav item navigates to that dedicated URL, not just an anchor jump. This gives full SEO/sharing benefit to every page, including Activity, Services, and Submissions.

1. **Home** (`/`) — hero statement + tagline + full-scroll version of everything below
2. **Manifesto** (`/manifesto`) — label philosophy, origin story
3. **Music** (`/music`) — the label's output (currently pre-release)
4. **Artists** (`/artists` — confirm exact slug with Claude Code) — growth-framed intro + Kamran's full bio + Recognition
5. **Activity** (`/activity`) — timeline/milestone log
6. **Press** (`/press`) — empty shell, ready to populate
7. **Services** (`/services`) — "What the Label Offers," for prospective artists
8. **Submissions** (`/submissions`) — "For the Next Voice," open call for artist submissions
9. **Support** (`/support`) — pre-order / direct-to-fan funding
10. **Contact** (`/contact`) — form (now includes "Submission" category)

**SEO implication:** all 10 routes need their own metadata + JSON-LD per the SEO spec — this is now confirmed to include `/activity`, `/services`, and `/submissions` too, not just the original 7. `/submissions` in particular should be written to rank for "Persian independent label accepting submissions"-type searches, since it's a real, independently reachable page.

---

## 3. Final Section-by-Section Copy

### HOME (Hero)

```
AZADICHORDS

An independent label for the voice that refuses to be silent.

[ Listen ]   [ Our Story ]
```

---

### MANIFESTO

**Header:** A Label Built in Exile

**Body:**

> Azadichords began with an album — a record that needed a home beyond permission: no committee, no censor, no government approval required. So one was built, in Paris, in 2026.
>
> We believe music is one of the last languages that cannot be fully policed. A melody crosses borders that people cannot. A lyric survives censorship that speeches do not.
>
> Azadichords exists for that music — songs written by those who were told to stop writing, sung by voices that were told to go quiet. We are independent by choice, not necessity: no committee decides what we release, and no permission is required for what we say.
>
> This is not a protest label. It is a human one. Some of what we release speaks directly to a moment in history. Most of it speaks, as music always has, to love, loss, and the ordinary weight of being alive.

**Closing:**

> That first album belongs to Kamran Rasoolzadeh — poet, composer, and the label's first artist.
>
> [ Meet the Artist → ]

**Note:** No album title or release date is named here or anywhere on the public site. "An album" stays generic until closer to launch — the site never gets ahead of the release strategy.

---

### MUSIC

**Header:** Music

> This label exists because of one record — Azadichords' debut release, forthcoming from its first artist, Kamran Rasoolzadeh.
>
> Before Azadichords, Kamran composed and produced *CHESHMAT* (2014) for vocalist Mehrnoosh — a record that shaped a generation, and drew the attention that would eventually silence him. His music video *Freedom* — a meditation on liberation as the foundation of a free society — later won Best Music Video at festivals in San Francisco, Seoul, and Kazan.
>
> [ Listen to CHESHMAT → ]
>
> The label's first release — including official videos — arrives soon.

**Correction note:** CHESHMAT was composed and produced by Kamran; vocals were performed by Mehrnoosh. Do not credit Kamran as the singer on this specific release — this was an error in the earlier draft.

**Build note:** This page hosts the audio preview player (see `Azadichords_SEO_MediaPreview_Spec.md`) once the first single/teaser clip is ready. Build the player component now; populate with real audio when available.

---

### ARTISTS

**Header:** Artists

**Section intro (new — reflects the label's growth ambition):**

> Azadichords is built to grow beyond a single voice. It begins with one artist — more will join as the label expands.

**Kamran Rasoolzadeh subsection:**

*Role line:* Poet, Composer, Singer-Songwriter

*Intro:*

> Kamran Rasoolzadeh writes, composes, and performs songs shaped by exile and return. His work has been banned, awarded, and — after years of silence — is beginning again.

*Full bio (corrected):*

> Kamran Rasoolzadeh is an Iranian poet, composer, and singer-songwriter. His poetry has topped bestseller lists in Iran for over a decade. In 2014, he composed and produced *CHESHMAT* for vocalist Mehrnoosh — an album that became one of the defining records of its generation, despite, and in part because of, the restrictions placed on the work. After years of censorship and repeated pressure from state authorities, he left Iran and settled in France, where he now lives and works.

**Subsection — Recognition (expanded with verified awards):**

| Award | Category | Year |
|---|---|---|
| Iranian Film Festival San Francisco | Best Music Video — *Freedom* | 2022 |
| K-Music and Arts Film Festival, Seoul | Best Music Video — *Freedom* | 2022 |
| ZILANT International Film Festival | Best Music Video — *Freedom* | 2022 |
| Fajr Music Festival | Best Songwriting | 2022 |

*Possible addition pending confirmation:* Sepanta Award for Best Music Video (also for *Freedom*) — year not yet confirmed, add once verified.

**Closing:**

> [ Explore the Music → ]

---

### ACTIVITY (new section — live on site, not in earlier drafts)

**Header:** Activity

> A running record of where Azadichords has been — performances, releases, and the milestones along the way.
>
> Azadichords is early. This record starts with the first release and the first show — both are still ahead.

---

### SERVICES — "What the Label Offers" (new section — live on site, not in earlier drafts)

**Header:** What the Label Offers

> Beyond release, Azadichords works alongside the artists it houses at every stage a record needs before it reaches an audience.

**Production & Mixing** — Studio time, arrangement, and audio engineering support, from first draft to final master.

**Distribution** — Placing the work on every major platform, worldwide, under the artist's own name.

**Visual Identity** — Album art, music videos, and the visual language that carries a record beyond its audio.

**Live Performance** — From a first show to a touring itinerary — the logistics behind bringing a record to a stage.

**Licensing & Publishing** — Protecting the work and placing it commercially, on terms the artist understands and agrees to.

> [ Working on something that belongs here? Get in Touch → ]

---

### SUBMISSIONS — "For the Next Voice" (new section — live on site, not in earlier drafts)

**Header:** For the Next Voice

> Azadichords exists for music that needed a home beyond permission. If that describes your work, we want to hear it.

- 2–3 tracks, in their current form — polished or not.
- A few sentences about the work and the story behind it.
- No press kit, no pitch deck. Just the music.

> Submissions are reviewed as time allows. Not every submission gets a reply — but every one gets heard.
>
> [ Submit Your Work → ]

**Note:** Contact form's Category dropdown now includes "Submission" alongside General / Press / Booking / Licensing.

---

### PRESS

**Header:** Press

> Press materials and interviews will appear here as they're published.
>
> For press inquiries, use the contact form.

---

### SUPPORT

**Header:** Support the Project

**Intro:**

> Azadichords is fully independent — no committee, no gatekeeper, no institutional funding. That independence is made possible directly by the people who choose to support it.
>
> Every contribution on this page goes directly toward bringing this music to a stage — production, travel, and the first live performances across Europe.

**Tiers:**

```
TIER 1 — The Record
High-resolution digital album (FLAC + lossless) plus a digital lyric 
booklet with the story behind each song.

TIER 2 — The Record + The Room
Everything in Tier 1, plus a ticket (or priority access) to the 
first live performance.

TIER 3 — Founding Supporter
Everything in Tier 2, plus recognition as an early supporter of 
independent art.

→ By default, founding supporters are listed anonymously 
  ("A Founding Supporter"). If you would prefer your name included 
  instead, you can opt in during checkout — entirely your choice.
```

**Transparency line:**

> All proceeds go directly to production and live performance costs. No intermediary, no committee.

**Build requirements (not public copy — see full detail in Sales Process Spec):**
- Tier 3 defaults to anonymous; opted-in names go to a moderation queue, not auto-published
- Mandatory withdrawal-right waiver checkbox before Stripe redirect (French/EU legal requirement)
- Stripe primary + backup payment processor on standby

---

### CONTACT

**Header:** Get in Touch

> For music, press, or performance inquiries.

**Form fields:** Name, Email, Subject, Category (dropdown: General / Press / Booking / Licensing)

No personal email or phone number displayed anywhere on the page. Fallback address if needed: `contact@azadichords.com`.

---

### FOOTER

```
AZADICHORDS © 2026 — Paris

[Instagram] [YouTube] [Spotify] [Telegram]

Azadichords is an independent label with no affiliation
to any political party, movement, or government.
```

---

## 4. Design System

- **Palette:** Black (`#0A0A0A`), off-white (`#F5F3EF`), one accent used sparingly — deep garnet (`#7A1F2B`) or muted gold (`#C9A227`).
- **Typography:** Bold display serif/grotesk for headlines, clean sans for body copy.
- **Imagery:** High-contrast editorial photography/portraits, full-bleed.

---

## 5. Technical Build Brief — Animation & Interaction

```
Build a modern, editorial-style label website in React + Tailwind CSS 
+ Framer Motion, based on the interaction patterns of Framer's 
"Mōno X" template, adapted for a music label — content and sitemap 
above.

1. Smooth Scroll Reveals:
   - Elements fade in with a slight upward slide 
     (translateY: 20px → 0, opacity: 0 → 1) as they enter viewport,
     using Framer Motion `whileInView`.
   - Stagger children within sections (~80-120ms delay between items).

2. Interactive Cards & Hover Effects:
   - Cards scale slightly on hover (scale: 1.02),
     easing `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Images inside cards get an inner zoom/pan on hover; 
     container stays rounded and clips overflow.

3. Seamless Section/Page Transitions:
   - Navigation transitions without full reloads — use 
     AnimatePresence + route-based animated content switching.

4. Sticky/Layered Scroll (bento-style):
   - Structured grid sections with clean borders, high-contrast 
     dark/light blocks, sticky headers where appropriate.

5. Accessibility — Reduced Motion:
   - Respect `prefers-reduced-motion`: fall back to simple 
     opacity fades with no translate/scale.

6. i18n-Ready Architecture (English-only at launch):
   - Store all copy in a single content object/JSON file, not 
     hardcoded inline in JSX — adding Persian later becomes a 
     content change, not a component rebuild.
   - Use CSS logical properties (margin-inline-start, not 
     margin-left) throughout, so RTL support later is a 
     stylesheet-level change.

7. Performance for Self-Hosting:
   - Deploys to self-hosted infrastructure (Coolify/Traefik/Hetzner),
     not a CDN-backed platform: serve images as WebP/AVIF with 
     lazy-loading, use Next.js `<Image>` component throughout.
```

---

## 6. CMS Architecture

```
Content storage: Markdown/YAML files inside the Git repo — 
not a database.

Git hosting: Self-hosted Gitea (LIVE — v1.27.1, confirmed working) 
on the Hetzner VPS, same infrastructure as youality.fr.

CMS: Decap CMS (open-source, git-based) — NOT YET BUILT.

Auth: OAuth2 with PKCE directly against Gitea's built-in OAuth2 
provider (Gitea 1.27.1 fully supports this — no version concern).
- No separate OAuth proxy/server needed.
- Register Azadichords CMS as an OAuth2 Application in Gitea admin 
  settings; redirect URI points to /admin/ on the deployed site.

Explicitly NOT using:
- GitHub (avoid dependency on a US-based platform subject to 
  subpoena/takedown for a politically-sensitive project)
- Strapi (unnecessary complexity/attack surface at current scale)
- Netlify Identity (same reasoning as avoiding GitHub)
```

---

## 7. Current Handoff Checklist

**Infrastructure (done):**
- [x] Gitea installed, running, admin account created
- [x] Self-registration disabled
- [x] Repository private, code pushed successfully
- [x] `staging.azadichords.com` live with valid SSL

**Infrastructure (remaining):**
- [ ] 2FA enabled on the Gitea admin account
- [ ] OAuth2 Application registered in Gitea for Decap CMS
- [ ] Decap CMS admin panel built and wired up

**Content (this document — ready to implement):**
- [ ] All section copy above implemented exactly as written
- [ ] Nav reduced to 7 items (Recognition folded into The Artist)
- [ ] No filmmaking content anywhere on the site

**Sales process** (see `Azadichords_Sales_Process_Spec.md`):
- [ ] Postgres service on Coolify
- [ ] Stripe Checkout (3 tiers) + backup processor registered
- [ ] Brevo transactional email
- [ ] Hetzner Object Storage for digital delivery
- [ ] Withdrawal-right checkbox
- [ ] Tier 3 moderation queue

**SEO & Media** (see `Azadichords_SEO_MediaPreview_Spec.md`):
- [ ] Metadata + JSON-LD structured data per page
- [ ] Sitemap.xml, robots.txt
- [ ] OG share image (1200×630) — needs to be supplied
- [ ] Audio preview player (wavesurfer.js)
- [ ] Cloudflare Stream account + video player component

**Not yet done — decide before launch:**
- [ ] Point root domain `azadichords.com` to the same deployment (currently only `staging.` is live), or keep them separate until full public launch

---

*This is the single source of truth for site content going forward. Any future content change should update this document directly rather than creating another patch file.*
