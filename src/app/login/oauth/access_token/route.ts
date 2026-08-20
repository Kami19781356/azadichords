import { NextRequest, NextResponse } from "next/server";

// Decap's `gitea` backend does a real client-side OAuth2 PKCE flow
// directly against Gitea (config.yml's base_url points here instead
// of at Gitea, so both /login/oauth/authorize and this route sit at
// the exact hardcoded paths Decap's Gitea auth class requests). PKCE
// is meant to let a public client (no secret) exchange its code, but
// this Gitea version rejects that exchange with "invalid empty
// client secret" regardless — a Gitea limitation, not a Decap one
// (see go-gitea/gitea#17107). This route is the minimal fix: relay
// the browser's token request to Gitea's real endpoint, injecting the
// client secret server-side (it never reaches the browser).
const GITEA_BASE_URL = "https://gitea-dscyrlmmaf5dfm1jzyzkfm7u.178.104.193.74.sslip.io";

export async function POST(request: NextRequest) {
  const clientSecret = process.env.GITEA_OAUTH_CLIENT_SECRET;
  if (!clientSecret) {
    return NextResponse.json(
      { error: "server_error", error_description: "Missing GITEA_OAUTH_CLIENT_SECRET" },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const giteaRes = await fetch(`${GITEA_BASE_URL}/login/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, client_secret: clientSecret }),
  });

  const text = await giteaRes.text();
  return new NextResponse(text, {
    status: giteaRes.status,
    headers: { "Content-Type": "application/json" },
  });
}
