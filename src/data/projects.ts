export interface Project {
  slug: string; name: string; discipline: string; summary: string; role: string;
  status: string; stack: string[]; image: string; width: number; height: number;
  alt: string; evidence: string; source: string; sourceLabel: string;
}
// Summarized from the repository audit and owner-supplied designs.
// Full case-study content: docs/archive/project-case-studies.ts.txt.
export const projects: Project[] = [
  {
    slug: 'safescan', name: 'SafeScan', discipline: 'Product design',
    summary: 'From a product barcode to its ingredients. A Figma study of the scanning journey and the screens that help make it clear.',
    role: 'UI/UX design', status: 'Design study', stack: ['Figma', 'User flows', 'Interface design'],
    image: '/images/safescan-home.webp', width: 1232, height: 978,
    alt: 'SafeScan homepage design with green navigation, a product preview, and barcode scanning and label upload actions.',
    evidence: 'Owner-supplied concept screen. AI and health-analysis features shown in the design are not verified implementations.',
    source: 'https://www.figma.com/design/Gk104dZnM486TBImFXejHX/SafeScan', sourceLabel: 'View Figma',
  },
  {
    slug: 'campusmesh', name: 'CampusMesh', discipline: 'Design & development',
    summary: 'A student marketplace, built with a team. I contributed the product design, frontend development and some of the backend.',
    role: 'Product design · Frontend · Backend contributions', status: 'Team project · Demo pending', stack: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    image: '/images/campusmesh.webp', width: 1280, height: 800,
    alt: 'CampusMesh student sign-in screen, captured from the project source.',
    evidence: 'Local interface capture. The end-to-end marketplace demo still needs confirmation.',
    source: 'https://github.com/bbhoomikasb11-design/CampusMesh', sourceLabel: 'View GitHub',
  },
  {
    slug: 'adaptui', name: 'AdaptUI', discipline: 'Accessibility & frontend',
    summary: 'An independently built Chrome extension exploring more comfortable ways to read and navigate the web, with viewing profiles and accessibility scans.',
    role: 'Independent design & development', status: 'In development', stack: ['JavaScript', 'Manifest V3', 'axe-core'],
    image: '/images/adaptui.webp', width: 380, height: 740,
    alt: 'AdaptUI extension popup showing dyslexia-friendly, low-vision, color-blind-safe and keyboard navigation profiles.',
    evidence: 'Popup rendered from the source. Installed-extension behavior has not been fully verified.',
    source: 'https://github.com/bbhoomikasb11-design/AdaptUI', sourceLabel: 'View GitHub',
  },
  {
    slug: 'clearhead', name: 'ClearHead', discipline: 'Frontend & AI integration',
    summary: 'A place to write out scattered thoughts and request a structured reflection. Built in React with a Gemini request flow.',
    role: 'Project development', status: 'AI integration · Validation pending', stack: ['React', 'Vite', 'Gemini API'],
    image: '/images/clearhead.webp', width: 1280, height: 800,
    alt: 'ClearHead writing interface rendered from the project source.',
    evidence: 'Local interface capture. AI request code is present; live responses and a server-side integration remain unverified.',
    source: 'https://github.com/bbhoomikasb11-design/ClearHead', sourceLabel: 'View GitHub',
  },
];
export const additionalProjects = [
  { name: 'MediMatch', note: 'Independent prototype', source: 'https://github.com/bbhoomikasb11-design/Medimatch' },
  { name: 'SplitGrid', note: 'Expense-sharing exploration', source: 'https://github.com/bbhoomikasb11-design/Expenses' },
];
