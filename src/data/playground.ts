export interface PlaygroundPiece {
  id: string;
  title: string;
  description: string;
  alt: string;
  image: string;
  width: number;
  height: number;
}

/** Fictional, independently designed landing-page studies; not client work. */
export const playgroundPieces: PlaygroundPiece[] = [
  {
    id: "daily-bread", title: "Daily Bread — neighbourhood bakery", width: 1000, height: 2528,
    description: "A full bakery homepage with a daily menu, kitchen note and visiting information. Fictional brand and sample prices; licensed bread photography.",
    alt: "Warm paper and burgundy bakery page with an arched bread photograph, large serif headline, menu and kitchen notes.",
    image: "/images/playground/daily-bread.webp",
  },
  {
    id: "room-sixteen", title: "Room / 16 — architecture studio", width: 1000, height: 2741,
    description: "An architecture-studio landing page exploring project captions, a floor-plan drawing and a clear studio process. Photography is reference imagery, not claimed architecture work.",
    alt: "Restrained grey architecture page with a large interior photograph, custom floor-plan drawing and editorial project sections.",
    image: "/images/playground/room-sixteen.webp",
  },
  {
    id: "kilometre", title: "Kilometre — cycling shop", width: 1000, height: 2714,
    description: "A cycling-shop concept with bicycle photography, practical fit advice, an illustrative Sunday route and workshop services.",
    alt: "Acid-yellow and charcoal cycling page with oversized bold type, a bicycle photo and a hand-drawn route diagram.",
    image: "/images/playground/kilometre.webp",
  },
  {
    id: "hand-earth", title: "Hand & Earth — pottery workshop", width: 1000, height: 2722,
    description: "An imagined pottery studio with beginner-workshop details, original vessel illustrations and a making-process story.",
    alt: "Terracotta and clay-coloured pottery page with a photograph of hands at a wheel, serif typography and three vessel illustrations.",
    image: "/images/playground/hand-earth.webp",
  },
  {
    id: "third-cup", title: "Third Cup — coffee bar", width: 1000, height: 2814,
    description: "A coffee-bar homepage with a split photographic hero, sample drinks menu, bar story and opening hours.",
    alt: "Oxblood and cream coffee page with pour-over photography, a newspaper-like menu and a warm opening-hours section.",
    image: "/images/playground/third-cup.webp",
  },
  {
    id: "patch-market", title: "Patch — seasonal produce", width: 1000, height: 2847,
    description: "An imagined produce service with sample boxes and pricing, storage advice, and a simple order journey.",
    alt: "Green and citrus produce page with bold type, tomato photography, two produce boxes and seasonal kitchen advice.",
    image: "/images/playground/patch-market.webp",
  },
  {
    id: "fieldwork", title: "Fieldwork — travel journal", width: 1000, height: 2885,
    description: "A magazine-style landing page with a fictional field note, loose itinerary and packing list. Licensed alpine landscape photography provides visual context.",
    alt: "Slate and off-white travel journal with an alpine landscape, long-form editorial columns and an illustrated-by-photography weekend itinerary.",
    image: "/images/playground/fieldwork.webp",
  },
  {
    id: "queue-desk", title: "Queue — a small-team project desk", width: 1000, height: 2674,
    description: "A product landing page with an original task-list interface, handover conversation, product reasoning and practical FAQs. This is a design study, not a live software product.",
    alt: "Blue and white software page with a detailed sample project workspace, practical feature copy and a handover discussion panel.",
    image: "/images/playground/queue-desk.webp",
  },
];

export const playgroundLayout = {
  tileWidth: 600,
  columnStep: 672,
  // Reserve enough height for the longest full page, plus stagger and breathing room.
  rowStep: Math.ceil(Math.max(...playgroundPieces.map(p => p.height / p.width)) * 600) + 150,
};
