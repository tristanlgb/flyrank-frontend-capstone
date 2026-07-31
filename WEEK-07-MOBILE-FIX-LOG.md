# General AI Fluency — Week 7 Mobile Fix Log

Live URL: https://tristan-empty-but-live.vercel.app

Audit date: July 31, 2026

## Audit method

I used AI as an audit partner to inspect the published portfolio at 390 × 844 px (phone), 768 × 1024 px (tablet), and 1440 × 900 px (desktop). I checked horizontal overflow, rendered text and touch-target sizes, image dimensions, every internal page, live project links, and repository links.

This browser audit does not replace the assignment's required check on a real phone. The physical-device evidence section below must be completed before submission.

## Fixes already present

### Touch targets

- **Before:** Header links were about 15 px tall, project links about 19 px, and footer links about 24 px.
- **After:** Navigation, project, contact, and footer links now have a minimum height of 44 px at the tested phone, tablet, and desktop widths.

### Small text and readability

- **Before:** Project categories were 9.6 px and tags were about 10.4 px on mobile.
- **After:** The smallest project and social-link text measured 12.48–12.8 px. Body copy is 16 px with a 24 px line height.

### Responsive layout

- **Before:** The portrait and its floating note could extend beyond their wrapper on narrow screens.
- **After:** No horizontal overflow was detected at 390 px, 768 px, or 1440 px. The mobile portrait is limited to a 260 × 260 px display area.

### Image weight

- **Before:** The social preview PNG was 1,013,748 bytes.
- **After:** It was replaced with a 108,179-byte JPEG, approximately 89% smaller. The repository capture is about 63 KB.

## Link audit

The following destinations opened successfully on July 31, 2026:

- Portfolio home, Work page, and DNS notes
- All three case-study pages
- Social Observatory demo and repository
- Interactive Pokédex demo
- Full-Stack Commerce demo and repository
- Academic Administration demo and repository
- GitHub profile

The CV and LinkedIn URLs are present and correctly formed. The `mailto:` contact action must be confirmed on the physical phone because it depends on the device's configured mail application.

## Remaining issue found

The home portrait is rendered at 260 × 260 px on mobile, while the delivered image is only 140 × 136 px. It may look soft on a high-density phone screen. A larger source portrait should replace it in a later portfolio update. The current local repository does not contain the source project for this deployed Next.js portfolio, so this image replacement was not made during this audit.

## Physical phone evidence — required before submission

- Phone/model:
- Browser:
- Date:
- Portfolio opened from the public URL: Yes / No
- Navigation anchors worked: Yes / No
- Work cards and case studies opened: Yes / No
- Email button opened the mail application: Yes / No
- Text was readable without zooming: Yes / No
- No content spilled beyond the screen: Yes / No
- Before screenshot filename:
- After screenshot filename:
- Notes or final fix:

## Submission status

The responsive browser audit and public-link audit are complete. The assignment is ready to submit only after the physical-phone checklist is filled in and at least one phone screenshot is attached.
