# Content and asset audit — 14 October 2026

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

- Real owner portrait: missing. Hero uses a clearly labeled typographic portrait placeholder, controlled in profile.ts.
- Jarurat approved dashboard screenshots: missing; not recreated or fabricated.
- Jarurat dates/year: not published; 20 June–20 September and “four months” conflict.
- WE3.BUILD dates, engagement classification and client permissions: missing; only owner-described role/responsibilities included.
- Reference A/B/C images: not supplied; treated as verbal design principles.
- Project screenshots: capture from unmodified source frontends or real Figma; label runtime limitations in case studies.
- Final domain unknown: canonical/sitemap generation deferred until SITE_URL is set; no invented domain.
- Contact uses a clearly explained mailto draft, not claimed server delivery.
- Remote repository creation and Vercel publication depend on available authenticated access. Local repository is newly initialized.
