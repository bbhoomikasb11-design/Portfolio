export const profile = {
  name: "Bhoomika S",
  positioning: "Developer + Product Designer",
  location: "Bengaluru, India",
  headline: ["Curiosity in design.", "Purpose in code."],
  introduction:
    "I design thoughtful digital experiences and build useful products, bringing together creativity, engineering, and a curiosity for how things work.",
  email: "bbhoomikasb11@gmail.com",
  github: "https://github.com/bbhoomikasb11-design",
  linkedin: "https://linkedin.com/in/bhoomika-s-743758381",
  portrait: {
    src: "/images/bhoomika-portrait-960.webp",
    srcSet:
      "/images/bhoomika-portrait-480.webp 480w, /images/bhoomika-portrait-960.webp 960w",
    alt: "Bhoomika S in a black blazer, standing in a sunlit space",
  } as { src: string; srcSet?: string; alt: string } | null,
  resume: null as string | null, // Add only after the owner confirms the current document.
  education: "B.E. in Artificial Intelligence & Data Science",
  institution: "Don Bosco Institute of Technology, Bengaluru",
  cgpa: "9.0",
};
export const skills = [
  {
    name: "Product & design",
    items: [
      "Figma",
      "User flows",
      "Wireframing",
      "Prototyping",
      "Responsive UI",
    ],
  },
  {
    name: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "HTML & CSS", "Vite"],
  },
  { name: "Backend", items: ["Node.js", "Express", "PostgreSQL", "REST APIs"] },
  {
    name: "AI & accessibility",
    items: [
      "Gemini API integration",
      "Structured prompts",
      "axe-core",
      "Chrome Extension APIs",
    ],
  },
  {
    name: "Tools & workflow",
    items: ["Git", "GitHub", "Postman", "Figma Auto Layout"],
  },
];
export const aboutFocus = [
  {
    title: "Design",
    detail: "Thoughtful interfaces",
    text: "I enjoy turning ideas into useful experiences through user flows, prototypes and responsive layouts.",
  },
  {
    title: "Develop",
    detail: "Ideas you can interact with",
    text: "I work across frontend development, backend contributions and AI integration to bring products to life.",
  },
  {
    title: "Communicate",
    detail: "Clarity in the details",
    text: "Explaining an idea matters to me—whether through a presentation, a conversation or the product itself.",
  },
];

export interface Achievement {
  title: string;
  category: string;
  highlight: string;
  label: string;
  text: string;
  href?: string;
  photo?: { src: string; alt: string };
}
// Owner-reported; dates, additional results and event imagery remain unconfirmed.
export const achievements: Achievement[] = [
  {
    title: "First place in debate",
    category: "PUBLIC SPEAKING",
    highlight: "1st",
    label: "place",
    text: "Debate competition at Gousia College.",
  },
  {
    title: "Three poster-presentation wins",
    category: "VISUAL COMMUNICATION",
    highlight: "3",
    label: "wins",
    text: "Presenting ideas through a combination of visuals and storytelling.",
  },
  {
    title: "SEBI Securities Market TechSprint",
    category: "COMPETITION",
    highlight: "R1",
    label: "selection",
    text: "Participated in the TechSprint and reported selection in Round 1.",
  },
  {
    title: "Code Carnage 2.0",
    category: "TEAM HACKATHON",
    highlight: "24h",
    label: "of building",
    text: "Built a disaster-management and volunteer platform with team BareMetal at SJB Institute of Technology’s offline hackathon.",
    href: "https://github.com/Prajwal-17/disaster-volunteer-platform",
  },
];
