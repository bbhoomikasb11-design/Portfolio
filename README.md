# Bhoomika S — personal portfolio

A light-first React + Vite + TypeScript portfolio with a bold portrait-led opening, a skills-first homepage, floating navigation, expandable project cards, four case studies, an intentional dark theme and a contact form that prepares an email draft.

## Production and redesign branches

`main` retains the application currently deployed at [bhoomika-portfolio-liard.vercel.app](https://bhoomika-portfolio-liard.vercel.app).

The new, project-first single-page version is backed up separately on [`redesign/single-page`](https://github.com/bbhoomikasb11-design/Portfolio/tree/redesign/single-page). Its development server uses **http://localhost:5174**; the original version uses port 5173. The redesign has not been merged into the production application or deployed. Keep it as a local preview until the owner requests publication.

See [the separate-preview workflow](docs/LOCAL_PREVIEWS.md) for running both versions and [the redesign review record](docs/REDESIGN_REVIEW.md) for completed validation and remaining publication checks.

## Run locally

Use Node.js 22.12+ (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm run preview
npm test
```

Browser tests use installed Google Chrome. For CI without Chrome, install Chrome with `npx playwright install chrome`, or adapt the Playwright config to your managed browser. The test suite covers ten routes at seven widths, keyboard/menu behavior, filtering, theme persistence, draft validation, reduced motion, images and axe WCAG checks in both themes. Automated checks do not replace assistive-technology or usability testing.

## Content and assets

- `src/data/profile.ts`: owner details, grouped skills, achievements, portrait and résumé configuration.
- `src/data/projects.ts`: typed projects, evidence-aware case studies and additional archive.
- `src/data/experience.ts`: experience entries; dates intentionally omitted pending confirmation.
- `docs/AUDIT.md`: inspected sources, scope limits, discrepancies and asset inventory.
- `docs/QA.md`: measured checks and publication status.
- `public/images`: real source-interface captures, the owner-supplied SafeScan homepage and the original Figma overview; optimized WebP.
- `public/fonts`: locally served official Google Fonts. See `public/fonts/SOURCES.md`.

The opening content and portrait sources live in `profile.opening` and `profile.heroPortrait`. `Hero.tsx` uses 360/720 px transparent WebP variants of the owner's supplied black-blazer portrait, prepared with built-in imagegen background extraction. CSS supplies the monochrome treatment; the blue panel is a separate element. The edited source is preserved in `design/hero/portrait-cutout.png`, and the original, uncut owner photo remains available in the existing 480/960 px assets and `profile.portrait`. See the prompt and provenance in `docs/AUDIT.md`. When replacing the cutout, preserve alpha and update the image's intrinsic width/height in `Hero.tsx` if its proportions change. Set `profile.resume` only after confirming a current public résumé. Until then the action opens a résumé request email.

## Contact behavior

No backend, API keys, third-party form provider or analytics are configured. Native validation requires a name, email and message. Submit opens an encoded `mailto:` draft in the visitor’s mail client and explains that nothing has been sent. The visitor must send the draft. If no mail client is configured, a visible address and retry link remain available. Any future hosted submission provider needs owner approval, implementation and real delivery testing.

## Design and motion

Semantic theme tokens live in `src/styles/tokens.css`; shared layout and responsive rules live in `global.css`, with navigation, skills, portrait and project-card presentation in `portfolio.css`. Exactly two primary font families are used: Cormorant Garamond and Manrope. Theme follows the system initially, persists an explicit choice and works when localStorage is blocked. CSS handles brief entrance movement, image hover/focus, dialog open/close transitions and short page entrances and staggered, once-only scroll reveals; no motion dependency or scroll hijacking. Reduced motion disables these effects. Content is rendered immediately, remains accessible to assistive technology, and is fully visible when motion is disabled. Selected headings briefly reveal through a mask.

The current opening is isolated in `components/Hero.tsx` and `styles/hero.css`: Manrope 800 stacked type, electric-blue emphasis, a monochrome portrait cutout, an availability seal linked to Contact, and an italic Cormorant margin note. The bold headline uses the confirmed designer/developer positioning. The original tagline remains in the lower strip. View my work opens Projects; Explore my skills jumps to the first section. Mobile recomposes these elements vertically. The portrait and blue panel have brief CSS entrances that respect reduced motion. Manrope 800 is locally hosted from official Google Fonts and preloaded; no third primary font was added.

## Navigation and project previews

The reference at https://www.kabillanta.me/ informed the floating pill navigation, skill chips, horizontal work cards and project-detail overlay. Its Home, Experience, Education, Projects, Blogs and Contact pages, navigation changes, scroll behavior and More Info interaction were inspected in Chrome. The portfolio keeps its own palette, typography and verified content. The navbar contains Home, Experience, Education, Projects, Playground and Contact, with a sliding active capsule. Skills remain the first homepage section and do not appear in navigation. Experience, education and contact each have a real route. Experience appears only on its own page; the homepage moves from About to Achievements. Education is linked from About instead of repeated there. The theme toggle is in the footer. More Info opens a native modal dialog with a scrollable detail region, focus containment, Escape and backdrop dismissal, scroll locking and focus return. Full case-study links remain directly accessible. No animation library was added.

## Deployment to Vercel

Live portfolio: [bhoomika-portfolio-liard.vercel.app](https://bhoomika-portfolio-liard.vercel.app). Published on 15 October 2026 to the `bhoomika-portfolio` project in the owner's `bbhoomikasb11-6572` scope, using Node.js 24 and the Vite configuration in `vercel.json`.

The production output is `dist`. Build: `npm run build`. The metadata script emits ten HTML entry documents so page titles/descriptions exist before JavaScript runs. React Router handles subsequent navigation. Vercel rewrites preserve deep links; unknown project slugs show the application’s not-found page where a fallback is served.

`.vercelignore` keeps design sources, QA captures, tests and local environment files out of CLI uploads. The app source, public assets and metadata build script are included.

```sh
npx vercel login
npx vercel link --yes --project bhoomika-portfolio --scope bbhoomikasb11-6572
npx vercel deploy --prod --scope bbhoomikasb11-6572
```

Source is pushed to the owner-supplied [Portfolio repository](https://github.com/bbhoomikasb11-design/Portfolio). Automatic deployment on GitHub pushes is not connected: Vercel requires the owner to add a GitHub login connection first. The CLI deployment above works now. Once that connection exists, run `npx vercel git connect https://github.com/bbhoomikasb11-design/Portfolio.git --yes --scope bbhoomikasb11-6572` to enable repository deployments.

The Vercel production environment has `SITE_URL=https://bhoomika-portfolio-liard.vercel.app`. The build emits canonical/OG URLs, `sitemap.xml` and `robots.txt` for that origin, plus the supplied social preview image. If a custom domain is added later, change `SITE_URL` to that HTTPS origin (without a path) and redeploy. This is a public build-time setting, not a secret; see `.env.example`.

The public production URL was verified without Vercel authentication. All ten routes return their page-specific metadata, and direct case-study refreshes work. See `docs/QA.md` for production browser checks. No contact backend or third-party form provider was introduced; contact continues to prepare an email draft.

## Owner inputs still needed

1. Approved Jarurat dashboard images. The portrait has been supplied and added.
2. Confirm Jarurat year/dates: June 20–September 20 conflicts with the stated four-month duration.
3. Confirm WE3.BUILD engagement type/dates and permission for any future client examples.
4. Updated résumé: linked PDF says 8.59 CGPA and two poster wins; brief reports 9.0 and three. CampusMesh stack also differs from inspected source.
5. CampusMesh final demo, team attribution, and backend configuration for functional verification.
6. Installed-browser AdaptUI validation, and the remaining SafeScan flow-screen exports/design rationale. The homepage image has been supplied and added.
7. ClearHead server/key boundary and runtime corrections before claiming a working full-stack deployment. See audit.

The website intentionally does not claim production readiness for the source projects, user metrics, client results or unverified research. Owner-reported achievements and academic results remain identified as reported.

### Motion implementation

`styles/motion.css` owns shared duration and easing tokens: 180 ms controls, 220 ms navigation, 240 ms page/dialog entry, 560 ms images, 620 ms headings, 650 ms achievement pops, a 1000 ms hero sequence (1140 ms including stagger), and a 240 ms theme reveal. `useScrollReveals` observes explicit `data-reveal` targets once, including newly mounted filtered cards and modal images. Focus settles an active entrance immediately. Text stays at full contrast; opacity fades are reserved for images, decorative surfaces and modal backdrops. The hero CTA moves only its decorative arrow surface by at most 4 × 3 px on a fine pointer; its hit target stays fixed. Theme changes reveal a complete palette through the native View Transition API, with an immediate fallback for unsupported browsers and reduced motion.

Native scrolling remains intact. The comparison keeps its existing 48 px/s left-to-right movement, explicit pause controls and continued motion under hover. Playground retains its own gesture interpolation and card entrances. Live reduced-motion changes cancel reveals, magnetic offsets and theme transitions. No animation dependency was added. See [the motion audit and interaction matrix](docs/MOTION.md) for details and verification.

### About, achievements and contact

`About.tsx` presents a short introduction and three data-driven focus areas. `Achievements.tsx` displays four distinct milestones in a compact, swipeable row with previous/next controls, distinguishing awards, Round 1 selection and hackathon participation. The poster-presentation card uses the owner’s untouched original JPEG; the debate certificate uses its enhanced WebP. The photo utility strip is omitted at the owner’s request; untouched originals and their paths remain in the asset inventory and profile data. Cards pop in once with a short stagger as they enter view, including during sideways browsing, and lift gently on hover or link focus. Reduced motion disables these effects. The certificate supports the debate result; three poster wins and TechSprint selection remain self-reported. Configure approved photos through each achievement’s optional `photo` field in `src/data/profile.ts` (source, alt text, dimensions, original path and event/document presentation). See [photo provenance and enhancement prompts](docs/assets/achievement-photos.md). No missing-image boxes are published.

`sections.css` styles these sections. Contact uses semantic theme tokens: powder-blue/porcelain surfaces in light mode, blue-gray surfaces in dark mode. Its form remains an explicitly labeled email-draft flow.


## Original image playground

`/playground` is an image-only design playground inspired by the owner’s supplied screen recordings. It uses the same shared top navigation and mobile menu as the rest of the portfolio; the canvas fills the viewport beneath it and follows the selected theme. Fourteen studies repeat across a continuous canvas: eight full-length pages (bakery, architecture, cycling, pottery, coffee, produce, travel editorial and software), four additional landing pages (lakeside hospitality, a listening room, lighting and independent-work finances), and two detailed interface studies. It is an endless arrangement of a finite collection, not an image-generation service. No Figma or external project links appear on the images. Concept imagery is clearly distinguished from real portfolio projects and client work.

Drag or scroll to pan; pinch or Ctrl-scroll to zoom. The focused canvas supports arrow keys, +/− and 0 to reset. The page is deliberately image-only: no visible heading panel, filters, view switch, toolbar, image labels or preview modal. Images do not open links or overlays. A screen-reader-only heading, gesture instructions and single list of all fourteen concept descriptions preserve access without repeating the looping tiles. A single animation loop eases wheel/drag movement, adds release momentum and a restrained directional lean; hover does not pause it. Cards have a short entrance when they first enter the viewport. Reduced motion removes interpolation, inertia, entrance movement and directional lean, including when the preference changes live.

- `src/data/playground.ts`: image records, categories, descriptions and alt text.
- `src/hooks/usePlaygroundCanvas.ts`: scoped pointer, wheel, pinch and keyboard interactions.
- `src/components/playground/PlaygroundCard.tsx`: framed image and reduced-motion-aware entrance.
- `src/styles/playground.css`: isolated responsive canvas presentation.
- `public/images/playground/`: fourteen optimized WebP assets, each 1000 px wide; mixed heights preserve the full compositions.
- `design/playground/artboards.html`: editable HTML/CSS source for eight complete landing pages, with distinct compositions, identities and specific sample copy. Photography is locally saved from Unsplash; source URLs and the license link are recorded in `design/playground/photos/sources.json`. Floor-plan, route and vessel illustrations are authored as SVG. No generative artwork is used in the current playground.
- `design/playground/premium.html`: four additional landing pages and two landscape interface studies, with CSS vinyl artwork, an original sample ledger, and licensed lake/lamp photography.

To regenerate all fourteen images, run the dev server, then `node scripts/render-playground.mjs`; add `--premium` to render only the six newer studies. This development-only renderer requires installed Google Chrome and Python 3 with Pillow. It checks both horizontal and vertical content bounds, saves ignored intermediate PNGs under `design/playground/renders/`, and writes final WebPs into `public/images/playground/`. Set `PLAYGROUND_ORIGIN` if the server is not at localhost:5173. Normal development, builds and deployment do not require Python. The renderer also records dimensions in `design/playground/dimensions.json`. Tiles are 542 px wide with 26 px corners, a 5 px rim and subtle alternating tilts. Each column packs mixed-height cards with consistent gaps instead of using fixed-height rows. The zoom range is 0.3×–2.2×. When changing the number of studies, keep the column sequence stride coprime to the collection size so every study appears in each cycle. Brand names, prices, opening hours, product details and stories are fictional concept content, not claims about actual businesses or Bhoomika’s clients.

The route is lazy-loaded; canvas virtualization keeps the rendered tile count bounded while panning. Images remain local and no new runtime dependency or external integration was introduced.


## Before and after design studies

The homepage places `DesignComparison` directly after About and before Achievements. It adapts the owner’s second recording into a moving row of three original page pairs with a draggable before/after divider. Butter & Crumb uses warm red and butter yellow for a bakery shopfront; Longway uses ink, lime and oversized type for a cycling shop; Field House uses olive, warm paper and an editorial layout for a weekend stay. Each pair keeps the same core facts and source photograph while changing hierarchy, composition, copy and the next action. The before screens are plain, functional first drafts. These are fictional concept studies, not client projects or measured improvements.

The six 900 × 1125 images are authored in HTML/CSS with the portfolio's two local typefaces. Bread, bicycle and interior photographs reuse the local licensed sources documented in `design/playground/photos/sources.json`. No generative imagery is used in this section. Edit `design/comparison/artboards.html`, run the dev server and then `node scripts/render-comparison.mjs` (installed Chrome and Python/Pillow required). The renderer waits for photographs/fonts, checks overflow and footer bounds, and writes optimized local WebPs to `public/images/comparison/`. The component copy lives in `src/components/DesignComparison.tsx`; presentation is in `src/styles/comparison.css`.

The native range input supports dragging, touch and keyboard arrows/Home/End. The row moves from left to right at 48 pixels per second and continues through hover, focus and divider adjustment. Previous/next controls pause for deliberate browsing, and an explicit Pause/Play action remains available. Reduced motion starts with a stationary row and manual browsing with no transition. Movement suspends outside the viewport and in hidden tabs. Both image layers share a single position so the comparison stays aligned. Images load when the section enters view, including the offscreen repeated copies needed for a seamless loop. The visible notes describe the changes for everyone; repeated decorative images are hidden from assistive technology.
