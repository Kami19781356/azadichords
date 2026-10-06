#!/usr/bin/env bash
# Azadichords deploy — run on the server from the repo folder:
#   cd /root/azadichords-site && ./deploy/deploy.sh
# Pulls main from GitHub, builds, and (re)starts the PM2 process.
# The server copy is never edited by hand: local changes are discarded.
set -euo pipefail

APP_NAME="${APP_NAME:-azadichords-staging}"
PORT="${PORT:-3700}"
cd "$(dirname "$0")/.."

if [ ! -f .env.local ]; then
  echo "Missing .env.local (SITE_URL, SITE_INDEXABLE, RESEND_*). Aborting." >&2
  exit 1
fi

echo "==> Fetching latest main"
git fetch origin main
git reset --hard origin/main
echo "    now at $(git log --oneline -1)"

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building (this takes a few minutes)"
rm -rf .next
npm run build

echo "==> Starting with PM2 as $APP_NAME on port $PORT"
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  PORT="$PORT" pm2 restart "$APP_NAME" --update-env
else
  PORT="$PORT" pm2 start npm --name "$APP_NAME" -- start -- -p "$PORT"
fi
pm2 save > /dev/null

sleep 4
CODE=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/en")
echo "==> Health check /en: HTTP $CODE"
[ "$CODE" = "200" ] || { echo "Deploy finished but site is not healthy — check: pm2 logs $APP_NAME" >&2; exit 1; }
echo "==> Done."
