# Decap CMS setup — remaining steps

The CMS admin panel is built and live at `/admin/` on any deployment of this
repo (e.g. `https://staging.azadichords.com/admin/`). What's done vs. what
still needs your action in Gitea:

## Done (this session)

- Content moved out of hardcoded TS into editable files under `content/`:
  - `content/pages/*.yml` — one file per page (nav, home, manifesto, music,
    artists-page, press, support, contact, footer)
  - `content/artists/*.md` — one file per artist (frontmatter + Markdown body
    for the full bio)
  - `content/albums/*.md` — one file per album, including a `tracks` list
    (title/duration/audio URL) and a `musicVideoUrl` field, so track demos,
    music-video embeds, and "Coming Soon" status are all CMS-editable from
    day one
- `scripts/generate-content.mjs` reads all of the above and regenerates
  `src/lib/content.ts` — runs automatically before both `npm run dev` and
  `npm run build` (via `predev`/`prebuild`), so anything edited through the
  CMS and pushed to Gitea is picked up on the next deploy with no manual step
- `public/admin/index.html` + `public/admin/config.yml` — the Decap CMS
  admin app and its collection schema, matching the file structure above
- Verified locally: `/admin/` loads, the config parses with no errors, and
  clicking "Login" correctly opens a popup pointed at your Gitea instance
  (`gitea-dscyrlmmaf5dfm1jzyzkfm7u.178.104.193.74.sslip.io`)

## Done (a later session)

1. **Registered the OAuth2 Application in Gitea** — name `Azadichords
   CMS`, redirect URI `https://staging.azadichords.com/admin/`.
2. **Confirmed `config.yml` needs the Client ID explicitly** — without
   it, Decap's `github` backend assumes `base_url` is itself a
   Decap/Netlify-style OAuth-proxy server and sends a
   `provider=github&site_id=...&scope=repo` query instead of a real
   OAuth2 request, which Gitea rejects with "Client ID not
   registered". Fixed by adding `backend.app_id` to
   `public/admin/config.yml`.
3. Also found and fixed, while debugging the above: the Gitea service
   in Coolify only had an `http://` domain configured, so Traefik had
   no HTTPS router for it at all ("no available server" on any HTTPS
   request to the Gitea subdomain, even though HTTP worked fine).
   Changing the domain to `https://` in Coolify and redeploying the
   service made Traefik generate the HTTPS router + request its
   Let's Encrypt cert.

## Still open

- **2FA on the Gitea admin account** (from the Master Brief's checklist,
  still open as far as I can tell)

## Why `github` as the backend name against a Gitea repo

Gitea implements a GitHub-compatible REST API for the endpoints Decap CMS
needs (contents, refs, OAuth authorize). Decap's `github` backend accepts a
custom `api_root`/`base_url`, so pointing it at your Gitea instance instead
of api.github.com is the standard way to run Decap against self-hosted
Gitea without a separate proxy — this is what the Master Brief's CMS
Architecture section (`Auth: OAuth2 PKCE directly against Gitea's OAuth2
provider`) describes.

## Extending content later

- **New artist**: add a file to `content/artists/`, or use the CMS — it
  appears as a new full profile block in the Artists section of the single
  page (site is one continuous scrolling page with anchor nav, not separate
  routes per section — no code change needed either way).
- **New album / real tracks / a music video**: add or edit a file in
  `content/albums/`. An empty `tracks: []` shows "Tracks arriving soon" on
  the Music page; add entries with `audioUrl` to show a real player. Same
  for `musicVideoUrl` — leave blank for "Music video arriving soon."
- **Any page copy** (Manifesto body, Support tiers, Contact form labels,
  etc.): edit the matching file in `content/pages/`, or through the CMS.
