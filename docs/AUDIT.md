# Content and asset audit — 14 October 2026

Update, 15 October: the owner supplied a poster-presentation award photo and a debate winner certificate. Both are now included in the corresponding achievements. Original JPEGs are retained; enhanced presentation copies are explicitly labeled and linked to their originals. The original certificate supports a first-place team debate result at Ghousia College of Engineering. One poster photograph does not verify the total of three reported wins. See `docs/assets/achievement-photos.md` for provenance and edit prompts.

The initial workspace was empty. Read-only shallow clones of the six supplied repositories are in `/tmp/bhoomika-audit` (not shipped with the portfolio). Repository claims are not treated as runtime validation.

## Evidence inventory

- CampusMesh (`2dbebdd`): React/Vite frontend; Node/Express backend; PostgreSQL via pg; JWT authentication. Read Home.jsx, listingController.js, manifests, auth context and backend README. Search/filter, saved items and listing CRUD have source implementations; rental, delivery and payment modules also exist. Individual contribution (design, frontend, some backend) is owner-reported; commit history does not establish a reliable per-feature team attribution. Backend-dependent functionality and final demo require confirmation.
- AdaptUI (`2b0e0ba`): Manifest V3, vanilla JavaScript/HTML/CSS; bundled axe; popup-to-content messaging; four implemented profile modules and chrome.storage.local domain persistence. Read popup, content, manifest and keyboard overlay. Browser popup screenshot is UI evidence only, not proof of an installed-extension test. No measured accessibility improvements claimed.
- ClearHead (`d27ff68`): React/Vite client, fetch to Gemini generateContent; four structured response fields (control, cannot_control, core_fear, one_step). No backend or database in supplied repository. API key is read from a VITE variable and exposed to the client when configured; no key was supplied or used in this audit. App.jsx calls useEffect inside an asynchronous import callback (invalid hook usage). Owner reports completion, but available implementation must not be presented as a verified full-stack deployment. Portfolio itself has no keys or API integration.
- SafeScan: web reader failed, but Figma browser viewer successfully loaded the actual design. Canvas shows Home, Scan, label, insights, History and profile frames. Scope published is barcode-to-ingredients UI/UX, not working scanning or ingredient-analysis services. Captured Figma overview is genuine, with no invented research or validation results.
- MediMatch: React/TypeScript/Vite prototype; store.tsx uses localStorage and seeded demo hospitals/cases; role and resource-transfer screens. It is not a live emergency system. Kept in additional archive because selected four better cover design, collaboration, accessibility and AI.
- Expenses/SplitGrid: React frontends and Express/Mongoose/Socket.io backends; multiple implementation variants. README claims real-time change streams; no end-to-end verification, so archive describes expense-sharing scope only.
- BareMetal disaster-volunteer-platform: accessible repository; README describes volunteer/relief coordination. Event, team and participation supplied by owner. No ranking claimed.

## Owner-provided facts

Name, location, degree, institution, availability, email, experience responsibilities, debate win, poster wins, TechSprint selection and Code Carnage participation come from the owner. Dates, team sizes, client names, impact metrics and employment classifications beyond those supplied are omitted.

## Résumé conflict

Google Drive browser viewer works and exposes a one-page `Bhoomika_S_Resume (1).pdf`. It lists CGPA 8.59 (brief: 9.0), two poster wins (brief: three), and a React Native/Expo CampusMesh description differing from the inspected web repository. It does not establish Jarurat dates or agency engagement dates. Use newer owner-reported facts with attribution, and a “Request résumé” email action until the owner confirms/replaces this document. Do not advertise a current download.

## Missing assets / publication decisions

