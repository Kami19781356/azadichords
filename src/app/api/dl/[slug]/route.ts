import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextRequest } from "next/server";
import { content } from "@/lib/content";

// Download counter. The download page sends the browser here; we add
// one line — time and release only, never an IP address or user agent —
// to data/downloads.jsonl, then redirect to the file. Counting is
// aggregate by design: the site promises no tracking.
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const release = content.fa.releases.find((r) => r.slug === slug);
  if (!release?.downloadUrl) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const dir = process.env.SUBMISSIONS_DIR || path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    const line = JSON.stringify({ t: new Date().toISOString(), slug }) + "\n";
    await appendFile(path.join(dir, "downloads.jsonl"), line, "utf8");
  } catch (err) {
    // A counting problem must never block the download.
    console.error("Download count failed:", err);
  }

  return new Response(null, {
    status: 307,
    headers: { Location: release.downloadUrl, "Cache-Control": "no-store" },
  });
}
