# Interaction policy — single-page revision, 16 October 2026

The owner requested a compact page and removal of endless movement. The old cinematic hero, comparison ticker, infinite canvas, magnetic pointer tracking and scroll reveal observers have been removed from the runtime.

| Interaction | Behavior | Timing |
| --- | --- | --- |
| Links and buttons | Color/border feedback | 160 ms |
| Navigation | Underline on hover or keyboard focus | 180 ms |
| Project preview | 3 px image lift inside a fixed link | 200 ms |
| Gallery preview | 3 px image lift; optional hover label | 180 ms |
| Design dialog | 6 px entrance with brief opacity change | 180 ms |
| Theme | Background/text palette transition | 220 ms |
| Section anchors | Native smooth scrolling | Browser controlled |

There are no continuous animation-frame callbacks, automatic gallery page changes, wheel handlers, timed loops or hidden content waiting for animation. Touch has visible preview labels and ordinary page scrolling. Hover is supplementary; titles and direct project links are always visible.

`prefers-reduced-motion: reduce` disables transitions, dialog animation and smooth scrolling. The CSS preference remains live; no JavaScript motion controller is needed. The gallery's IntersectionObserver only determines when to load its module and disconnects after the first intersection.

A design opens in a native `<dialog>`. Closing first releases native modality, then restores focus to the opening button. Body scrolling is restored on unmount. The accessible menu supports Escape; theme choice persists when browser storage is available and otherwise remains usable for the session.
