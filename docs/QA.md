# Verification — 14 October 2026

## Build and dependencies

- Strict TypeScript and Vite production compilation passed.
- npm install audit: 0 known vulnerabilities for portfolio dependencies.
- Browser code approximately 302 KB / 95.5 KB gzip; CSS approximately 51 KB / 10.5 KB gzip.
- Four local Latin-subset WOFF2 font files total approximately 79 KB. Source and SIL licenses included.
- All four selected projects use optimized, genuine screenshots. Source clones are not included in this repository.

## Browser checks

Before the image-only simplification: **23 checks passed**: 22 in the full run and the remaining existing reduced-motion test in a focused rerun after correcting a navigation-wait race in that test. Includes all routes/themes, contact validation, navigation, project dialogs and the new playground.

Google Chrome through Playwright against production output. T3 preview initially worked for source captures, then disconnected and timed out; local Chrome was used for final checks.

- Ten real routes tested at 320, 375, 430, 768, 1024, 1440 and 1680 pixels, with no horizontal overflow.
- Mobile menu open/close, Escape and focus return, navigation, skip link, archive filter, persisted theme switching, missing-route UI and reduced motion verified.
- Images loaded; desktop/mobile visual layouts inspected. Project screenshot capture corrected after the original browser capture was distorted.
- Form rejects incomplete input, encodes an email draft and reports “Nothing has been sent.” No email was sent by the test.
- Accessibility review found and fixed animation opacity contrast, a small portrait label, and CampusMesh’s dark-theme surface. Button background transition was removed so theme colors switch together.
- Automated axe WCAG 2 A/AA + 2.1 AA suite runs on all ten routes in both themes. Current run passed with zero violations across all 20 route/theme combinations. Manual screen-reader testing and user research have not been performed.

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


## Original image playground

- Added `/playground` and its navbar destination. Ten production HTML entries include metadata and the Vercel deep-link rewrite.
- Sixteen local original visuals: twelve interface concepts, two typography posters and two AI-generated artworks. Cards and image previews contain no Figma or external project links. The continuous canvas repeats this finite collection and the help text explains it.
- Verified mouse drag, long-distance wheel pan with bounded rendered tiles, zoom/reset/shuffle, keyboard panning, filters, Gallery browsing, image loading, image navigation, enlargement, Escape, focus containment and return, and restoration of body scrolling after leaving the route.
- Chrome touch simulation verified one-finger pan and two-finger pinch at 375 px. All ten routes fit 320, 375, 430, 768, 1024, 1440 and 1680 px without document overflow.
- Canvas, Gallery and image preview pass axe WCAG 2 A/AA and 2.1 AA checks in both themes. Reduced motion removes inertial and decorative animation. Manual screen-reader and real-device testing remain outside this run.
- Fixed a CSS grid intrinsic-row sizing issue found in interaction tests: Gallery rows now keep their content height instead of overlapping. Corrected an existing reduced-motion test to wait for the newly mounted route before reading computed styles.
- Inspected desktop Canvas, Gallery, expanded image preview, mobile Canvas and dark mobile Canvas; screenshots are `docs/qa/playground-*.png`. T3 collaborative preview worked for this revision; the repository’s Chrome workflow captured full-resolution QA images and ran automated checks.
- Production TypeScript/build succeeded. The lazy playground chunk is 18.31 KB / 6.83 KB gzip plus 10.36 KB / 2.79 KB gzip of route CSS. Re-ran the editable-artboard renderer successfully. No new Lighthouse score is claimed; the lab result above predates this route.


## Playground navigation correction

Removed the reference-inspired left rail at the owner’s request. Playground now renders the shared `Header` with identical top pill navigation, active state and mobile menu. The canvas sits beneath the header and spans the full width; theme switching moved to the bottom toolbar. Production build and the four playground interaction/accessibility checks passed. Refreshed desktop, mobile, dark-mobile, Gallery and preview screenshots.

