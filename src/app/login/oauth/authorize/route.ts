import { NextRequest, NextResponse } from "next/server";

// See src/app/login/oauth/access_token/route.ts for why this exists.
// This half just passes the authorize request straight through to
// Gitea unchanged (query params only) so the user sees Gitea's real
// login/consent page.
const GITEA_BASE_URL = "https://gitea-dscyrlmmaf5dfm1jzyzkfm7u.178.104.193.74.sslip.io";

export async function GET(request: NextRequest) {
  const target = new URL("/login/oauth/authorize", GITEA_BASE_URL);
  target.search = request.nextUrl.search;
  return NextResponse.redirect(target);
}
