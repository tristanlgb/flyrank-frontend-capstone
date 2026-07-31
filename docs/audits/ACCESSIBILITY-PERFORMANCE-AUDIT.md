# Accessibility and Performance Audit

**Target:** https://flyrank-frontend-capstone-eight.vercel.app/  
**Form factor:** Lighthouse mobile  
**Date:** July 31, 2026

## Lighthouse result before the audit fixes

| Category | Score |
| --- | ---: |
| Performance | 90 |
| Accessibility | 95 |
| Best Practices | 96 |
| SEO | 100 |

- Largest Contentful Paint: 2.7 seconds.
- Cumulative Layout Shift: 0.
- Total Blocking Time: 0 ms.

## Problems found

1. The orange eyebrow labels and project numbers did not meet WCAG AA contrast
   on the cream and paper surfaces.
2. The Contact eyebrow reused the same orange on a dark green surface and also
   failed contrast.
3. The compact mobile brand displayed “TL” while its forced accessible name
   was “Tristan Lenzberg, home,” triggering a label-content mismatch.
4. The missing favicon produced a 404 error in the production console.

## Improvements applied

- Changed the light-surface accent from `#d96e45` to the darker `#9f4427`.
- Added `#ffc4ac` as the dark-surface eyebrow color.
- Darkened muted text and project numbers.
- Removed the forced brand `aria-label`, retained the complete text name for
  assistive technology, and visually clipped it on small screens.
- Added an SVG favicon and an explicit `<link rel="icon">`.

## Follow-up axe result

The local production-equivalent page was tested with axe-core using the
`wcag2a`, `wcag2aa`, `wcag21a`, and `wcag21aa` tags.

**Result: 0 violations.**

## Final production result

The corrected `main` commit was deployed and audited again on the public URL.

| Category | Score |
| --- | ---: |
| Performance | 86 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

- Largest Contentful Paint: 3.0 seconds.
- Cumulative Layout Shift: 0.
- Total Blocking Time: 0 ms.
- Production axe WCAG 2.1 AA result: 0 violations.

Saved evidence:

- `lighthouse-mobile-final.json`
- `axe-production.json`

Automated tools detect only part of the accessibility surface. Manual keyboard,
screen-reader, Firefox, Safari, and real-phone checks remain required.
