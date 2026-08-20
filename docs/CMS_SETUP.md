# Decap CMS setup — how login and saving actually work

The CMS admin panel is live at `/admin/` on any deployment of this repo
(e.g. `https://staging.azadichords.com/admin/`). Content lives under
`content/` (`content/pages/*.yml`, `content/artists/*.md`,
`content/releases/*.md`); `scripts/generate-content.mjs` regenerates
`src/lib/content.ts` from it automatically before every `dev`/`build`.

## Backend: `gitea`, not `github`

`public/admin/config.yml` uses `backend.name: gitea` — Decap CMS's
dedicated Gitea backend, found by reading the actual `decap-cms.js`
bundle source (it isn't documented anywhere obvious, and isn't
mentioned in Decap's own docs site). This matters a lot:

- **`github` backend (the original, wrong setup) writes via GitHub's
  full Git Data API** — create a blob, create a tree, create a
  commit, update the ref. Gitea has never implemented those creation
  endpoints (confirmed by checking Gitea's routing source all the way
  up to its `main` branch — only `GET /blobs/{sha}` exists, no
  `POST`). Every attempt to save an entry failed with a 404 on
  `POST .../git/blobs`, surfaced by Decap as a generic `API_ERROR`.
  No amount of auth/CORS configuration can fix this — the API calls
  it needs simply don't exist on Gitea.
- **`gitea` backend writes via `POST /repos/{owner}/{repo}/contents`**,
  a batch multi-file endpoint Gitea added specifically to make CMS
  tools like this work (`go-gitea/gitea#24887`). Confirmed present in
  our Gitea version (1.27.1) by checking its routing source.
- **`gitea` backend also authenticates differently**: it does a real,
  direct client-side OAuth2 PKCE flow straight against Gitea — no
  separate proxy server needed (unlike `github`, which only ever
  speaks a Netlify-era OAuth-proxy protocol Gitea can't understand,
  which is why an earlier version of this setup had a whole
  `/api/auth` + `/api/callback` proxy pair; that's gone now, it was
  never needed once the backend was corrected).

## Gitea OAuth2 Application setup

1. Gitea → your account avatar → Settings → **Applications** →
   "Manage OAuth2 Applications".
2. Name: `Azadichords CMS`.
3. **Redirect URI must be `https://<domain>/admin/`** — the `gitea`
   backend always redirects back to the current admin page itself
   (`document.location`), not a separate callback route.
4. Copy the **Client ID** into `config.yml`'s `backend.app_id`. No
   client secret is needed or used — this is a public PKCE client, and
   the secret never leaves Gitea's UI.

## Gitea must have CORS enabled for the site's domain

The `gitea` backend's API calls happen directly from the browser (not
proxied through this app), so Gitea needs to send
`Access-Control-Allow-Origin` for the site's domain or every request
gets silently blocked by the browser (shows up as "Failed to fetch").
Three separate things are needed together — found by testing each one
in isolation, since Gitea's own docs don't spell out the interaction
clearly:

```ini
[cors]
ENABLED = true
ALLOW_DOMAIN = https://staging.azadichords.com
# NOT just "staging.azadichords.com" — this build's cors matcher does
# an exact match against the full Origin header (scheme included).
# There's no separate SCHEME key in this Gitea version (1.27.1) —
# don't bother setting GITEA__cors__SCHEME, it does nothing.

[repository]
# A second, differently-scoped switch that's *also* required for the
# general API (not just raw file serving, despite the [repository]
# section name) — see go-gitea/gitea#33216 for the same discovery
# from someone else.
ACCESS_CONTROL_ALLOW_ORIGIN = *
```

Set the `[cors]` keys via the `gitea` service's docker-compose
`environment:` list in Coolify (`GITEA__cors__ENABLED=true`,
`GITEA__cors__ALLOW_DOMAIN=https://staging.azadichords.com`) — **only
new keys get picked up this way**; Gitea's docker entrypoint writes an
env-var-driven value into `app.ini` once and then leaves it alone, so
changing an already-set key via env var and redeploying does nothing
(this cost a lot of back-and-forth to discover). The `[repository]`
key has no corresponding env var in this setup; it was added directly
to `app.ini` inside the running container:
```bash
docker exec gitea-dscyrlmmaf5dfm1jzyzkfm7u sh -c \
  'printf "\n[repository]\nACCESS_CONTROL_ALLOW_ORIGIN = *\n" >> /data/gitea/conf/app.ini'
docker restart gitea-dscyrlmmaf5dfm1jzyzkfm7u
```

## Other infra issues found while debugging all of this

- The Gitea service in Coolify only had an `http://` domain
  configured, so Traefik had no HTTPS router for it at all ("no
  available server" on any HTTPS request to the Gitea subdomain, even
  though HTTP worked fine). Fixed by changing the domain to `https://`
  in Coolify and redeploying the service.
- Once Gitea started redirecting HTTP → HTTPS, anything still using an
  `http://` URL to reach it (this repo's own git remote, Coolify's own
  git-source URL for the app) started failing authentication, since
  git doesn't follow cross-protocol redirects by default. Both needed
  updating to `https://` explicitly (`git remote set-url origin
  https://...` locally; the app's Git Repository URL field in Coolify).

## Still open

- **2FA on the Gitea admin account** (from the Master Brief's
  checklist, still open as far as I can tell).
- Update `base_url`/`app_id`'s redirect registration once
  `azadichords.com` itself (not just staging) is live.

## Extending content later

- **New artist**: add a file to `content/artists/`, or use the CMS.
- **New release** (album/single/EP): add a file to `content/releases/`
  — see `Azadichords_Release_Template.md` for the schema. Sorted by
  `release_date`, newest first; no manual ordering needed.
- **Any page copy**: edit the matching file in `content/pages/`, or
  through the CMS.
