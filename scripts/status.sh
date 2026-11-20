#!/usr/bin/env bash
# Poll the live site until it serves HTTP 200 with this commit's build marker.
# Exit 0 = healthy, 1 = not healthy after the wait. Prints one line per attempt.
set -euo pipefail

: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY must be set (owner/name)}"
OWNER="${GITHUB_REPOSITORY%%/*}"
NAME="${GITHUB_REPOSITORY##*/}"
if [ "$NAME" = "$OWNER.github.io" ]; then
  URL="https://$OWNER.github.io/"
else
  URL="https://$OWNER.github.io/$NAME/"
fi
SHA="$(git rev-parse --short=7 HEAD)"
ATTEMPTS="${STATUS_ATTEMPTS:-18}"
DELAY="${STATUS_DELAY:-10}"

for i in $(seq 1 "$ATTEMPTS"); do
  BODY="$(mktemp)"
  CODE="$(curl -s -o "$BODY" -w '%{http_code}' --max-time 15 "$URL" || echo 000)"
  if [ "$CODE" = "200" ] && grep -q "$SHA" "$BODY"; then
    echo "healthy: $URL returned 200 and shows build $SHA (attempt $i)"
    exit 0
  fi
  echo "attempt $i/$ATTEMPTS: $URL returned $CODE, build $SHA not shown yet"
  [ "$i" -lt "$ATTEMPTS" ] && sleep "$DELAY"
done

echo "unhealthy: $URL did not show build $SHA after $ATTEMPTS attempts" >&2
exit 1
