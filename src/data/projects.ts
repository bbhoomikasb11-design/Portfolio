export type Category = 'Engineering' | 'Product design';
export interface Project {
  slug: string; name: string; category: Category; discipline: string; summary: string; role: string;
  status: string; stack: string[]; image: string; alt: string; caption: string; source: string; sourceLabel: string;
  intro: string; sections: { title: string; text: string }[]; flow: string[];
}
const github = 'https://github.com/bbhoomikasb11-design/';
export const projects: Project[] = [
  {
    slug: 'campusmesh', name: 'CampusMesh', category: 'Engineering', discipline: 'Product design · Full-stack collaboration',
    summary: 'Bringing student resources closer to the students who need them.',
    role: 'Product design, frontend & some backend', status: 'Team project · Demo pending',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL'], image: '/images/campusmesh.webp',
    alt: 'CampusMesh sign-in interface captured from the repository running locally.',
    caption: 'Actual local frontend. Authentication and marketplace transactions require the configured backend.',
    source: github + 'CampusMesh', sourceLabel: 'Explore source',
    intro: 'A collaborative student marketplace for discovering, listing and sharing campus resources. My contribution spans product design, frontend development and some backend work.',
    flow: ['Discover resources', 'Filter & save', 'Sign in', 'List, buy or rent'],
    sections: [
      { title: 'A marketplace within reach', text: 'CampusMesh brings textbooks, electronics and other student resources into a campus-focused interface. The implemented browsing view offers categories, price and condition filters, sorting and saved items, making the resource itself the starting point of the journey.' },
      { title: 'My part in a shared product', text: 'I contributed product design, frontend development and some backend work as part of a team. These responsibilities are owner-reported. The repository is shared work; individual payment, delivery or authentication modules are not attributed solely to me.' },
      { title: 'From interface to data', text: 'The React frontend communicates with an Express API. Listing controllers use parameterized PostgreSQL queries, and protected endpoints use JWT middleware. The code also includes rental, payment and courier flows; their presence does not establish successful live transactions.' },
      { title: 'Keeping the interface honest', text: 'The browsing code caches listings, exposes a load failure with a retry action, and rolls back optimistic wishlist updates if the server rejects a change. These implementation details connect responsive interaction with visible failure recovery.' },
      { title: 'Current state & next steps', text: 'The local frontend renders, and the source confirms the architecture above. Database-backed listings, authentication, payments and the final demo were not validated end to end. A configured demo and a more detailed contribution breakdown are the next additions to this case study.' },
    ],
  },
  {
    slug: 'adaptui', name: 'AdaptUI', category: 'Engineering', discipline: 'Accessibility · Chrome extension',
    summary: 'A web experience that can adapt to the person using it.', role: 'Independent design & development', status: 'Active development',
    stack: ['JavaScript', 'Manifest V3', 'axe-core', 'DOM APIs'], image: '/images/adaptui.webp',
    alt: 'Real AdaptUI popup with accessibility profile switches and a Scan this page button.',
    caption: 'Actual popup rendered from source. This capture is not an installed-extension scan result.',
    source: github + 'AdaptUI', sourceLabel: 'Explore source',
    intro: 'An independently built Chrome extension that pairs accessibility scanning with personal viewing preferences. It explores how users can adapt an existing page to their own needs.',
    flow: ['Open extension', 'Scan the page', 'Choose profiles', 'Remember per site'],
    sections: [
      { title: 'One website, different needs', text: 'AdaptUI approaches accessibility from the browser side. Users can choose dyslexia-friendly, low-vision, color-blind-safe and keyboard-navigation profiles. These controls complement site accessibility work; they do not establish accessibility compliance.' },
      { title: 'A small interface with clear states', text: 'The popup uses independently toggled native buttons, pressed-state labels, a scan loading state and a readable error state for pages where Chrome cannot inject content scripts. Profile changes remain unchanged when the target page cannot accept them.' },
      { title: 'How the pieces communicate', text: 'The Manifest V3 extension loads axe and profile modules as content scripts. The popup sends messages to the active tab, while chrome.storage.local keeps selected profiles by domain. A scan runs axe against the document and translates selected findings into shorter descriptions.' },
      { title: 'Keyboard support without taking over', text: 'The keyboard profile draws a focus ring around the active element and updates it on focus, scrolling and resizing. It leaves native focus movement intact. Turning the profile off removes the overlay and its event listeners.' },
      { title: 'What is verified', text: 'The manifest, message handlers, storage logic and four profile implementations were inspected, and the popup was rendered locally. Installed-extension behavior across websites remains to be tested. No accessibility score, user count or measured improvement is claimed here.' },
    ],
  },
  {
    slug: 'clearhead', name: 'ClearHead', category: 'Engineering', discipline: 'AI integration · Interface development',
    summary: 'Turning a page of scattered thoughts into a structured reflection.', role: 'Project development', status: 'AI client · Validation pending',
    stack: ['React', 'Vite', 'Gemini API'], image: '/images/clearhead.webp',
    alt: 'ClearHead writing interface rendered from the actual React source.',
    caption: 'Actual local writing interface. AI responses were not generated during the audit; source privacy copy is not a verified data-handling guarantee.',
    source: github + 'ClearHead', sourceLabel: 'Explore source',
    intro: 'A writing interface connected to a structured AI prompt. ClearHead organizes a free-form entry into what can be controlled, what cannot, an underlying concern and one next step.',
    flow: ['Write thoughts', 'Request reflection', 'Parse AI response', 'Review four sections'],
    sections: [
      { title: 'Space to write first', text: 'The interface starts with a single expanding text area, a word count and a submission control. Source code requires at least ten words before submission and includes waiting and error states, keeping the entry flow focused.' },
      { title: 'A defined response structure', text: 'A Gemini generateContent request supplies a system prompt asking for JSON with four fields. The client strips optional Markdown fences and parses the returned text before rendering the reflection. Retry logic handles quota errors and response parsing failures across a model list.' },
      { title: 'Architecture, as implemented', text: 'The supplied repository contains a React/Vite frontend and a browser-side Gemini request. No backend or database was found. Although the owner reports a completed full-stack project, this case study describes only the implementation available for inspection.' },
      { title: 'What needs another iteration', text: 'The source reads the API key from a client environment variable, which is unsuitable for protecting a private key. A server-side request boundary, accurate data-handling copy and response-schema validation are next steps. The effect hook used inside an asynchronous import also needs correction.' },
      { title: 'Current validation boundary', text: 'The writing interface renders locally, but the audit supplied no API key and did not validate generated responses. This is an AI integration project, with no clinical claims or measured wellbeing outcomes. Its source UI privacy wording should be revised before a public live demo.' },
    ],
  },
  {
    slug: 'safescan', name: 'SafeScan', category: 'Product design', discipline: 'UI/UX · Figma design study',
    summary: 'Exploring a clearer path from product barcode to ingredients.', role: 'UI/UX design', status: 'Design study',
    stack: ['Figma', 'User flows', 'Interface design'], image: '/images/safescan.webp',
    alt: 'Overview of the real SafeScan Figma canvas showing Home, Scan, label, insights, history and profile frames.',
    caption: 'Original SafeScan Figma canvas, viewed in the browser. Detailed frame exports are still needed.',
    source: 'https://www.figma.com/design/Gk104dZnM486TBImFXejHX/SafeScan', sourceLabel: 'Open Figma',
    intro: 'A UI/UX exploration of the journey from scanning a product barcode to seeing its ingredients. SafeScan is presented as a design study, with the original Figma file available to explore.',
    flow: ['Open scan', 'Capture barcode', 'Identify product', 'Read ingredients'],
    sections: [
      { title: 'Making a label easier to approach', text: 'The owner-defined core journey is simple: scan a barcode, then see the product’s ingredients. The design work gives that journey a dedicated interface rather than treating scanning as an isolated utility.' },
      { title: 'A connected set of screens', text: 'The accessible Figma canvas includes Home, multiple Scan and label frames, insights, History and profile screens. The progression separates capture from the product-detail view, while history and profile occupy their own areas.' },
      { title: 'A visual direction in the file', text: 'The actual frames use light surfaces, dark green navigation and grouped content areas. The overview shows an extended product flow; detailed frame exports and annotations are still needed to explain individual decisions with greater precision.' },
      { title: 'Design scope & next steps', text: 'No working barcode service, product database, allergy detection or ingredient analysis was verified. Research records and usability results were not supplied. Next steps are readable frame exports, a documented prototype path and owner-provided context for the design decisions.' },
    ],
  },
];
export const archive = [
  { name: 'MediMatch', label: 'Independent prototype', description: 'A simulated emergency coordination interface with hospital, paramedic and resource-transfer views. Uses seeded data and local storage.', href: github + 'Medimatch' },
  { name: 'SplitGrid', label: 'Source available · Demo unverified', description: 'A group expense-sharing project in the Expenses repository, with React interfaces and Node.js backend implementations.', href: github + 'Expenses' },
];
