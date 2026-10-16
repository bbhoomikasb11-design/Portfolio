# Single-page redesign review — 16 October 2026

This record describes the application on [`redesign/single-page`](https://github.com/bbhoomikasb11-design/Portfolio/tree/redesign/single-page), beginning with implementation commit `38b01fc`. It does not describe a new production deployment. The owner requested local review while retaining the older live portfolio.

## Implemented changes

- One page with a small portrait and short introduction, followed by four substantial project previews and direct GitHub/Figma links.
- Compact skill groups, experience, education and achievements; email and social links replace a separate contact page.
- A finite playground showing four studies on desktop and two on mobile. Its module loads near the viewport; full-size images load only when opened.
- Removal of the continuous comparison ticker, infinite panning canvas and animation-frame loops. A native dialog supports keyboard access, Escape and focus restoration.
- Consistent light/dark palette tokens, reduced-motion support and compatibility for previously shared project/page URLs.

## Completed local validation

The production build succeeded and all **19 Playwright tests passed in 23.8 seconds**. Coverage includes widths 320, 375, 390, 430, 768, 1024, 1440 and 1680 px, navigation, theme persistence, bounded pagination, lazy loading, original achievement photo use and all fourteen design images. Axe checks passed for the page and design dialog in both themes at 390 and 1440 px.

| Build asset | Previous version | Redesign |
| --- | --- | --- |
| Initial JavaScript | 317.39 kB / 100.33 kB gzip | 242.05 kB / 75.83 kB gzip |
| Shared CSS | 72.49 kB / 14.55 kB gzip | 13.96 kB / 3.63 kB gzip |

The gallery adds 8.76 kB JavaScript and 2.38 kB CSS on demand. One cold-cache Chrome lab run at 390 × 844, with 4× CPU slowdown, 1.6 Mbps download, 750 Kbps upload and 150 ms latency, measured LCP 1.956 s and CLS 0. The gallery was absent from initial loading, and the run recorded zero application animation-frame callbacks. These are local lab results, not field data, an INP result or a Lighthouse score.

Screenshots, raw measurements and detailed test notes are preserved in the [redesign's QA directory](https://github.com/bbhoomikasb11-design/Portfolio/tree/redesign/single-page/docs/qa) and [QA log](https://github.com/bbhoomikasb11-design/Portfolio/blob/redesign/single-page/docs/QA.md).

## Before any future publication

1. Obtain the owner's request to publish this version; the present instruction is local review only.
2. Re-run the production build and relevant tests after any further application changes.
3. Verify canonical metadata and legacy redirects against the final hosting configuration; redesigned redirects have not been exercised in production.
4. Retain the known content limits: unverified demos are not presented as live products, experience dates remain unconfirmed, and a current résumé is still needed for a download action.

GitHub backups and these documentation updates leave the production application source unchanged.
