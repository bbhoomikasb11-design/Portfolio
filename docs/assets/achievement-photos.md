# Achievement photos

The owner supplied two photographs and requested enhancement and publication in the matching homepage achievements. The first is the poster-presentation event; the second is the debate certificate. Images were edited with the built-in imagegen tool (not the CLI). These are enhanced presentation images, not archival scans. Original JPEGs are retained unmodified and linked beside each image. Generative enhancement can reconstruct fine detail; consult the original for documentary evidence.

Published assets:
- `public/images/achievements/poster-presentation-enhanced.webp` (840 × 1873)
- `public/images/achievements/debate-enhanced.webp` (1280 × 959)
- `public/images/achievements/poster-presentation-original.jpg`
- `public/images/achievements/debate-original.jpg`

Pillow was used only for final image resizing and WebP encoding. The event image is framed through CSS around the certificate exchange; its full image is retained. The certificate uses `object-fit: contain`, preserving the entire photographed document and overlapping handwritten note. Both images are lazy-loaded with explicit dimensions.

The original certificate supports the first-place debate result and spelling of Ghousia College of Engineering. Its handwritten note identifies a team result. The event photograph documents one presentation; the total of three poster wins remains owner-reported. No dates or further results were inferred.

## Final edit prompts

### Poster presentation

Use case: identity-preserve. Edit target: supplied real poster-presentation award photograph for a personal portfolio. Perform a very restrained photographic enhancement: lift shadow exposure on the people, neutralize cool color cast, improve local contrast and gently reduce compression noise. Keep natural documentary photography, not a generated or beautified appearance. Preserve EXACT identities, facial features, expressions, clothes, poses, hands, certificate, projected poster, room, furniture, framing and all existing text. Do not reconstruct unreadable detail or change text. No added elements, no replacement background, no skin smoothing, no invented details. Keep the original full portrait composition and dimensions/aspect ratio; cropping for the website will be done separately.

### Debate certificate

Use case: lighting-weather. Edit target: supplied photograph of an authentic debate award certificate for a portfolio. Enhance only photographic exposure, neutral white balance, mild contrast and gentle clarity. Preserve original composition, perspective, every letter of printed and handwritten text, every logo and signature, original paper texture, and the overlapping handwritten paper exactly. Do not redraw, retype, correct or reconstruct ANY text, logos, names, dates or covered content. Leave unclear text unclear rather than inventing it. Do not remove the overlapping note. No additions, no new borders, no rearrangement. Keep the original landscape aspect ratio. This is documentary evidence and must remain faithful to the original; enhancement should be subtle and photographic.
