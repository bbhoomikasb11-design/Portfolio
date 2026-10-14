# Bhoomika S — personal portfolio

An editorial, light-first React + Vite + TypeScript portfolio with a project archive, four case studies, an intentional dark theme, responsive navigation and a contact form that prepares an email draft.

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

Browser tests use installed Google Chrome. For CI without Chrome, install Chrome with `npx playwright install chrome`, or adapt the Playwright config to your managed browser. The test suite covers six routes at seven widths, keyboard/menu behavior, filtering, theme persistence, draft validation, reduced motion, images and axe WCAG checks in both themes. Automated checks do not replace assistive-technology or usability testing.

## Content and assets

- `src/data/profile.ts`: owner details, grouped skills, achievements, portrait and résumé configuration.
- `src/data/projects.ts`: typed projects, evidence-aware case studies and additional archive.
- `src/data/experience.ts`: experience entries; dates intentionally omitted pending confirmation.
- `docs/AUDIT.md`: inspected sources, scope limits, discrepancies and asset inventory.
- `docs/QA.md`: measured checks and publication status.
- `public/images`: real source-interface captures and cropped Figma overview; optimized WebP.
- `public/fonts`: locally served official Google Fonts. See `public/fonts/SOURCES.md`.

Replace the portrait by adding an optimized image under `public/images`, then setting `profile.portrait` to `{ src: '/images/portrait.webp', alt: 'Portrait of Bhoomika S' }`. The current monogram is explicitly labeled as a placeholder, not a fabricated portrait. Set `profile.resume` only after confirming a current public résumé. Until then the action opens a résumé request email.

## Contact behavior

No backend, API keys, third-party form provider or analytics are configured. Native validation requires a name, email and message. Submit opens an encoded `mailto:` draft in the visitor’s mail client and explains that nothing has been sent. The visitor must send the draft. If no mail client is configured, a visible address and retry link remain available. Any future hosted submission provider needs owner approval, implementation and real delivery testing.

## Design and motion

Semantic theme tokens live in `src/styles/tokens.css`; shared layout and responsive rules live in `global.css`. Exactly two primary font families are used: Cormorant Garamond and Manrope. Theme follows the system initially, persists an explicit choice and works when localStorage is blocked. CSS handles brief entrance movement, image hover/focus and supported scroll-linked heading movement; no motion dependency or scroll hijacking. Reduced motion disables these effects. Main content is never hidden by an animation.

## Deployment to Vercel

The production output is `dist`. Build: `npm run build`. The metadata script emits six HTML entry documents so page titles/descriptions exist before JavaScript runs. React Router handles subsequent navigation. Vercel rewrites preserve deep links; unknown project slugs show the application’s not-found page where a fallback is served.

```sh
npx vercel login
npx vercel --prod
```

Alternatively, create a **new** GitHub repository and import it into Vercel using the Vite preset. Do not attach this to an unrelated existing repository. This workspace has its own local Git repository, pushed to the owner-supplied remote `https://github.com/bbhoomikasb11-design/Portfolio`.

Once the actual production origin is known, set build environment variable `SITE_URL` to that HTTPS origin (no path) and redeploy. The build then adds absolute canonical/OG URLs and `sitemap.xml`. `robots.txt` is always emitted. No domain is invented. See `.env.example`. The optional variable is build-time only, not a secret. A social preview PNG is provided.

Vercel CLI reported logged out during the build. GitHub push succeeded through the existing Git credentials, without GitHub CLI. A production URL must only be reported after a successful deployment. Do not treat the local preview as deployed.

## Owner inputs still needed

1. Real portrait and approved Jarurat dashboard images.
2. Confirm Jarurat year/dates: June 20–September 20 conflicts with the stated four-month duration.
3. Confirm WE3.BUILD engagement type/dates and permission for any future client examples.
4. Updated résumé: linked PDF says 8.59 CGPA and two poster wins; brief reports 9.0 and three. CampusMesh stack also differs from inspected source.
5. CampusMesh final demo, team attribution, and backend configuration for functional verification.
6. Installed-browser AdaptUI validation, and readable SafeScan frame exports/design rationale.
7. ClearHead server/key boundary and runtime corrections before claiming a working full-stack deployment. See audit.
8. Confirmed production origin and authenticated GitHub/Vercel access.

The website intentionally does not claim production readiness for the source projects, user metrics, client results or unverified research. Owner-reported achievements and academic results remain identified as reported.
