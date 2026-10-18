import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, category, message } = body as Record<string, unknown>;
  const fields = { name, email, subject, category, message };
  const missing = Object.entries(fields).some(
    ([, v]) => typeof v !== "string" || !v.trim(),
  );
  if (missing) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Keep a copy on the server (same folder as song submissions), then
  // email it. The request succeeds if at least one of the two worked,
  // so a mail outage never loses a message.
  let stored = false;
  try {
    const dir = process.env.SUBMISSIONS_DIR || path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    const record = {
      receivedAt: new Date().toISOString(),
      name,
      email,
      subject,
      category,
      message,
    };
    await appendFile(path.join(dir, "contact.jsonl"), JSON.stringify(record) + "\n", "utf8");
    stored = true;
  } catch (err) {
    console.error("Contact store failed:", err);
  }

  let mailed = false;
  try {
    await sendContactNotification({
      name: name as string,
      email,
      subject: subject as string,
      category: category as string,
      message: message as string,
    });
    mailed = true;
  } catch (err) {
    console.error("Contact form send failed:", err);
  }

  if (!stored && !mailed) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
