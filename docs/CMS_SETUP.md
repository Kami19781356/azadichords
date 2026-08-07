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

## Still needed from you (Gitea admin access required — I don't have it)

1. **Register the OAuth2 Application in Gitea**
   - Log into Gitea as admin → Site Administration → Applications (or your
     own account → Settings → Applications, depending on Gitea version)
   - Application name: `Azadichords CMS`
   - Redirect URI: `https://staging.azadichords.com/admin/` (add the
     production URL too once `azadichords.com` itself is live)
   - If Gitea gives you the option, use a **public client** (no client
     secret) since this is a PKCE flow with no server-side proxy
   - Gitea will hand you a **Client ID** after saving

2. **Confirm whether `config.yml` needs that Client ID**
   - I could not complete a real OAuth handshake from here (no Gitea login),
     so I can't 100% confirm whether Decap's `github`-backend-against-Gitea
     setup needs the Client ID added to `public/admin/config.yml` explicitly
     (some Decap versions expect it under `backend.app_id`, others infer it
     from the redirect). **Test the login button on staging after step 1** —
     if it errors instead of completing login, add:
     ```yaml
     backend:
       ...
       app_id: <client id from Gitea>
     ```
     to `public/admin/config.yml`, commit, and retest.

3. **2FA on the Gitea admin account** (from the Master Brief's checklist,
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

- **New artist**: add a file to `content/artists/`, or use the CMS —
  it appears on `/artists` and gets its own `/artists/[slug]` page
  automatically (no code change).
- **New album / real tracks / a music video**: add or edit a file in
  `content/albums/`. An empty `tracks: []` shows "Tracks arriving soon" on
  the Music page; add entries with `audioUrl` to show a real player. Same
  for `musicVideoUrl` — leave blank for "Music video arriving soon."
- **Any page copy** (Manifesto body, Support tiers, Contact form labels,
  etc.): edit the matching file in `content/pages/`, or through the CMS.
