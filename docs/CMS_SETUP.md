# Decap CMS setup — how login actually works

The CMS admin panel is live at `/admin/` on any deployment of this repo
(e.g. `https://staging.azadichords.com/admin/`). Content lives under
`content/` (`content/pages/*.yml`, `content/artists/*.md`,
`content/releases/*.md`); `scripts/generate-content.mjs` regenerates
`src/lib/content.ts` from it automatically before every `dev`/`build`.

## Why login needs a small proxy (`/api/auth` + `/api/callback`)

Decap CMS's `github` backend — which we use against Gitea, since Gitea
implements a GitHub-compatible REST API — does **not** support a direct
OAuth2 request to the git host, `app_id` or not. Read straight from
Decap's own source: it always opens the popup at
`${base_url}/${auth_endpoint}?provider=github&site_id=...&scope=...`,
the Netlify-CMS-era OAuth-proxy protocol. Gitea's real
`/login/oauth/authorize` endpoint doesn't understand that query shape
at all, so pointing `base_url` straight at Gitea (the original setup)
always failed with "Client ID not registered" — no config tweak fixes
that; a small proxy in between is genuinely required for any git host
other than Netlify's own.

`src/app/api/auth/route.ts` and `src/app/api/callback/route.ts` are
that proxy, hosted right on this Next.js app instead of a separate
service:
- `/api/auth` starts a real OAuth2 authorization-code request against
  Gitea (with the actual `client_id`), storing a CSRF `state` in a
  short-lived cookie.
- `/api/callback` verifies that state, exchanges the returned `code`
  for a token using the Gitea OAuth app's client secret (server-side
  only, never sent to the browser), then serves a tiny HTML page that
  does the exact two-message handshake Decap's popup code expects
  (`authorizing:github` echo, then
  `authorization:github:success:{"token":...}` via `postMessage`).

`public/admin/config.yml`'s backend points `base_url` at this site
itself (`https://staging.azadichords.com`) and `auth_endpoint` at
`api/auth` — not at Gitea directly.

## Gitea OAuth2 Application setup

1. Gitea → your account avatar → Settings → **Applications** →
   "Manage OAuth2 Applications".
2. Name: `Azadichords CMS`.
3. **Redirect URI must be `https://<domain>/api/callback`** — not
   `/admin/`. (If you registered it as `/admin/` earlier, edit it.)
4. Gitea gives you a **Client ID** and **Client Secret**. Set both as
   env vars on the deployed app (Coolify's environment-variables
   panel, not committed to git):
   ```
   GITEA_OAUTH_CLIENT_ID=...
   GITEA_OAUTH_CLIENT_SECRET=...
   ```

## Two unrelated infra issues found while debugging this

- The Gitea service in Coolify only had an `http://` domain
  configured, so Traefik had no HTTPS router for it at all ("no
  available server" on any HTTPS request to the Gitea subdomain, even
  though HTTP worked fine). Fixed by changing the domain to `https://`
  in Coolify and redeploying the service, which made Traefik generate
  the HTTPS router and request its Let's Encrypt cert.
- Once Gitea started redirecting HTTP → HTTPS, anything still using an
  `http://` URL to reach it (this repo's own git remote, and
  Coolify's own git-source URL for the app) started failing
  authentication, since git doesn't follow cross-protocol redirects
  by default. Both needed updating to `https://` explicitly.

## Still open

- **2FA on the Gitea admin account** (from the Master Brief's
  checklist, still open as far as I can tell).
- Update `base_url` in `config.yml` and the OAuth app's redirect URI
  once `azadichords.com` itself (not just staging) is live.

## Extending content later

- **New artist**: add a file to `content/artists/`, or use the CMS.
- **New release** (album/single/EP): add a file to `content/releases/`
  — see `Azadichords_Release_Template.md` for the schema. Sorted by
  `release_date`, newest first; no manual ordering needed.
- **Any page copy**: edit the matching file in `content/pages/`, or
  through the CMS.
