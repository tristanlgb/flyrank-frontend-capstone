# Week 9 — Break Your Own Site

**Portfolio audited:** <https://tristan-empty-but-live.vercel.app/>  
**Project:** historical General AI Fluency Next.js portfolio  
**Audit date:** August 3, 2026  
**Review type:** structured adversarial review with browser, link, search, and Lighthouse checks

## Honest status

This audit is about `tristan-empty-but-live.vercel.app`, not the later Vite
capstone. The published site was tested directly. Its Next.js source repository
is not present in the available workspace and could not be identified publicly,
so the newly discovered fix-now items are documented but not falsely marked as
fixed. This checkpoint is **not ready to pass** until those changes are made and
deployed from the correct source project.

## What I tried to break

| Test | Result | Evidence |
| --- | --- | --- |
| Empty, garbage, and rapid form submissions | Not applicable | The portfolio contains no form, input, textarea, select, or button. Contact is a `mailto:` link, so there is no site-side submission flow to attack. |
| Empty page / failed rendering | Pass | The home page renders 2,994 characters of meaningful text with no Next.js error overlay. |
| Browser console | Pass | No warnings or errors on the tested home and Work pages. |
| Mobile layout | Pass | At a 390 × 844 device-sized viewport there is no horizontal overflow, body text is 16 px, and the smallest visible link target is 44 px high. |
| Desktop layout | Pass | No horizontal overflow or error overlay. |
| Internal navigation | Pass | Home anchors resolve to About, Work, Next, and Contact. `/work`, `/dns`, and all three case-study routes return HTTP 200. |
| Live project links | Pass | Social Observatory, Pokédex, Full-Stack Commerce, and Academic Administration return HTTP 200. |
| Repository/profile links | Pass with caveat | Three project repositories, GitHub profile, résumé, and CV return HTTP 200. LinkedIn blocks anonymous automation with HTTP 999 and redirects browsers to its sign-in wall. |
| Social preview | Pass | Open Graph title, description, and `og.jpg` exist; the image returns HTTP 200 and weighs 108,179 bytes. Twitter uses `summary_large_image`. |
| Search findability | Revise | Searches for the exact portfolio title/name and a `site:` query returned no result. The site is public but was not findable in the checked search index. |

## Fix-now findings

These issues should be fixed in the correct Next.js source project and then
verified again in production.

### 1. Work-page links and labels

The `/work` Lighthouse accessibility score is **94**. It reports:

- `link-name`: the visual link for the “Draft → Review → Revise” case is in the
  tab order but has no accessible name;
- `label-content-name-mismatch`: the visible `TL / Tristan Lenzberg` wordmark
  does not match its forced accessible name, “Tristan Lenzberg, home”;
- `heading-order`: case-card headings use `h3` after the page structure skips a
  level.

**Required fix:** give the visual case link a real accessible name, remove or
align the wordmark's overriding `aria-label`, and restore sequential heading
levels. Re-run Lighthouse on `/work`; accessibility should return to 100.

### 2. Canonical URL

The home page has a good title and description plus Open Graph/Twitter metadata,
but it has no canonical link.

**Required fix:** add
`<link rel="canonical" href="https://tristan-empty-but-live.vercel.app/">`
through the Next.js metadata API, and provide route-specific canonicals where
appropriate.

### 3. Crawl-discovery files

`/robots.txt` and `/sitemap.xml` both return HTTP 404. Lighthouse does not deduct
points for their absence, but the exact-site search returned nothing and these
files are inexpensive discoverability improvements.

**Required fix:** add Next.js `robots.ts` and `sitemap.ts`, include the home,
Work, DNS, and three case-study URLs, deploy, and submit the sitemap through
Google Search Console if available.

## Fix-nows already addressed before this audit

The Week 7 hardening work remains present in production:

- no mobile horizontal overflow;
- minimum 44 px visible link targets;
- readable 16 px body text;
- optimized 108 KB social-preview image;
- working internal pages and public project links.

## Speed evidence

Fresh Lighthouse 13 mobile audits were run on August 3, 2026.

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home | 100 | 100 | 100 | 100 |
| Work | 99 | 94 | 100 | 100 |

Home metrics:

- First Contentful Paint: 0.9 s
- Largest Contentful Paint: 1.8 s
- Speed Index: 2.3 s
- Total Blocking Time: 0 ms
- Cumulative Layout Shift: 0

Raw evidence:

- `docs/audits/lighthouse-empty-portfolio.json`
- `docs/audits/lighthouse-empty-portfolio-work.json`

## Known limitations

1. The correct Next.js source project is not available in this workspace, so
   this review cannot implement or deploy the newly found fixes.
2. Search-engine indexing is external and not immediate, even after adding a
   canonical URL and sitemap.
3. LinkedIn requires a signed-in manual click; anonymous automation reaches its
   auth wall rather than the public profile.
4. The `mailto:` action depends on a configured mail client and must be checked
   on a real phone.
5. Firefox, Safari, and a physical iPhone were not available for this pass.
6. The portrait is delivered close to its rendered mobile dimensions but its
   original source quality should still be judged on a high-density real phone.

## Hardening-review outcome

The structured review produced three must-fix groups: `/work` accessibility,
canonical metadata, and crawl-discovery files. They remain open because the
correct source repository is missing. A mentor or peer should review this list
after the fixes are deployed and record their name, date, and any additional
must-fixes here.

**Reviewer:**  
**Date:**  
**Additional must-fixes:**  
**Resolution:**

## Track-thread draft

**Break Your Own Site — Week 9**

I audited my published Next.js portfolio at
https://tristan-empty-but-live.vercel.app rather than testing only its happy
path. The site has no form, so empty/garbage/double submissions do not apply;
instead I tested every internal route, case study, demo, repository, profile and
contact destination, plus mobile overflow, console output, metadata,
findability, and Lighthouse performance.

What held up: all internal pages and three case studies return HTTP 200; all
four live projects and the checked GitHub/résumé links resolve; mobile has no
horizontal overflow, visible link targets are at least 44 px, and the home page
scores 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO in a
fresh Lighthouse mobile run.

What broke: the Work page scores 94 Accessibility because one visual case link
has no accessible name, the wordmark's accessible name does not match its
visible text, and the heading order skips a level. I also found no canonical
URL, `/robots.txt` and `/sitemap.xml` return 404, and exact-name/`site:` searches
did not surface the portfolio.

I am keeping those as open fix-now items rather than claiming they are solved:
the correct deployed Next.js source repository is not present in my current
workspace. Known limitations also include LinkedIn's sign-in wall, untested
Safari/Firefox/real-iPhone behavior, and the device-dependent `mailto:` action.

Evidence: `docs/ai-fluency/WEEK-09-BREAK-YOUR-OWN-SITE.md`
