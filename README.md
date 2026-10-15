# Bhoomika S — personal portfolio

An editorial, light-first React + Vite + TypeScript portfolio with a skills-first homepage, supplied portrait, floating navigation, expandable project cards, four case studies, an intentional dark theme and a contact form that prepares an email draft.

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
- `public/images`: real source-interface captures and cropped Figma overview; optimized WebP.
- `public/fonts`: locally served official Google Fonts. See `public/fonts/SOURCES.md`.

Replace the portrait by adding an optimized image under `public/images`, then setting `profile.portrait` to `{ src: '/images/portrait.webp', alt: 'Portrait of Bhoomika S' }`. The owner-supplied black-blazer portrait is served as 480 px and 960 px WebP variants through `srcSet`; it was resized/compressed without altering its contents. The monogram remains only as a fallback if portrait data is removed. Set `profile.resume` only after confirming a current public résumé. Until then the action opens a résumé request email.

## Contact behavior

No backend, API keys, third-party form provider or analytics are configured. Native validation requires a name, email and message. Submit opens an encoded `mailto:` draft in the visitor’s mail client and explains that nothing has been sent. The visitor must send the draft. If no mail client is configured, a visible address and retry link remain available. Any future hosted submission provider needs owner approval, implementation and real delivery testing.

## Design and motion

Semantic theme tokens live in `src/styles/tokens.css`; shared layout and responsive rules live in `global.css`, with navigation, skills, portrait and project-card presentation in `portfolio.css`. Exactly two primary font families are used: Cormorant Garamond and Manrope. Theme follows the system initially, persists an explicit choice and works when localStorage is blocked. CSS handles brief entrance movement, image hover/focus, dialog open/close transitions and short page entrances and staggered, once-only scroll reveals; no motion dependency or scroll hijacking. Reduced motion disables these effects. Main content is never hidden by an animation.

## Navigation and project previews

The reference at https://www.kabillanta.me/ informed the floating pill navigation, skill chips, horizontal work cards and project-detail overlay. Its Home, Experience, Education, Projects, Blogs and Contact pages, navigation changes, scroll behavior and More Info interaction were inspected in Chrome. The portfolio keeps its own palette, typography and verified content. The navbar contains Home, Experience, Education, Projects, Playground and Contact, with a sliding active capsule. Skills remain the first homepage section and do not appear in navigation. Experience, education and contact each have a real route. Experience appears only on its own page; the homepage moves from About to Achievements. Education is linked from About instead of repeated there. The theme toggle is in the footer. More Info opens a native modal dialog with a scrollable detail region, focus containment, Escape and backdrop dismissal, scroll locking and focus return. Full case-study links remain directly accessible. No animation library was added.

## Deployment to Vercel

The production output is `dist`. Build: `npm run build`. The metadata script emits ten HTML entry documents so page titles/descriptions exist before JavaScript runs. React Router handles subsequent navigation. Vercel rewrites preserve deep links; unknown project slugs show the application’s not-found page where a fallback is served.

```sh
npx vercel login
npx vercel --prod
```

Alternatively, create a **new** GitHub repository and import it into Vercel using the Vite preset. Do not attach this to an unrelated existing repository. This workspace has its own local Git repository, pushed to the owner-supplied remote `https://github.com/bbhoomikasb11-design/Portfolio`.

Once the actual production origin is known, set build environment variable `SITE_URL` to that HTTPS origin (no path) and redeploy. The build then adds absolute canonical/OG URLs and `sitemap.xml`. `robots.txt` is always emitted. No domain is invented. See `.env.example`. The optional variable is build-time only, not a secret. A social preview PNG is provided.

Vercel CLI reported logged out during the build. GitHub push succeeded through the existing Git credentials, without GitHub CLI. A production URL must only be reported after a successful deployment. Do not treat the local preview as deployed.

## Owner inputs still needed

1. Approved Jarurat dashboard images. The portrait has been supplied and added.
2. Confirm Jarurat year/dates: June 20–September 20 conflicts with the stated four-month duration.
3. Confirm WE3.BUILD engagement type/dates and permission for any future client examples.
4. Updated résumé: linked PDF says 8.59 CGPA and two poster wins; brief reports 9.0 and three. CampusMesh stack also differs from inspected source.
5. CampusMesh final demo, team attribution, and backend configuration for functional verification.
6. Installed-browser AdaptUI validation, and readable SafeScan frame exports/design rationale.
7. ClearHead server/key boundary and runtime corrections before claiming a working full-stack deployment. See audit.
8. Confirmed production origin and authenticated GitHub/Vercel access.

The website intentionally does not claim production readiness for the source projects, user metrics, client results or unverified research. Owner-reported achievements and academic results remain identified as reported.

### Motion implementation

`useScrollReveals` uses IntersectionObserver and the browser’s animation API for one-time 650 ms upward arrivals, with a small stagger when several items enter together. Content is always rendered and readable. CSS adds a 450 ms route entrance, a 350 ms sliding navigation capsule and brief menu/hover/dialog transitions. Native scrolling remains intact; anchor links scroll smoothly. Ordinary portfolio pages retain native scrolling. Only the dedicated Playground canvas handles wheel gestures for panning and zoom. No motion dependency is included. The before/after comparison row moves gently while visible, with pause controls and a static reduced-motion presentation. Changing reduced-motion preferences immediately cancels running reveal animations and disables CSS movement.

### About, achievements and contact

`About.tsx` presents a short introduction and three data-driven focus areas. `Achievements.tsx` displays four distinct milestones in a compact, swipeable row with previous/next controls, distinguishing awards, Round 1 selection and hackathon participation. The owner’s poster-presentation photo and debate certificate are included as enhanced WebPs with links to the untouched originals. The certificate supports the debate result; three poster wins and TechSprint selection remain self-reported. Configure approved photos through each achievement’s optional `photo` field in `src/data/profile.ts` (source, alt text, dimensions, original path and event/document presentation). See [photo provenance and enhancement prompts](docs/assets/achievement-photos.md). No missing-image boxes are published.

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