Additional navigation/responsive run: all nine checks passed, covering all routes at seven widths, the shared active-pill navigation including Playground, and mobile menu dismissal followed by canvas touch gestures.


## Image-only playground simplification

At the owner’s request, removed the title/filter panel, Canvas/Gallery switch, conventional gallery, image-preview dialog, tile captions and bottom toolbar. The shared portfolio navbar remains above a full-width, full-height image canvas. Drag, wheel pan, pinch/Ctrl-scroll zoom and keyboard arrow/+/−/0 controls remain. Images are no longer buttons and clicking does not open an overlay. Each original concept is described once in screen-reader-only content; the repeating visual tiles are hidden from assistive technology. Deleted the unused viewer and icon components. Previous Gallery/preview screenshots document superseded UI and have been removed.

Current simplification validation: production TypeScript/build passed; all three focused playground checks passed, covering mouse/keyboard navigation, image loading and no popups, axe in both themes, and mobile menu/touch/pinch/reduced-motion behavior. Visual and overflow checks completed at 320, 390, 768 and 1440 px. Route assets reduced to 9.97 KB JS and 1.27 KB CSS before gzip.


## Homepage before/after comparison

- Added after About, before Achievements, with three original average/refined interface pairs and six local WebPs. Updated achievement section numbering.
- Inspected the six artboards and corrected bottom clipping in the planner and event designs. Reviewed desktop, mobile and dark mobile section captures in `docs/qa/comparison-*.png`.
- New tests verify placement, native slider keyboard endpoints and value text, synchronized before/after tracks, explicit pause/play, manual browsing, live reduced-motion changes, touch dragging, image delivery and axe checks in both themes. Layout checks include 320–1680 px across all ten routes.
- Full suite: 24 passed and one image-delivery check exposed lazy images remaining unloaded in the clipped layer. Fixed by requesting all six unique images when the section enters view. Focused rerun passed all four affected checks, including the three comparison tests and the existing image-delivery check. All 25 distinct checks now pass across those runs.
- Production TypeScript/build succeeds. No additional runtime dependency, integration or performance score claim. This section’s illustrations and UI visuals are authored in HTML/CSS rather than generated artwork.

## Faster comparison movement

Doubled the row speed from 24 to 48 px/s. Hover, focus and divider adjustments no longer pause it; explicit pause/manual browsing and reduced-motion behavior remain. Production build and all three comparison tests passed, including continued motion under the cursor and during keyboard divider adjustments, aligned layers, pause/play, touch and live reduced-motion changes.


## Education card redesign

Replaced the three identical wide cards with an academic folio layout: a featured powder-blue degree card with a prominent CGPA, followed by paired PU and school cards on desktop. Added numbered stages, small book line drawings, serif headings and large blue results. Mobile stacks the three cards with clear score dividers. Result data is structured into label/value/suffix fields; all institutions, qualifications and reported scores remain unchanged.

Production build passed. Verified content and no horizontal overflow at 320, 375, 430, 768, 1024, 1440 and 1680 px. Education passes axe WCAG 2 A/AA and 2.1 AA checks in both themes. Inspected `education-cards-desktop.png`, `education-cards-mobile.png` and `education-cards-dark-mobile.png`.

## Owner-supplied achievement photos

Added enhanced poster-presentation and debate photographs to their matching achievement cards, with unmodified JPEG originals accessible alongside each. Two optimized WebPs total approximately 200 KiB. The certificate is displayed in full; the event frame focuses on the certificate exchange. Updated the debate institution spelling and acknowledged the team result from the original certificate. Enhancement prompts and provenance are recorded in `docs/assets/achievement-photos.md`.

Production TypeScript/build passed. Verified both images load, original-photo URLs return successfully, and layouts have no horizontal overflow at 320, 375, 430, 768, 1024, 1440 and 1680 px. Achievement section passes axe WCAG 2 A/AA and 2.1 AA in light and dark themes. Inspected desktop/light and mobile/dark screenshots in `docs/qa/achievement-photos-*.png`. The existing image-delivery/reduced-motion and skills-first homepage checks passed.
