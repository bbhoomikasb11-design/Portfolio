# Verification — 14 October 2026

## Build and dependencies

- Strict TypeScript and Vite production compilation passed.
- npm install audit: 0 known vulnerabilities for portfolio dependencies.
- Browser code approximately 302 KB / 95.5 KB gzip; CSS approximately 51 KB / 10.5 KB gzip.
- Four local Latin-subset WOFF2 font files total approximately 79 KB. Source and SIL licenses included.
- All four selected projects use optimized, genuine screenshots. Source clones are not included in this repository.

## Browser checks

Current revision: **19 tests passed** (1.2 min), including every route/theme, contact validation, reduced motion, navigation and project dialogs.

Google Chrome through Playwright against production output. T3 preview initially worked for source captures, then disconnected and timed out; local Chrome was used for final checks.

- Nine real routes tested at 320, 375, 430, 768, 1024, 1440 and 1680 pixels, with no horizontal overflow.
- Mobile menu open/close, Escape and focus return, navigation, skip link, archive filter, persisted theme switching, missing-route UI and reduced motion verified.
- Images loaded; desktop/mobile visual layouts inspected. Project screenshot capture corrected after the original browser capture was distorted.
- Form rejects incomplete input, encodes an email draft and reports “Nothing has been sent.” No email was sent by the test.
- Accessibility review found and fixed animation opacity contrast, a small portrait label, and CampusMesh’s dark-theme surface. Button background transition was removed so theme colors switch together.
- Automated axe WCAG 2 A/AA + 2.1 AA suite runs on all nine routes in both themes. Final focused run passed with zero violations across all 18 route/theme combinations. Manual screen-reader testing and user research have not been performed.

## Performance lab measurement

Lighthouse mobile simulation against local production preview (`http://localhost:4174`), Chrome headless, 14 October 2026:

- Performance: 97/100
- First contentful paint: 1.8 s
- Largest contentful paint: 2.4 s
- Total blocking time: 0 ms
- Cumulative layout shift: 0
- Speed index: 1.8 s

Machine/network variability applies; this is a lab run, not field Core Web Vitals, and does not measure INP. Raw report: `docs/qa/lighthouse-mobile.json`. An earlier pre-font-optimization run scored 72; WOFF2 subsetting reduced font transfer substantially. This measurement includes the supplied portrait, skills-first layout, floating navigation and expandable project dialogs. It predates the latest five-destination navigation and three additional profile routes; it is not a fresh performance score for this revision.

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

## Five-destination navigation and motion refinement

- Reference Home, Experience, Education, Projects, Blogs and Contact pages inspected. The navbar now contains exactly Home, Experience, Education, Projects and Contact. Wordmark uses bold Manrope and reads `Bhoomika.S`. No Skills or Blogs item.
- Active pill follows route changes and resize/font metrics; keyboard focus remains visible. Mobile uses an accessible disclosure panel. Theme control moved to the footer.
- Added substantive `/experience`, `/education` and `/contact` routes using shared verified content. Nine production HTML entries have route-specific metadata and Vercel rewrites.
- Native anchor scrolling, 450 ms page entrances, 650 ms once-only section arrivals and bounded stagger, 350 ms active-pill movement. No wheel interception or additional motion dependency.
- Verified exact link order, one active link, active-pill alignment, new route navigation, focus movement, browser Back and live reduced-motion changes. The latter cancels running Web Animations API reveals as well as disabling CSS animation.
- Updated desktop, mobile and dark-mobile hero captures; added experience/education desktop, education mobile, mobile navigation and dark contact captures.

## Homepage and contact refinement

- Replaced the long About text and oversized monogram with shorter reading lines, larger body text and Design / Develop / Communicate focus cards. Education is linked to its page.
- Removed the homepage Experience section. `/experience` retains the verified professional content. Four achievement cards now follow About: debate first place, three poster wins, TechSprint Round 1 selection and Code Carnage participation. No photos or results were fabricated. Optional approved photo fields are available in the data.
- Contact uses theme-aware powder-blue and porcelain surfaces with a separate form panel and blue action. Dark mode uses the existing blue-gray palette. Form text, fields, focus and status use semantic colors.
- All nine routes fit seven viewport widths, and automated axe checks pass all 18 route/theme combinations. Visually reviewed About, achievements and Contact at desktop, 375 px and 320 px; reviewed the dark contact view.

## Education history update

Added the owner's Mahesh PU College (93.3%) and St. Mary's High School (83.3%) entries below the degree. Production build passed. Verified all three entries and no horizontal overflow at 320, 375, 768 and 1440 px using the repository's Chrome workflow; refreshed and inspected education screenshots. No new dates, board details or examination claims were added.
