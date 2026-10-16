# Bhoomika S — personal portfolio

A project-first, single-page portfolio for Bhoomika S, a developer and product designer in Bengaluru.

**Redesign preview:** http://localhost:5174 on branch [`redesign/single-page`](https://github.com/bbhoomikasb11-design/Portfolio/tree/redesign/single-page).

**Existing live site (previous design):** https://bhoomika-portfolio-liard.vercel.app

The redesign is backed up on its own GitHub branch. Per the owner’s instruction, it is previewed locally and remains undeployed; the existing production version stays unchanged. Pushing source to GitHub does not authorize publishing the redesign.

## Development

Use Node.js 22.12+ (production uses Node.js 24).

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
npm test
```

`npm run dev` uses port 5174 with strict port checking so this redesign stays separate from the previous localhost.

Browser tests use installed Google Chrome through Playwright. For CI without Chrome, run `npx playwright install chrome`. Tests cover responsive layouts, native anchor navigation, legacy links, both themes, keyboard and modal focus, image loading, finite gallery pagination, lazy loading and axe accessibility checks.

## Page and content

The entire portfolio lives at `/`. Navigation uses native section anchors. Old `/projects`, case-study, `/playground`, `/experience`, `/education`, `/about` and `/contact` links redirect to their corresponding sections. A client-side fallback also supports these links during local Vite development.

Page order: short introduction and small portrait → four selected projects → compact skills → bounded playground → brief experience and education → small achievements → social footer. Contact is by email, GitHub and LinkedIn; there is no form provider or separate contact page.

- `src/data/projects.ts`: selected work, individual contributions, status, screenshots and direct source/Figma links.
- `src/data/profile.ts`: owner information, skill groups and achievements.
- `src/data/experience.ts` and `education.ts`: owner-provided background.
- `src/data/playground.ts`: fourteen original design studies, with accurate descriptions and full-image dimensions.
- `src/styles/tokens.css`: consistent porcelain, near-black, blue and powder-blue tokens for light/dark themes.
- `docs/AUDIT.md`: original evidence and asset audit. The older long-form project material and multipage README are retained in `docs/archive/` for reference, outside the application bundle.

The small portrait uses the supplied photograph with CSS framing. The poster-presentation achievement uses the untouched original JPEG. Project status remains qualified where a live demo or complete integration has not been verified. No new production-readiness, health, client or award claims were added.

## Playground and performance

The gallery module and its CSS load once the section is within 240 px of the viewport. It displays four studies on desktop and two on small screens, using finite Previous/Next controls. There is no autoplay, repeating carousel, panning canvas, wheel interception or continuous animation-frame loop.

Only the current page's optimized 600 × 750 thumbnails is mounted. Full-resolution artwork loads on explicit selection, in a keyboard-accessible native dialog with Escape, scroll locking and focus restoration. The placeholder reserves the same layout as the loaded gallery. Reduced motion disables transitions and the short dialog entrance.

To edit a study, change the original HTML/CSS in `design/playground/`. With the dev server running, use `node scripts/render-playground.mjs` (or add `--premium` for the six newer studies), then `python3 scripts/playground-thumbnails.py`. These optional authoring tools use installed Chrome and Python/Pillow. Normal builds do not require Python. Licensed photograph sources remain documented in `design/playground/photos/sources.json`. Studies are fictional concepts, not client work.

## Production reference

Do not deploy this redesign unless the owner later requests publication. The following configuration is retained for that future handoff.

The Vercel project is `bbhoomikasb11-6572/bhoomika-portfolio`. After a successful production build and tests:

```sh
npx --yes vercel deploy --prod --yes --scope bbhoomikasb11-6572
```

The production environment sets `SITE_URL=https://bhoomika-portfolio-liard.vercel.app`. This public build-time setting generates one canonical URL, Open Graph URL, robots.txt and a single-entry sitemap. Set it to the final HTTPS origin if the domain changes. See `.env.example`. No application secrets or third-party integrations are required. Never commit `.env.local` or `.vercel/`.

`vercel.json` defines legacy redirects and static-asset handling. `.vercelignore` limits uploads to application build inputs. GitHub auto-deployment is not connected; publishing currently uses the authenticated CLI.

## Remaining owner inputs

- A current résumé, if a download action is desired.
- Confirmed experience dates and public-share permission/screenshots for client work.
- Verified live-demo URLs and remaining implementation checks documented in the project audit.
- Additional research/flow evidence for detailed project narratives, if restored later.

See `docs/QA.md` for measured verification and `docs/MOTION.md` for the current interaction policy. Historical QA entries describe previous revisions, not the current single-page layout.
