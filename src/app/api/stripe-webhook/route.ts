import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getPool } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/brevo";
import { createDownloadUrl } from "@/lib/storage";
import type Stripe from "stripe";

// Object key for the current release's digital delivery. Update this
// once real album files are uploaded to Hetzner Object Storage.
const DIGITAL_DOWNLOAD_OBJECT_KEY = "album/cheshmat-digital-bundle.zip";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook is not configured (STRIPE_WEBHOOK_SECRET missing)." },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const tier = session.metadata?.tier ?? "tier1";
  const nameOptIn = session.metadata?.nameOptIn === "true";
  const supporterName = session.metadata?.supporterName || null;
  const email = session.customer_details?.email ?? session.customer_email;

  if (!email) {
    console.error("checkout.session.completed had no buyer email", session.id);
    return NextResponse.json({ received: true });
  }

  const pool = getPool();
  await pool.query(
    `insert into orders
       (stripe_session_id, email, tier, amount_total, currency, name_opt_in, supporter_name, moderation_status)
     values ($1, $2, $3, $4, $5, $6, $7, $8)
     on conflict (stripe_session_id) do nothing`,
    [
      session.id,
      email,
      tier,
      session.amount_total ?? 0,
      session.currency ?? "eur",
      nameOptIn,
      supporterName,
      // Anonymous entries (the default) never enter the moderation
      // queue — only opted-in names do. (Sales Process Spec, section 5.)
      tier === "tier3" && nameOptIn ? "pending_review" : "none",
    ],
  );

  try {
    const downloadUrl = await createDownloadUrl(DIGITAL_DOWNLOAD_OBJECT_KEY);
    const tierLines: Record<string, string> = {
      tier2: "<p>You'll receive concert details as soon as a date is confirmed.</p>",
      tier3: `<p>${
        nameOptIn
          ? "Thank you for opting in — your name will appear once reviewed."
          : "As a Founding Supporter, you'll be listed anonymously by default, exactly as you chose."
      }</p>`,
    };
    await sendTransactionalEmail({
      to: email,
      subject: "Your Azadichords order",
      html: `
        <p>Thank you for supporting Azadichords.</p>
        <p><a href="${downloadUrl}">Download your record (FLAC + digital lyric booklet)</a> — this link expires in 7 days.</p>
        ${tierLines[tier] ?? ""}
      `,
    });
  } catch (err) {
    // Don't fail the webhook over email delivery — Stripe already has
    // the payment; log it so it can be resent manually.
    console.error("post-payment email failed", err);
  }

  return NextResponse.json({ received: true });
}
