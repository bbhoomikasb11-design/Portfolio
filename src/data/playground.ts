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
    "id": "stillwater",
    "title": "Stillwater — a lakeside stay",
    "width": 1000,
    "height": 1399,
    "description": "A hospitality landing page with a photographic opening, a booking strip and two room concepts. Fictional accommodation; no real property or booking service is claimed.",
    "alt": "Forest-green hospitality design with a lake photograph, oversized ivory serif typography, a booking strip and quiet room descriptions.",
    "image": "/images/playground/stillwater.webp"
  },
  {
    "id": "margin-ledger",
    "title": "Margin — the monthly ledger",
    "width": 1000,
    "height": 860,
    "description": "A detailed financial-interface study with explicitly illustrative invoice figures and a hand-built bar chart.",
    "alt": "Lavender presentation of a white monthly ledger card, a twelve-bar chart and sample invoice totals.",
    "image": "/images/playground/margin-ledger.webp"
  },
  {
    "id": "forme-light",
    "title": "Forme — lighting catalogue",
    "width": 1000,
    "height": 1439,
    "description": "A restrained lighting catalogue concept built around product photography, materials and everyday use. The photograph is reference imagery, not a claimed manufactured product.",
    "alt": "Silver-grey lighting catalogue with a large desk-lamp photograph, editorial typography and three material swatches.",
    "image": "/images/playground/forme-light.webp"
  },
  {
    "id": "nocturne-player",
    "title": "Nocturne — the listening desk",
    "width": 1000,
    "height": 851,
    "description": "A music-player interface with an original CSS vinyl-record illustration and an imagined late-night mix.",
    "alt": "A dark music-player card on a muted sage surface, with a vinyl record, playback controls and a slender progress line.",
    "image": "/images/playground/nocturne-player.webp"
  },
  {
    "id": "nocturne",
    "title": "Nocturne — a listening room",
    "width": 1000,
    "height": 1486,
    "description": "An imagined record-listening venue with a three-part evening programme and a short room introduction. Record graphics are authored in CSS.",
    "alt": "Charcoal and sage music landing page with a large vinyl record, expressive serif type and an evening listening programme.",
    "image": "/images/playground/nocturne.webp"
  },
  {
    "id": "margin-finance",
    "title": "Margin — independent-work finances",
    "width": 1000,
    "height": 1244,
    "description": "A product concept for independent workers, with invoice status, sample payments and practical interface copy. It is not a live financial product or advice.",
    "alt": "Porcelain and violet software landing page with a detailed invoice workspace, twelve-bar chart and concise product sections.",
    "image": "/images/playground/margin-finance.webp"
  },
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
  tileWidth: 542,
  columnStep: 622,
  gap: 80,
  rim: 5,
};