- Portrait: resolved in the owner’s follow-up. The supplied “Sunlit Professional Portrait in Black Blazer.png” is used as approved, resized into 480/960 px WebP variants, controlled in profile.ts. No generative changes were made.
- Jarurat approved dashboard screenshots: missing; not recreated or fabricated.
- Jarurat dates/year: not published; 20 June–20 September and “four months” conflict.
- WE3.BUILD dates, engagement classification and client permissions: missing; only owner-described role/responsibilities included.
- Reference A/B/C images: not supplied; treated as verbal design principles.
- Project screenshots: capture from unmodified source frontends or real Figma; label runtime limitations in case studies.
- Final domain unknown: canonical/sitemap generation deferred until SITE_URL is set; no invented domain.
- Contact uses a clearly explained mailto draft, not claimed server delivery.
- Remote repository creation and Vercel publication depend on available authenticated access. Local repository is newly initialized.

## Design revision from owner feedback

The wordmark now reads `Bhoomika.S`. The first section after the hero is a filterable verified-skills panel. Projects remain in the Work archive, where horizontal cards open an accessible detail dialog and retain links to full case-study routes. Reference: https://www.kabillanta.me/; homepage, skills, Projects and More Info overlay inspected directly on 14 October 2026. Reference claims, assets and personal content were not reused.

## Expanded design reference review — 14 October 2026

Inspected all six top-level pages at https://www.kabillanta.me/ in Chrome: Home, Experience, Education, Projects, Blogs and Contact. Followed navigation, scrolled the page content and inspected project overlays. The compact white capsule stays at the top; the active destination has a fine pill outline. Experience and education use spare vertical timelines; project previews use horizontal cards and detail overlays. Contact uses a two-column introduction and form. Generous spacing, understated shadows, short hover transitions and staged content entrances establish the rhythm. The homepage also has a subtle grid, recommendations and moving achievement content, which are not copied into Bhoomika’s portfolio.

Browser sampling observed 150–200 ms navigation color transitions and several longer decorative animations; timing is observational rather than a complete source audit. This adaptation uses shorter, bounded motion with no scroll interception, preserves the requested blue/porcelain identity and two typefaces, and publishes only Bhoomika’s existing verified content. Navigation now follows the reference’s five relevant routes, excluding Blogs and Skills. No new career facts, dates, technologies or outcomes were inferred from the reference.

T3 reference snapshots failed twice with `Preview automation snapshot timed out after 15000ms.` Chrome through Playwright was used for inspection and verification.

## Education update — owner supplied, 14 October 2026

Bhoomika confirmed Pre-University education at Mahesh PU College (93.3%) and Primary & High School at St. Mary's High School (83.3%). Added both below the degree on `/education`. No dates, study streams, examination boards or school locations were supplied or inferred. The percentages are presented as supplied, without assigning the school score to a specific examination.


## Original Playground — 14 October 2026

Inspected the owner’s 12.36-second “Screen Recording 2026-10-14 at 8.53.57 PM.mov” through 18 extracted frames. Observed a pannable, dotted gallery canvas with tilted, framed design images and a slim navigation rail. This is visual interaction evidence; no source code or Figma file for that reference was supplied.

The owner explicitly requested original images and no design links. `/playground` therefore contains 16 new concept images, not SafeScan exports or other project evidence. Fourteen UI/poster artboards are authored in editable HTML/CSS and rasterized; two original illustrations (blue clay companion and blue ribbon sculpture) were AI-generated and incorporated into selected artboards. All 16 final assets are local, optimized WebP. Fictional interface names, example content and metrics exist only within clearly labelled concepts, not claims about Bhoomika’s professional work. No third-party brands, client work, awards, integrations or Figma links were added to the gallery.


## Before/after reference and original studies — 14 October 2026

Inspected 18 extracted frames of the owner’s 11.04-second “Screen Recording 2026-10-14 at 10.04.05 PM.mov”. It shows a horizontally moving row of device/UI images with synchronized before/after layers and a vertical draggable divider. Adapted that interaction, without reusing the reference’s brands, screenshots or implied client work.

Created six code-authored artboards for three fictional interface studies: Second desk (campus resale), one thing. (study planning), and around campus (book-swap registration). Names, task dates, seller details, price and event copy are sample content, explicitly labelled. No metrics or tested outcomes are claimed. Lamp and book illustrations are CSS constructions; no generated images were used for the new section. It follows About, as requested. Existing verified professional/project content is unchanged.
