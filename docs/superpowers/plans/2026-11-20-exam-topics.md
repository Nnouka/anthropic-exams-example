# Exam Topics Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (run natively; the user already approved the design and asked to build).

**Goal:** Astro site of exam topics, deployed to GitHub Pages by a pipeline where Claude deploys, verifies, rolls back and summarizes.

**Architecture:** Data file drives one page. Three shell scripts are the only things Claude may run. A workflow builds deterministically, then calls `claude -p`.

**Tech Stack:** Astro, Node 24, `node --test`, bash, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-11-20-exam-topics-design.md`

## Global Constraints
- Exams: Foundations (CCDV-F, effective Dec 7, 2026) and Professional (CCDV-P, effective Nov 2026); weights per exam sum to 100.
- Allowlist is exactly `Bash(./scripts/deploy.sh),Bash(./scripts/status.sh),Bash(./scripts/rollback.sh)` with `--permission-mode dontAsk`.
- Workflow permissions: `contents: write` only.

## Review Focus
- Weights not summing to 100 after an edit: test fails.
- First deploy, when `gh-pages` does not exist: `deploy.sh` creates it.
- Rollback with a single `gh-pages` commit: `rollback.sh` refuses instead of blanking the site.
- No change since last deploy: `deploy.sh` exits 0 without an empty commit.
- Claude finishes without a valid RESULT line: job fails.

### Task 1: Exam data and tests
**Files:** Create `src/data/exams.ts`, `src/data/exams.test.ts`.
**Produces:** `export type Domain = {name: string; weight: number; skills: string[]}`, `export type Exam = {id: string; title: string; code: string; effective: string; domains: Domain[]}`, `export const exams: Exam[]`.
- [ ] Test: each exam has 8 domains, weights sum to 100, every domain has at least one skill.
- [ ] Implement data from the two guides. Run `npm test`; expect pass.

### Task 2: Page
**Files:** Create `src/pages/index.astro`, `astro.config.mjs`, `package.json`, `tsconfig.json`.
**Consumes:** `exams` from Task 1. Footer shows `GITHUB_SHA` first 7 chars (or `local`).
- [ ] Run `npm run build`; expect `dist/index.html` containing every domain name and the build SHA.

### Task 3: Scripts
**Files:** Create `scripts/deploy.sh`, `scripts/status.sh`, `scripts/rollback.sh`.
- [ ] Each passes `bash -n`; `status.sh` and `rollback.sh` fail clearly outside CI/without a remote.

### Task 4: Workflow and README
**Files:** Create `.github/workflows/deploy.yml`, `README.md`, `.gitignore`.
- [ ] Workflow validates as YAML; README lists the secret, the Pages setting and the push steps.
