export type PlaygroundCategory = "Interfaces" | "Posters" | "Artwork";
export interface PlaygroundPiece {
  id: string;
  title: string;
  category: PlaygroundCategory;
  description: string;
  alt: string;
  image: string;
}
const piece = (
  id: string,
  title: string,
  category: PlaygroundCategory,
  description: string,
  alt: string,
): PlaygroundPiece => ({
  id,
  title,
  category,
  description,
  alt,
  image: `/images/playground/${id}.webp`,
});
/** Original gallery concepts, not client work, shipped products or claimed Figma files. */
export const playgroundPieces: PlaygroundPiece[] = [
  piece(
    "muse",
    "A little play",
    "Interfaces",
    "An imagined creative studio, with an original AI-generated clay companion.",
    "Creative studio landing-page concept with bold blue typography and a little blue clay creature holding a cursor.",
  ),
  piece(
    "orbit",
    "A calmer workspace",
    "Interfaces",
    "A task-board study in visual hierarchy, quiet surfaces and small details.",
    "Orbit workspace concept with three task columns on a porcelain and powder-blue interface.",
  ),
  piece(
    "blue-buddy",
    "The curiosity companion",
    "Artwork",
    "Original AI-generated clay artwork made for this playground.",
    "A friendly blue clay creature holding an oversized white cursor on a floating island with arches and a tiny daisy.",
  ),
  piece(
    "loop-player",
    "Somewhere in blue",
    "Interfaces",
    "A fictional music-player interface built around sculptural album artwork.",
    "Loop music-player concept featuring a glossy blue ribbon sculpture, progress bar and circular play control.",
  ),
  piece(
    "pause",
    "A softer pace",
    "Interfaces",
    "A breathing-screen exploration of concentric shapes and generous space.",
    "A tilted mobile interface with soft blue concentric breathing circles and the words Make some space.",
  ),
  piece(
    "make-room",
    "Make room for play",
    "Posters",
    "An editorial type study in Cormorant Garamond and electric blue.",
    "Blue typographic poster reading Make room for play, with a large powder-blue asterisk.",
  ),
  piece(
    "petal",
    "A little green",
    "Interfaces",
    "An imagined plant shop with a hand-built geometric botanical illustration.",
    "Soft green plant-shop concept with a geometric potted plant and a restrained editorial headline.",
  ),
  piece(
    "daylight",
    "Weather with wonder",
    "Interfaces",
    "A fictional weather screen; forecast values are illustrative.",
    "Daylight mobile weather concept with a white cloud, pale yellow sun and sample 24-degree forecast.",
  ),
  piece(
    "index",
    "Follow your curiosity",
    "Interfaces",
    "A reading-platform concept with a shelf of invented book titles.",
    "Editorial reading-platform concept featuring five colorful illustrated book spines.",
  ),
  piece(
    "liquid-loop",
    "Liquid thought",
    "Artwork",
    "Original AI-generated sculpture study: cobalt, chrome and impossible balance.",
    "Glossy electric-blue ribbon loop surrounding a chrome sphere above a white cylindrical pedestal.",
  ),
  piece(
    "tiny-wins",
    "Small steps, your pace",
    "Interfaces",
    "A habit-tracker screen with an illustrative week of activity.",
    "Lilac mobile habit-tracker concept with Read a few pages, Make something and Step outside rows.",
  ),
  piece(
    "canvas-club",
    "Happy accidents",
    "Interfaces",
    "An imagined creative community with oversized type and a playful asterisk.",
    "Lavender creative-community landing page reading Make stuff. Make a mess. Make it yours.",
  ),
  piece(
    "prism",
    "A feeling in five shades",
    "Interfaces",
    "A color-tool concept using the portfolio’s own palette.",
    "Palette-tool interface showing five swatches from porcelain white through electric blue to near-black.",
  ),
  piece(
    "sunday",
    "The long way",
    "Interfaces",
    "A warm journal interface with a fictional entry about noticing small things.",
    "Peach-toned journal concept with an editorial headline and a lined writing sheet.",
  ),
  piece(
    "less-better",
    "Less, but better",
    "Posters",
    "A study of type, negative space and a dimensional blue ring.",
    "Minimal porcelain poster reading Less, but better, with a dimensional electric-blue ring.",
  ),
  piece(
    "wayfinder",
    "A little off-script",
    "Interfaces",
    "A travel-editorial concept with an original geometric landscape.",
    "Travel interface with an illustrated mountain landscape, winding path and the headline Go a little off-script.",
  ),
];
