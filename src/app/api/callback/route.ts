import { NextRequest, NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/siteOrigin";

// See /api/auth/route.ts for why this proxy exists. This route
// finishes the OAuth2 exchange against Gitea and hands the result to
// the Decap CMS popup via postMessage, using the exact two-step
// handshake Decap's NetlifyAuthenticator expects: the popup sends
// "authorizing:<provider>" first, waits for the opener to echo it
// back (proves same-origin), then sends the real
// "authorization:<provider>:success:<json>" (or ":error:<message>")
// message. Confirmed by reading decap-cms's actual source — this
// isn't documented anywhere obvious.
const GITEA_BASE_URL = "https://gitea-dscyrlmmaf5dfm1jzyzkfm7u.178.104.193.74.sslip.io";
const STATE_COOKIE = "gitea_oauth_state";
const PROVIDER = "github";

function handshakeHtml(message: string) {
  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(${JSON.stringify(message)}, e.origin);
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:${PROVIDER}", "*");
      })();
    </script>
  </body>
</html>`;
}

function htmlResponse(body: string) {
  return new NextResponse(body, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const storedState = request.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return htmlResponse(
      handshakeHtml(`authorization:${PROVIDER}:error:Invalid or missing OAuth state`),
    );
  }

  const clientId = process.env.GITEA_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITEA_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return htmlResponse(
      handshakeHtml(`authorization:${PROVIDER}:error:Server is missing Gitea OAuth credentials`),
    );
  }

  const tokenRes = await fetch(`${GITEA_BASE_URL}/login/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: `${getSiteOrigin(request)}/api/callback`,
    }),
  });

  if (!tokenRes.ok) {
    return htmlResponse(
      handshakeHtml(`authorization:${PROVIDER}:error:Failed to exchange code for a token`),
    );
  }

  const data = (await tokenRes.json()) as { access_token?: string };
  if (!data.access_token) {
    return htmlResponse(
      handshakeHtml(`authorization:${PROVIDER}:error:Gitea did not return an access token`),
    );
  }

  const payload = JSON.stringify({ token: data.access_token, provider: PROVIDER });
  const response = htmlResponse(
    handshakeHtml(`authorization:${PROVIDER}:success:${payload}`),
  );
  response.cookies.delete(STATE_COOKIE);
  return response;
}
