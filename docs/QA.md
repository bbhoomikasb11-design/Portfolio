# Verification — 14 October 2026

## Build and dependencies

- Strict TypeScript and Vite production compilation passed.
- npm install audit: 0 known vulnerabilities for portfolio dependencies.
- Browser code approximately 296 KB / 94 KB gzip; CSS approximately 40 KB / 8.7 KB gzip.
- Four local Latin-subset WOFF2 font files total approximately 79 KB. Source and SIL licenses included.
- All four selected projects use optimized, genuine screenshots. Source clones are not included in this repository.

## Browser checks

Final revision suite: **17 tests passed** (24.9 s), including every route/theme and all project dialogs.

Google Chrome through Playwright against production output. T3 preview initially worked for source captures, then disconnected and timed out; local Chrome was used for final checks.

- Six real routes tested at 320, 375, 430, 768, 1024, 1440 and 1680 pixels, with no horizontal overflow.
- Mobile menu open/close, Escape and focus return, navigation, skip link, archive filter, persisted theme switching, missing-route UI and reduced motion verified.
- Images loaded; desktop/mobile visual layouts inspected. Project screenshot capture corrected after the original browser capture was distorted.
- Form rejects incomplete input, encodes an email draft and reports “Nothing has been sent.” No email was sent by the test.
- Accessibility review found and fixed animation opacity contrast, a small portrait label, and CampusMesh’s dark-theme surface. Button background transition was removed so theme colors switch together.
- Automated axe WCAG 2 A/AA + 2.1 AA suite runs on all six routes in both themes. Final focused run passed with zero violations across all 12 route/theme combinations. Manual screen-reader testing and user research have not been performed.

## Performance lab measurement

Lighthouse mobile simulation against local production preview (`http://localhost:4174`), Chrome headless, 14 October 2026:

- Performance: 97/100
- First contentful paint: 1.8 s
- Largest contentful paint: 2.4 s
- Total blocking time: 0 ms
- Cumulative layout shift: 0
- Speed index: 1.8 s

Machine/network variability applies; this is a lab run, not field Core Web Vitals, and does not measure INP. Raw report: `docs/qa/lighthouse-mobile.json`. An earlier pre-font-optimization run scored 72; WOFF2 subsetting reduced font transfer substantially. The latest measurement includes the supplied portrait, skills-first layout, floating navigation and expandable project dialogs.

## Owner-requested design revision

- Wordmark reads `Bhoomika.S` in consistent typography; navigation is a compact floating pill with an accessible mobile disclosure menu.
- Owner-supplied portrait replaces the placeholder, with 480 px (17 KB) and 960 px (41 KB) WebP variants. The image was resized/compressed, without generative modification.
- Skills appear immediately after the hero. Five verified groups are filterable; the homepage has no project grid.
- Work archive uses horizontal cards. More Info opens a native dialog with a dedicated keyboard-focusable scrolling region, focus containment, close button, Escape/backdrop dismissal, background scroll locking, and return focus. Full case-study routes remain accessible.
- Dialog keyboard and scroll-lock behavior checked at 320, 768 and 1440 px; all four project dialogs pass axe in both themes. Theme color transitions were kept instantaneous after catching transient low-contrast navigation text.
- Reference homepage, skill panel, Projects page and More Info overlay inspected in local Chrome. T3 browser snapshots timed out twice before using that fallback.
- New captures: `skills-desktop.png`, `project-dialog-desktop.png`, `project-dialog-dark-mobile.png`; hero captures updated.

## External links and source validation

The six project repositories were cloned successfully; SafeScan and résumé opened in the browser. LinkedIn URL is owner-provided; authenticated profile identity/currentness has not been independently established. The outdated résumé remains behind a request-email action, not a claimed current download. Source apps' backend/AI operations were not validated; see AUDIT.md for exact boundaries.

## Publication

The new remote supplied by the owner is `https://github.com/bbhoomikasb11-design/Portfolio.git`; it was checked empty before attachment. The implementation was successfully pushed to its main branch. Vercel CLI reported logged out. Production deployment requires account login. Canonicals, absolute OG URLs and a sitemap are generated only when the actual HTTPS `SITE_URL` is configured. No production URL is claimed until deployment succeeds.
