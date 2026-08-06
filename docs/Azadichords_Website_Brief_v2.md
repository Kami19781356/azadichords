# AZADICHORDS — Website Content Brief v2 (Corrected)

**Supersedes:** Azadichords_Website_Brief.md (v1) for content — v1's Section 5 (animation/tech spec) still stands unchanged.
**Key fix in this version:** Removed all filmmaking/cinema content — this is a MUSIC label site. YOUALITY (film) and Azadichords (music) stay fully separate, per earlier brand-separation decision.

---

## 1. What Changed From v1

- ❌ Removed "Films & Videos" as a standalone section
- ❌ Removed "Best Travel Film — Voronet 2021 (GAVCHAH)" from Recognition table — that's a YOUALITY/filmmaking credit, not music
- ❌ Removed "filmmaker" from Kamran's bio on this site — identity here is poet/composer/singer-songwriter only
- ✅ Added new **Support** section (pre-order / direct-to-fan funding)
- ✅ Added CMS technical architecture appendix for Claude Code

---

## 2. Updated Sitemap

1. Home
2. Manifesto (About)
3. Music
4. Recognition
5. The Artist
6. Press
7. **Support** *(new)*
8. Contact

*Nav is now 8 items — if visually cramped in the actual build, Recognition can collapse into a small credibility strip within Music or Press instead of its own nav slot. That's a layout call, not a content one.*

---

## 3. Section Copy — Only What Changed

### MANIFESTO — corrected founder bio

> Kamran Rasoolzadeh is an Iranian poet, composer, and singer-songwriter. His 2014 album *CHESHMAT* became one of the defining records of its generation, despite — and in part because of — the restrictions placed on his work. After years of censorship and repeated pressure from state authorities, he left Iran and settled in France, where Azadichords was born.

*(Everything else in Manifesto is unchanged from v1.)*

---

### MUSIC — small addition (videos now live here, not a separate section)

> A debut album is forthcoming.
>
> In the meantime, revisit *CHESHMAT* (2014) — the record that started it all.
>
> New music — including official videos — arriving soon.

---

### RECOGNITION — corrected table (music-only)

| Award | Category | Year |
|---|---|---|
| Iranian Film Festival San Francisco | Best Music Video | 2022 |
| Fajr Music Festival | Best Songwriting | 2022 |

*Two rows is fine — every row here is now 100% music-relevant. It grows honestly as the album releases.*

---

### THE ARTIST — unchanged (already had no cinema content)

> Kamran Rasoolzadeh writes, composes, and performs songs shaped by exile and return. His work has been banned, awarded, and — after years of silence — is beginning again.
>
> [ Explore the Music → ]

---

## 4. NEW SECTION — Support

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

> ⚠️ **Build requirement, not public copy:** Tier 3 must default to anonymous. Do not pre-fill or suggest real-name display. This protects supporters who may have family in Iran or travel through countries where association with this project could carry risk. Opt-in only, with the implication briefly explained at the point of choice.

**Payment processing note (for Claude Code, not public copy):**

> Primary: Stripe. Before launch, confirm the account is approved for this content category (some processors auto-flag politically-sensitive fundraising). Keep a backup processor (PayPal or a EU-based alternative) ready in case of an account hold — do not depend on a single processor for tour funding.

**Transparency line (public copy, place near the tiers):**

> All proceeds go directly to production and live performance costs. No intermediary, no committee.

---

## 5. Internal Note — Grants & Sponsorship (not site copy)

Before building a pitch deck around these:

- **Freemuse / Artist at Risk Connection** — verify actual mechanism first; these often provide advocacy or relocation support rather than direct project grants. Confirm before promising this funding path in any pitch deck.
- **French regional cultural grants (DRAC, etc.)** — often require an applying *structure* (e.g., an association loi 1901), not just an individual auto-entrepreneur. May need a lightweight nonprofit association (~€75-150, fast to set up) separate from YOUALITY SAS, specifically for touring/cultural-grant purposes.
- **Diaspora associations & Iranian-European businesses** — realistic, low-friction, matches the concert-validation strategy already discussed (Paris pilot → data → wider ask).

Pitch deck (project proposal PDF) is a good next deliverable once the above is verified — happy to build it once you confirm which grant paths are actually viable.

---

## 6. CMS Architecture (for Claude Code)

```
Content storage: Markdown/YAML files inside a Git repo — not a database.

Git hosting: Self-hosted Gitea instance on the existing Hetzner VPS 
(same infrastructure as youality.fr — Coolify + Traefik stack).
→ Confirm Gitea version is 1.19+ (required for OAuth2 PKCE support).

CMS: Decap CMS (open-source, git-based, formerly Netlify CMS).

Auth: OAuth2 with PKCE directly against Gitea's built-in OAuth2 
provider.
- No separate OAuth proxy or server needed — this is the point of 
  PKCE for public clients.
- Register Azadichords CMS as an OAuth2 Application in Gitea admin 
  settings; redirect URI points to /admin/ on the deployed site.

Explicitly NOT using:
- GitHub (avoid dependency on US-based platform subject to 
  subpoena/takedown for a politically-sensitive project)
- Strapi (unnecessary complexity/attack surface at current scale — 
  one label, one artist, low content-update frequency; revisit only 
  if roster grows with complex relational content needs)
- Netlify Identity (same reasoning as avoiding GitHub — keep auth 
  self-hosted on Gitea, not a third-party US platform)
```

---

## 7. Handoff Checklist

- [ ] Confirm Gitea version ≥ 1.19 on the VPS
- [ ] Register OAuth2 Application in Gitea for Decap CMS
- [ ] Remove Films/Videos component and route from current build
- [ ] Update Recognition data (2 rows, music-only)
- [ ] Update Manifesto bio copy (remove "filmmaker")
- [ ] Build new Support/Pre-order page with anonymous-default Tier 3
- [ ] Set up Stripe + confirm backup payment processor
- [ ] Reference v1 brief Section 5 for animation/interaction spec (unchanged)

---

*This document + Azadichords_Website_Brief.md (v1) together are the complete handoff package for Claude Code.*
