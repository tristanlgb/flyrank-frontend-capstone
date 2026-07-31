# Testing Evidence

## Commands

```bash
npm test
npm run test:coverage
npm run typecheck
npm run build
npm audit --omit=dev
```

## Results — July 31, 2026

- Test files: 2 passed.
- Tests: 7 passed.
- Frontend statements: 62.64%.
- Frontend lines: 62.64%.
- Frontend branches: 62.06%.
- App component lines: 81.27%.
- Enforced minimum: 50% statements and lines.
- TypeScript: passed.
- Production build: passed.
- Production dependency vulnerabilities: 0.

The eight high-severity warnings reported by the full `npm audit` are in
development-only linting and coverage dependency chains. They are not shipped
in the browser or Vercel Function bundle. Upgrading them currently requires
major-version changes to ESLint and Vitest, so they are recorded rather than
“fixed” with an unsafe forced upgrade.

The coverage scope is explicitly limited to the current frontend `src/`
components. Historical FE-03 snapshots, the standalone evidence agent, and ML
notebooks are separate artifacts with their own test paths and are not counted
as uncovered frontend components.
