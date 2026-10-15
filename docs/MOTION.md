# Portfolio motion audit

Reviewed 15 October 2026: Home, Experience, Education, Projects, Contact, Playground and all four case studies. This pass preserves the layouts, content, routes and existing continuous comparison movement.

## Findings and decisions

- The old hero and whole-page entrance ran together. Home now has a single layered opening; other routes have a shorter arrival.
- Reveal behavior depended on a static list of CSS selectors. Explicit `data-reveal` attributes now distinguish headings, images, content and achievement cards. Newly mounted filtered projects and dialog images are observed too.
- Navigation previously took 350 ms and route entrances 450 ms. Both now respond faster, while the hero has room for a deliberate sequence.
- Opacity on text and whole dialogs temporarily weakened contrast. Text now stays opaque. Heading masks, small translations and image/backdrop fades provide the movement.
- Theme colors previously changed abruptly. A brief native view transition reveals the complete new palette, keeping each view's text and background together.

## Motion map

| Element | Behavior | Timing |
| --- | --- | --- |
| Hero headline | Three masked lines, 70 ms apart | 1000 ms each; finished by 1140 ms |
| Hero portrait | Blue panel grows into place; portrait settles above it | 1000 ms; portrait offset 100 ms |
| Hero supporting details | Small arrivals for copy, actions, location and seal | 620 ms, finishing within 1060 ms |
| Main work CTA | Decorative arrow follows the mouse, capped at 4 px horizontally and 3 px vertically; fixed link bounds | 180 ms response |
| Editorial headings | Once-only mask and 16 px rise | 620 ms |
| About, experience, education and contact content | Once-only 14 px rise at full text opacity | 560 ms; stagger capped at 130 ms |
| Achievement cards | Existing rise/scale/settle pop; gentle hover lift | 650 ms entrance; 180 ms hover |
| Project and case-study screenshots | Small crop/scale reveal, preserving existing image framing | 560 ms |
| Main navigation | Active capsule follows the current route; underline on inactive link hover | 220 ms |
| Mobile menu | Short vertical arrival; immediate accessible dismissal | 220 ms |
| Standalone pages | Small arrival without delaying routing or focus | 240 ms |
| Project dialog | Scale/rise entrance; fading backdrop; brief closing fade | 240 ms open, 180 ms close |
| Buttons and links | Small arrow movement, hover lift and underline feedback | 180 ms; underlines 220 ms |
| Theme | Bottom-to-top reveal of the complete new palette | 240 ms |
| Skills filters | Small arrival for the new group; controls remain in place | 220 ms |
| Comparison and Playground | Existing movement and gesture behavior retained | Comparison 48 px/s, left to right; canvas entrances 460 ms |

## Implementation and safeguards

`src/styles/motion.css` is the shared source of duration and easing tokens. Durations use milliseconds so `src/lib/motion.ts` can pass the same values to Web Animations. No runtime dependency was added.

`useScrollReveals` uses IntersectionObserver and an observer for newly mounted elements. It unobserves completed or disconnected targets and cancels animation on route cleanup. Content is readable without observation; CSS does not keep sections hidden. Keyboard focus settles the relevant entrance immediately. Headings retain their native markup and accessible names.

`useMagneticCTA` writes offsets on one decorative surface, with at most one update per animation frame. It runs only for a fine mouse pointer with motion enabled. Pointer exit/cancel, keyboard input and preference changes reset it. The clickable area never follows the pointer.

Theme transitions use the browser's [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition). The old and new snapshots remain opaque, with a clip reveal instead of blending text through low-contrast intermediate colors. Feature detection provides an immediate fallback. Rapid changes invalidate old callbacks; cleanup and a live reduced-motion change skip the transition and settle the latest preference. Storage remains optional.

Reduced motion disables CSS entrances, cancels active reveals and magnetic movement, and switches themes immediately. Touch keeps direct controls and native page scrolling. The continuous comparison still has explicit pause/manual controls and does not pause under the cursor; the Playground remains the only surface that handles wheel gestures for panning and zoom.

See `tests/motion.spec.ts` and `docs/QA.md` for verification. Automated checks complement the desktop/mobile visual review; no new real-device or performance score is claimed.
