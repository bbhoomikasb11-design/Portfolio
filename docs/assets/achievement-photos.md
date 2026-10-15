# Achievement photos

The owner supplied two photographs and initially requested enhancement and publication in the matching homepage achievements. The first is the poster-presentation event; the second is the debate certificate. On 15 October 2026, the owner requested the original poster-presentation photo instead. That card now uses the untouched original JPEG, byte-for-byte identical to the attachment (SHA-256 `efd84f9a665ad69cf1ba8a17d20f3c4fd1f9a1ef770fd673e11f9883d3556a92`). No enhancement, recoloring or re-encoding is applied; CSS frames the certificate exchange within the existing compact card.

The debate certificate still uses its enhanced presentation image, edited with the built-in imagegen tool. Its original JPEG is retained unmodified. The visible “Enhanced photo / View original” strip remains removed at the owner's request; the debate enhancement is documented here and in its alt text. Generative enhancement can reconstruct fine detail; consult the original for documentary evidence.

Asset inventory:
- `public/images/achievements/poster-presentation-original.jpg` (717 × 1600) — currently displayed.
- `public/images/achievements/debate-enhanced.webp` (1280 × 959) — currently displayed.
- `public/images/achievements/poster-presentation-enhanced.webp` (840 × 1873) — retained from the previous revision; no longer displayed.
- `public/images/achievements/debate-original.jpg` — preserved source.

Pillow was used only for resizing and encoding the earlier enhanced WebPs. The original event photo is framed through CSS around the certificate exchange; its full image is retained. The certificate uses `object-fit: contain`, preserving the entire photographed document and overlapping handwritten note. Both displayed images are lazy-loaded with accurate intrinsic dimensions.

The original certificate supports the first-place debate result and spelling of Ghousia College of Engineering. Its handwritten note identifies a team result. The event photograph documents one presentation; the total of three poster wins remains owner-reported. No dates or further results were inferred.

## Final edit prompts

### Poster presentation

Use case: identity-preserve. Edit target: supplied real poster-presentation award photograph for a personal portfolio. Perform a very restrained photographic enhancement: lift shadow exposure on the people, neutralize cool color cast, improve local contrast and gently reduce compression noise. Keep natural documentary photography, not a generated or beautified appearance. Preserve EXACT identities, facial features, expressions, clothes, poses, hands, certificate, projected poster, room, furniture, framing and all existing text. Do not reconstruct unreadable detail or change text. No added elements, no replacement background, no skin smoothing, no invented details. Keep the original full portrait composition and dimensions/aspect ratio; cropping for the website will be done separately.

### Debate certificate

Use case: lighting-weather. Edit target: supplied photograph of an authentic debate award certificate for a portfolio. Enhance only photographic exposure, neutral white balance, mild contrast and gentle clarity. Preserve original composition, perspective, every letter of printed and handwritten text, every logo and signature, original paper texture, and the overlapping handwritten paper exactly. Do not redraw, retype, correct or reconstruct ANY text, logos, names, dates or covered content. Leave unclear text unclear rather than inventing it. Do not remove the overlapping note. No additions, no new borders, no rearrangement. Keep the original landscape aspect ratio. This is documentary evidence and must remain faithful to the original; enhancement should be subtle and photographic.
