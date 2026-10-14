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

`useScrollReveals` uses IntersectionObserver and the browser’s animation API for one-time 650 ms upward arrivals, with a small stagger when several items enter together. Content is always rendered and readable. CSS adds a 450 ms route entrance, a 350 ms sliding navigation capsule and brief menu/hover/dialog transitions. Native scrolling remains intact; anchor links scroll smoothly. Ordinary portfolio pages retain native scrolling. Only the dedicated Playground canvas handles wheel gestures for panning and zoom. No perpetual animation or motion dependency is included. Changing reduced-motion preferences immediately cancels running reveal animations and disables CSS movement.

### About, achievements and contact

`About.tsx` presents a short introduction and three data-driven focus areas. `Achievements.tsx` displays four distinct owner-reported milestones, distinguishing awards, Round 1 selection and hackathon participation. Add approved event photos through each achievement’s optional `photo: { src, alt }` field in `src/data/profile.ts`, placing optimized images in `public/images/`. No missing-image boxes are published.

`sections.css` styles these sections. Contact uses semantic theme tokens: powder-blue/porcelain surfaces in light mode, blue-gray surfaces in dark mode. Its form remains an explicitly labeled email-draft flow.


## Original image playground

`/playground` is an image-only design playground inspired by the owner’s supplied screen recording. It uses the same shared top navigation and mobile menu as the rest of the portfolio; the canvas fills the viewport beneath it. The canvas follows the portfolio’s selected theme. Sixteen original concepts (12 interface studies, two posters and two pieces of artwork) repeat across a continuous canvas. It is an endless arrangement of a finite collection, not an image-generation service. No Figma or external project links appear on the images. Concept imagery is clearly distinguished from real portfolio projects and client work.

Drag or scroll to pan; pinch or Ctrl-scroll to zoom. The focused canvas supports arrow keys, +/− and 0 to reset. The page is deliberately image-only: no visible heading panel, filters, view switch, toolbar, image labels or preview modal. Images do not open links or overlays. A screen-reader-only heading, gesture instructions and single list of all 16 concept descriptions preserve access without repeating the looping tiles. Reduced motion removes inertia.

- `src/data/playground.ts`: image records, categories, descriptions and alt text.
- `src/hooks/usePlaygroundCanvas.ts`: scoped pointer, wheel, pinch and keyboard interactions.
- `src/styles/playground.css`: isolated responsive canvas presentation.
- `public/images/playground/`: 16 optimized WebP assets, approximately 552 KiB combined.
- `design/playground/artboards.html`: editable source for 14 original UI/poster images. The blue clay character and glossy blue ribbon artwork were generated with AI; their final assets are stored locally and reused in two concept artboards.

To regenerate the 14 UI/poster images, run the dev server, then `node scripts/render-playground.mjs`. This development-only renderer requires installed Google Chrome and Python 3 with Pillow. It captures each artboard, saves ignored intermediate PNGs under `design/playground/renders/`, and writes final WebPs into `public/images/playground/`. Set `PLAYGROUND_ORIGIN` if the server is not at localhost:5173. Normal development, builds and deployment do not require Python. New concepts can be added as local images and typed data entries without changing the canvas.

The route is lazy-loaded; canvas virtualization keeps the rendered tile count bounded while panning. Images remain local and no new runtime dependency or external integration was introduced.
