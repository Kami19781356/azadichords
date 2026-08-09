# Sales + Media — what's built vs. what you still need to set up

Everything below is coded and ready, but **nothing in this list will
actually work until you create the real accounts and drop their keys
into environment variables.** None of these accounts exist yet, per
our last conversation — this is the checklist for when you make them.

Set the variables in Coolify's environment-variables panel for this
app's deployment (not committed to git — see `.env.example` for the
full list with comments). For local testing, copy `.env.example` to
`.env.local`.

## 1. Postgres (orders + moderation queue)

1. In Coolify, add a Postgres service (one-click, same as the Gitea
   setup) if you don't have one yet.
2. Copy its connection string into `DATABASE_URL`.
3. Run the schema once: `psql "$DATABASE_URL" -f sql/schema.sql`
   (or paste `sql/schema.sql`'s contents into whatever SQL console
   Coolify's Postgres service gives you).

## 2. Stripe (Support page checkout)

1. Create a Stripe account (or use an existing one) at
   [dashboard.stripe.com](https://dashboard.stripe.com).
2. **Before going live**, confirm with Stripe that the account is
   approved for this content category — the Sales Process Spec flags
   that politically-sensitive fundraising can get auto-flagged.
   Have a backup processor (PayPal or an EU-based alternative)
   registered and ready in case of a hold — don't depend on Stripe
   alone for tour funding.
3. Create three Products/Prices — one per tier (The Record / The
   Record + The Room / Founding Supporter) — and copy each Price ID
   into `STRIPE_PRICE_ID_TIER_1/2/3`.
4. Copy your Secret key into `STRIPE_SECRET_KEY`.
5. **Enable Stripe Tax** if you want EU VAT charged by the buyer's
   country handled automatically (the spec calls for buyer-country VAT
   on digital goods).
6. Add a webhook endpoint pointing at
   `https://<your-domain>/api/stripe-webhook`, subscribed to
   `checkout.session.completed`. Copy its signing secret into
   `STRIPE_WEBHOOK_SECRET`.
7. Talk to your expert-comptable about the 14-day withdrawal-right
   waiver (already built into the checkout flow as a mandatory
   checkbox — see Sales Process Spec section 4) and invoicing
   requirements for your auto-entrepreneur bookkeeping.

## 3. Brevo (transactional email)

1. Create a Brevo account, verify a sender domain/email.
2. Copy an API key into `BREVO_API_KEY`, and the verified sender
   address into `BREVO_SENDER_EMAIL`.

## 4. Hetzner Object Storage (digital delivery)

1. Create a Hetzner Object Storage bucket (same provider as your VPS).
2. Upload the digital bundle (FLAC + lyric booklet) as one file.
3. Fill in `HETZNER_S3_ENDPOINT`, `HETZNER_S3_ACCESS_KEY`,
   `HETZNER_S3_SECRET_KEY`, `HETZNER_S3_BUCKET`.
4. Update `DIGITAL_DOWNLOAD_OBJECT_KEY` in
   `src/app/api/stripe-webhook/route.ts` to match the actual object
   key you uploaded (currently a placeholder:
   `album/cheshmat-digital-bundle.zip`).

Note on download-attempt limiting: the signed URL expires after 7
days (matching the spec), but S3-compatible presigned URLs don't
support a hard attempt-count cap on their own. If limiting attempts
specifically (not just time) matters to you, that needs a small
counter in the `orders` table checked by a proxy download route —
not built yet; flag it if you want it added.

## 5. Admin — Founding Supporters moderation queue

1. Pick a long random string for `ADMIN_SECRET`.
2. Visit `/admin/founding-supporters?key=<that string>` to review
   opted-in Tier 3 names before they'd ever be shown publicly.
   Anonymous entries (the default) never appear here at all.

**This page uses a shared secret in the URL, not real authentication.**
Fine for one person checking an occasional queue; if this needs to be
more robust later, say so and it can get real auth.

**Not built:** there is no public "Founding Supporters" display page
yet — approving a name here only marks it `approved` in the database.
Say when you want that list rendered somewhere on the site.

## 6. Cloudflare Stream (music video embeds)

1. Create a Cloudflare account, enable Stream.
2. Upload a video, copy its player/iframe embed URL (looks like
   `https://customer-XXXX.cloudflarestream.com/<uid>/iframe`).
3. Paste that URL into the album's `musicVideoUrl` field via the CMS
   (or directly in `content/albums/*.md`).

The video player component (`src/components/VideoPlayer.tsx`) only
mounts the iframe once it's scrolled into view, then autoplays muted
— nothing loads before that.

## 7. Audio track previews

No account needed — just host short (15–30s) preview clips anywhere
reachable by URL (Hetzner Object Storage, same as the digital
delivery bucket, is the natural place) and paste the URL into a
track's `audioUrl` field via the CMS. The waveform player
(`src/components/AudioPlayer.tsx`, using wavesurfer.js) picks it up
automatically — this is exactly the same "add a file, it shows up"
pattern as everything else in the CMS.

**CORS matters here specifically:** wavesurfer.js fetches and decodes
the audio client-side to draw the waveform, which means the bucket
must send `Access-Control-Allow-Origin` for your site's domain (a
plain `<audio>` tag doesn't need this, but this waveform player does).
Set a CORS policy on the Hetzner Object Storage bucket allowing your
domain before pasting in real preview URLs, or the waveform will
silently fail to load (tested this during development against a
third-party test file with no CORS headers — the page didn't crash,
the play button just stayed disabled).

## What's genuinely done and testable right now

- All the UI: tier cards with the withdrawal-right checkbox and
  Tier-3 name opt-in, the audio/video player components, the Thank
  You page, the moderation queue page shell.
- All the server code: `/api/checkout`, `/api/stripe-webhook`, the DB
  schema, the Brevo email call, the Hetzner signed-URL helper.

None of it can complete an actual purchase or send a real email until
the accounts above exist — that's expected, not a bug. `npm run build`
succeeds without any of these env vars set, since nothing touches them
until someone actually clicks "Continue to Payment."
