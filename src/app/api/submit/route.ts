import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { sendSongSubmissionNotification } from "@/lib/resend";
import { submissionsAreOpen } from "@/lib/submissionsWindow";

// Special-section song submissions. Each one is appended to a JSONL file
// on the server (SUBMISSIONS_DIR, default ./data — git-ignored, survives
// deploys) and, when Resend is configured, emailed to the label. The
// request succeeds if at least one of the two worked, so a mail outage
// never loses a song.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS: Record<string, number> = {
  songLanguage: 80,
  artistName: 120,
  email: 200,
  songTitle: 200,
  lyricist: 200,
  composer: 200,
  dedication: 300,
  lyrics: 8000,
  demoUrl: 500,
  note: 2000,
};
const REQUIRED = ["artistName", "email", "songTitle", "lyrics"];

function str(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ open: submissionsAreOpen() });
}

export async function POST(request: NextRequest) {
  if (!submissionsAreOpen()) {
    return NextResponse.json({ error: "Submissions are not open yet" }, { status: 403 });
  }
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  // Honeypot filled → pretend success, store nothing.
  if (str(body.website)) return NextResponse.json({ ok: true });

  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = str(body[key]);
    if (value.length > max) {
      return NextResponse.json({ error: `${key} is too long` }, { status: 400 });
    }
    fields[key] = value;
  }
  const section = str(body.section);
  if (section !== "special" && section !== "international") {
    return NextResponse.json({ error: "Choose a section" }, { status: 400 });
  }
  // On the Persian site the special section is Persian by definition.
  // Everywhere else (English site, and the international section) the
  // song's language is asked.
  const fromFa = str(body.lang) === "fa";
  if (section === "special" && fromFa) fields.songLanguage = "Persian";
  if (!fields.songLanguage) {
    return NextResponse.json({ error: "Missing song language" }, { status: 400 });
  }
  if (REQUIRED.some((k) => !fields[k])) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(fields.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (fields.demoUrl && !/^https?:\/\//i.test(fields.demoUrl)) {
    return NextResponse.json({ error: "Invalid demo link" }, { status: 400 });
  }
  if (body.consentRights !== true || body.consentAlbum !== true) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  const record = {
    receivedAt: new Date().toISOString(),
    section,
    ...fields,
    consentRights: true,
    consentAlbum: true,
  };

  let stored = false;
  try {
    const dir = process.env.SUBMISSIONS_DIR || path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "submissions.jsonl"), JSON.stringify(record) + "\n", "utf8");
    stored = true;
  } catch (err) {
    console.error("Submission store failed:", err);
  }

  let mailed = false;
  try {
    const text = [
      `Section: ${section === "special" ? "Special (for the road to freedom — Persian site: Persian songs in memory of the Javidnaman)" : "International (any language, any theme)"}`,
      `Song language: ${fields.songLanguage}`,
      `Stage name: ${fields.artistName}`,
      `Email: ${fields.email}`,
      `Song: ${fields.songTitle}`,
      fields.lyricist && `Lyricist: ${fields.lyricist}`,
      fields.composer && `Melody/composer: ${fields.composer}`,
      fields.dedication && `In memory of: ${fields.dedication}`,
      fields.demoUrl && `Demo: ${fields.demoUrl}`,
      fields.note && `Note: ${fields.note}`,
      "",
      "Lyrics:",
      fields.lyrics,
      "",
      "Consents: rights ✓ · album (non-exclusive) ✓",
    ]
      .filter((line): line is string => typeof line === "string")
      .join("\n");
    await sendSongSubmissionNotification({
      section,
      artistName: fields.artistName,
      email: fields.email,
      songTitle: fields.songTitle,
      text,
    });
    mailed = true;
  } catch (err) {
    console.error("Submission email failed:", err);
  }

  if (!stored && !mailed) {
    return NextResponse.json({ error: "Failed to receive submission" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
