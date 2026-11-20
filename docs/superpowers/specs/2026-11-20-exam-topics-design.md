# Exam Topics Site: Design

## Intent
A small Astro site listing only the topics (domains, skills, weights) on the Claude Certified Developer exams. It is the worked example for Part 2 ("CI/CD integration and deployment") of `dev-professional/01-production-integration-reliability-and-knowledge-grounding.md`: Claude runs non-interactively in the pipeline, deploys under an allowlist, verifies, rolls back if unhealthy, and writes the deployment summary.

## Goals
- One static page, two exams: Foundations (blueprint effective Dec 7, 2026) and Professional (Nov 2026).
- Topics only: domain, weight, skill names. No registration, policy, scoring or sample-question content.
- Pipeline on push to `main`: deterministic build and tests, then `claude -p` deploys, checks status, rolls back on failure, writes the summary.

## Non-goals / anti-goals
- No push to GitHub from the build session; the user creates the repo and pushes.
- Claude gets no free shell. A deploy that works only because the agent had broad credentials is a failure of the example.

## Approaches considered
1. Triage-only Claude step on failure, deploy via `actions/deploy-pages` (deterministic, but Claude not in the deploy path).
2. **Chosen:** Claude runs three allowlisted scripts (deploy, status, rollback) and writes the summary; Pages serves from the `gh-pages` branch. Mirrors the doc's release/status/rollback tool tiers.
3. Claude with raw `git push` and open Bash: rejected, it is the "shell script with credentials" the doc warns against.

## Design
- Source of truth: `src/data/exams.ts` (hand-copied from the exam guides). `src/pages/index.astro` renders it.
- Scripts: `scripts/deploy.sh` (publish `dist/` to `gh-pages`), `scripts/status.sh` (poll live URL for 200 and the build SHA), `scripts/rollback.sh` (revert the latest `gh-pages` commit).
- Workflow: checkout, `npm ci`, `npm test`, `npm run build`, install Claude Code, `claude -p ... --allowedTools "Bash(./scripts/deploy.sh),Bash(./scripts/status.sh),Bash(./scripts/rollback.sh)" --permission-mode dontAsk`. Permissions: `contents: write` only; secrets: `ANTHROPIC_API_KEY`.
- Claude ends its summary with `RESULT: deployed` or `RESULT: rolled-back`; a final deterministic step fails the job unless it is `deployed`.

## Calls made without the user
- Pages serves from `gh-pages` (one-time repo setting) because the agent cannot call `actions/deploy-pages`.
- `site`/`base` derive from `GITHUB_REPOSITORY`.
- Tests use `node --test` on the data file (Node 24 strips types natively).
