import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getSiteOrigin } from "@/lib/siteOrigin";

// Decap CMS's `github` backend only speaks the Netlify-style OAuth
// proxy protocol (?provider=X&site_id=Y&scope=Z) — it does NOT do a
// direct OAuth2/PKCE request to the git host. Gitea's OAuth endpoint
// doesn't understand that protocol, so this route (+ /api/callback)
// is the small proxy in between: it starts a real OAuth2
// authorization-code request against Gitea, and /api/callback
// finishes it and hands the token back to the Decap popup.
const GITEA_BASE_URL = "https://gitea-dscyrlmmaf5dfm1jzyzkfm7u.178.104.193.74.sslip.io";
const STATE_COOKIE = "gitea_oauth_state";

export async function GET(request: NextRequest) {
  const clientId = process.env.GITEA_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Missing GITEA_OAUTH_CLIENT_ID", { status: 500 });
  }

  const scope = request.nextUrl.searchParams.get("scope") || "repo";
  const state = crypto.randomBytes(16).toString("hex");
  const redirectUri = `${getSiteOrigin(request)}/api/callback`;

  const authorizeUrl = new URL("/login/oauth/authorize", GITEA_BASE_URL);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("scope", scope);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return response;
}
