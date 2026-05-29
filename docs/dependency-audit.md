# Dependency Audit

Last checked: 2026-05-29

`npm audit --audit-level=moderate` reports a moderate advisory for `postcss`
through Next.js internal dependencies:

- Advisory: GHSA-qx2v-qp2m-jg93
- Path: `next -> postcss`
- Current Next.js version: `16.2.6`
- Suggested command: `npm audit fix --force`
- Risk: the force fix proposes installing `next@9.3.3`, which is a breaking
  downgrade and is not acceptable for this Next.js 16 app.

Do not run `npm audit fix --force` for this advisory. Track the upstream Next.js
release line and upgrade only to a compatible patched Next.js 16 version after
reviewing the local Next.js docs and rerunning `npm run lint` and
`npm run build`.
