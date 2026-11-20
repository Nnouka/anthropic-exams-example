# Claude Developer Exam Topics

A small Astro site listing only the topics (domains, weights, skills) on the Claude Certified Developer **Foundations** and **Professional** exams. Topics are in `src/data/exams.ts`, copied from the exam guides.

It is the worked example for Part 2 of the *Production Integration, Reliability, and Knowledge Grounding* course (CI/CD integration and deployment): **Claude is the one that deploys.**

## How the pipeline works

On every push to `main` (`.github/workflows/deploy.yml`):

1. Deterministic steps: `npm ci`, `npm test`, `npm run build`.
2. `claude -p` runs with `--permission-mode dontAsk` and an allowlist of exactly three commands, the same release / status / rollback shape as the course's deployment tools:
   - `./scripts/deploy.sh` publishes `dist/` to the `gh-pages` branch
   - `./scripts/status.sh` polls the live URL for HTTP 200 and this build's SHA
   - `./scripts/rollback.sh` reverts the latest `gh-pages` commit
3. Claude writes the deployment summary (what shipped, what status said, whether it rolled back) to the job summary.
4. A final deterministic step fails the job unless Claude's last line is `RESULT: deployed`.

Credentials are scoped: the job has `contents: write` and `ANTHROPIC_API_KEY`, nothing else.

## One-time setup

1. Create a GitHub repo and push this folder as its root.
2. Add the repo secret `ANTHROPIC_API_KEY` (Settings → Secrets and variables → Actions).
3. After the first run creates `gh-pages`, set Settings → Pages → Source: **Deploy from a branch** → `gh-pages` / `/ (root)`.

Pages serves from a branch because Claude can't call `actions/deploy-pages`; that is the trade-off for letting the agent do the deploy.

## Local

```sh
npm install
npm test
npm run dev
```
