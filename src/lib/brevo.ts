// Minimal Brevo (Sendinblue) transactional email client — a plain
// fetch call against their REST API rather than pulling in their SDK
// for one endpoint. See docs/SALES_SETUP.md for the account setup.

export async function sendTransactionalEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    throw new Error(
      "BREVO_API_KEY / BREVO_SENDER_EMAIL are not set. See docs/SALES_SETUP.md.",
    );
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: "Azadichords" },
      to: [{ email: params.to }],
      subject: params.subject,
      htmlContent: params.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo send failed (${res.status}): ${body}`);
  }
}
