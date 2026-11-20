#!/usr/bin/env bash
# Roll the site back by reverting the latest gh-pages commit (history is kept, no force-push).
set -euo pipefail

git fetch --quiet origin gh-pages 2>/dev/null || { echo "No gh-pages branch. Nothing to roll back." >&2; exit 1; }

COUNT="$(git rev-list --count origin/gh-pages)"
if [ "$COUNT" -lt 2 ]; then
  echo "gh-pages has only $COUNT commit. Nothing earlier to roll back to." >&2
  exit 1
fi

WT="$(mktemp -d)"
trap 'git worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT
git worktree add --quiet -B gh-pages "$WT" origin/gh-pages

BAD="$(git -C "$WT" log -1 --format=%s)"
git -C "$WT" \
  -c user.name="github-actions[bot]" \
  -c user.email="41898282+github-actions[bot]@users.noreply.github.com" \
  revert --no-edit HEAD >/dev/null
git -C "$WT" push --quiet origin gh-pages

echo "Rolled back '$BAD'. Live again: '$(git -C "$WT" log -1 --format=%s HEAD~2)'."
