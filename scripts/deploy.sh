#!/usr/bin/env bash
# Publish dist/ to the gh-pages branch. Safe to re-run: no change means no commit.
set -euo pipefail

[ -f dist/index.html ] || { echo "dist/ is missing. Run 'npm run build' first." >&2; exit 1; }

SHA="$(git rev-parse --short=7 HEAD)"
WT="$(mktemp -d)"
trap 'git worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT

git fetch --quiet origin gh-pages 2>/dev/null || true
if git rev-parse --verify --quiet origin/gh-pages >/dev/null; then
  git worktree add --quiet -B gh-pages "$WT" origin/gh-pages
else
  # First deploy: create an empty orphan gh-pages branch.
  git worktree add --quiet --detach "$WT"
  git -C "$WT" checkout --quiet --orphan gh-pages
  git -C "$WT" rm -rf --quiet . >/dev/null 2>&1 || true
fi

find "$WT" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a dist/. "$WT"/
touch "$WT/.nojekyll"

git -C "$WT" add -A
if git -C "$WT" diff --cached --quiet; then
  echo "No changes to publish. Site already matches build $SHA."
  exit 0
fi

git -C "$WT" \
  -c user.name="github-actions[bot]" \
  -c user.email="41898282+github-actions[bot]@users.noreply.github.com" \
  commit --quiet -m "Deploy $SHA"
git -C "$WT" push --quiet origin gh-pages
echo "Published build $SHA to gh-pages."
