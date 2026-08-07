# AZADICHORDS — Album Sales Process Specification

**Purpose:** Full end-to-end design for the Support/Pre-order flow — payment, delivery, legal compliance, and the Founding Supporter name-listing safety mechanism.

---

## 1. Customer Journey (what the buyer experiences)

```
1. Visitor lands on /support, reads tier descriptions
2. Selects a tier → clicks "Support" button
3. [If Tier 3] Checkbox appears: "Include my name publicly?" 
   Default: UNCHECKED (anonymous)
4. Redirected to Stripe Checkout (hosted by Stripe — buyer never 
   enters card details on our own site)
5. Before payment confirms: mandatory checkbox —
   "I understand this is digital content and agree to waive my 
   14-day withdrawal right upon delivery." (see Section 4 — 
   legally required, not optional)
6. Payment completes → redirected to a "Thank You" page on 
   staging.azadichords.com
7. Email arrives within minutes:
   - Receipt / invoice (PDF, auto-generated)
   - Secure download link (FLAC + digital lyric booklet) — 
     link expires in 7 days, limited to 5 download attempts
   - [Tier 2] "You'll receive concert details as soon as a date 
     is confirmed" (since no show is booked yet, this can't be 
     instant — see Section 6)
   - [Tier 3] Confirmation of their name-display preference
```

---

## 2. Backend Flow (technical)

```
Stripe Checkout Session created
   ↓
Buyer completes payment on Stripe's hosted page
   ↓
Stripe sends webhook → our server verifies signature
   ↓
Order recorded in database:
   - email, tier, amount, currency, timestamp
   - [Tier 3] name preference (anonymous / named + the name text)
   ↓
Transactional email triggered (receipt + secure download link)
   ↓
Secure download link = signed URL to object storage, 
short expiry, limited attempts (prevents casual link-sharing 
at scale — some sharing is normal for indie releases and isn't 
worth fighting; this just prevents mass redistribution)
   ↓
[Tier 3, opted-in only] Name enters a MODERATION QUEUE — 
NOT auto-published (see Section 5)
```

---

## 3. Technical Decisions Needed (with recommendations)

| Component | Recommendation | Why |
|---|---|---|
| **Payment** | Stripe Checkout (primary) + backup processor on standby | Already discussed — political content can trigger holds; have a fallback ready before launch, not after |
| **Transactional email** | Brevo (EU/French company) | Keeps this piece off US infrastructure too, consistent with the Gitea/self-hosting decisions already made |
| **File storage** | Hetzner Object Storage | Same provider as your existing VPS — one less vendor, one less account to secure |
| **Orders database** | PostgreSQL (Coolify has this as a one-click service, same as we saw in the Gitea setup) | Needed for invoicing, VAT records, and the moderation queue — a git-based "database" isn't appropriate here since this is financial/personal data, not editorial content |
| **Invoice generation** | Stripe's built-in invoicing, or a simple PDF template triggered on webhook | Either works; Stripe's is less code to maintain |

None of these are locked — if you already have a preference (e.g., you've used a different email service for another project), tell me and I'll adjust.

---

## 4. Legal Requirements (France/EU) — verify with your expert-comptable

**This is the one item that actually creates legal risk if skipped:**

Under French/EU consumer law, digital content purchases normally come with a **14-day right of withdrawal** (droit de rétractation). For content delivered immediately (like a download), the seller **must** get explicit, separate consent from the buyer to waive that right *before* the purchase completes — otherwise a buyer could legally demand a refund even after downloading. This has to be a distinct checkbox, not buried in general terms.

**Also needed:**
- VAT charged based on the **buyer's** country, not yours (EU digital goods rule) — Stripe Tax can automate this if enabled
- An invoice (facture) issued for every sale — required for your auto-entrepreneur bookkeeping regardless of amount
- Clear delivery-timeline language since this is a pre-order of unreleased work — avoid promising a specific date; "upon release" is safer than a committed date you might miss

I'd bring this whole section to your expert-comptable in one sitting rather than solving it here — but the checkbox requirement above should go into the build regardless of what else they advise.

---

## 5. Founding Supporter Names — moderation queue, not auto-publish

This is a deliberate extra safety step beyond what's already in v2's anonymous-default design.

**Why manual approval matters here specifically:** an automated pipeline that instantly publishes any name a buyer types creates two risks — a buyer mistyping/mis-consenting without realizing the implication, or someone maliciously entering *another person's* real name to expose them without consent. A human check in between prevents both.

**Flow:**
1. Opted-in name goes into a pending list (in the Postgres orders table, flagged `pending_review`)
2. You review it periodically — from Decap CMS if we wire that up, or directly in a simple admin view
3. Only after your approval does it move to the public "Founding Supporters" display
4. Anonymous entries (the default) never enter this queue at all — they're just counted, never named

---

## 6. About Tier 2's concert ticket

Since no live date exists yet, Tier 2 can't issue an actual ticket at purchase time. The honest approach: confirm the purchase, and email a follow-up once a date is booked, giving Tier 2 supporters first access (a real early-access window, e.g., 48–72 hours before public sale) rather than a literal ticket now.

---

## 7. Budget estimate

| Item | Cost |
|---|---|
| Stripe fees | ~1.5% + €0.25 per transaction (EU cards) |
| Brevo (email) | Free tier covers early volume; ~€15-25/mo once past ~300 emails/day |
| Hetzner Object Storage | ~€5-10/mo for album-scale file storage |
| Postgres on Coolify | Free — self-hosted on your existing server |
| Backup payment processor | Free to register, no cost until used |

Total ongoing cost before any real sales volume: roughly **€20-35/month**.

---

## 8. Build order (for Claude Code)

1. Postgres service in Coolify (orders table)
2. Stripe Checkout integration (3 price IDs, one per tier)
3. Webhook handler + email trigger (Brevo)
4. Object storage + signed URL generation for downloads
5. Withdrawal-right checkbox on the Support page (before Stripe redirect)
6. Moderation queue view for Tier 3 names
7. "Thank You" confirmation page

---

*Hand this alongside v1–v4 to Claude Code once you've confirmed or adjusted the technical decisions in Section 3.*
