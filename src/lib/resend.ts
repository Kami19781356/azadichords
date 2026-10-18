// Contact form notification email via Resend — see docs/SALES_SETUP.md
// for account/domain setup. Lazily initialized like the other clients
// in this project (stripe.ts, brevo.ts, storage.ts) so the build never
// depends on these env vars being set.

import { Resend } from "resend";

let client: Resend | null = null;

function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set. See docs/SALES_SETUP.md.");
  }
  if (!client) client = new Resend(apiKey);
  return client;
}

// RESEND_TO_EMAIL may hold one address or several, separated by commas.
function recipients(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
}

export async function sendContactNotification(params: {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = recipients(process.env.RESEND_TO_EMAIL);
  if (!from || to.length === 0) {
    throw new Error(
      "RESEND_FROM_EMAIL / RESEND_TO_EMAIL are not set. See docs/SALES_SETUP.md.",
    );
  }

  const resend = getClient();
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: params.email,
    subject: `[${params.category}] ${params.subject}`,
    text: `From: ${params.name} <${params.email}>\nCategory: ${params.category}\n\n${params.message}`,
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}

export async function sendSongSubmissionNotification(params: {
  section: "special" | "international";
  artistName: string;
  email: string;
  songTitle: string;
  text: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = recipients(process.env.RESEND_TO_EMAIL);
  if (!from || to.length === 0) {
    throw new Error("RESEND_FROM_EMAIL / RESEND_TO_EMAIL are not set.");
  }
  const { error } = await getClient().emails.send({
    from,
    to,
    replyTo: params.email,
    subject: `[Festival · ${params.section === "special" ? "Special" : "International"} section] ${params.songTitle} — ${params.artistName}`,
    text: params.text,
  });
  if (error) throw new Error(`Resend send failed: ${error.message}`);
}
