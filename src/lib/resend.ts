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

export async function sendContactNotification(params: {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;
  if (!from || !to) {
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
