export type PlaygroundIconName =
  | "home"
  | "work"
  | "play"
  | "contact"
  | "experience"
  | "education"
  | "plus"
  | "minus"
  | "reset"
  | "shuffle"
  | "grid"
  | "move"
  | "close"
  | "left"
  | "right"
  | "help";
const paths: Record<PlaygroundIconName, string> = {
  home: "m3 10 9-7 9 7v10H3Z M9 20v-7h6v7",
  work: "M3 5h7l2 3h9v12H3Z",
  play: "M8 3v18M16 3v18M3 8h18M3 16h18",
  contact: "M3 5h18v14H3Z m0 0 9 7 9-7",
  experience: "M3 7h18v13H3Z M8 7V3h8v4M3 12h18",
  education: "m2 9 10-6 10 6-10 6Z M6 12v6q6 5 12 0v-6",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  reset: "M4 9a8 8 0 1 1 1 9M4 3v6h6",
  shuffle:
    "M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c5 0 7-12 12-12h3m-4-4 4 4-4 4",
  grid: "M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z",
  move: "M12 3v18M3 12h18m-13-5 4-4 4 4m-8 10 4 4 4-4M7 8l-4 4 4 4m10-8 4 4-4 4",
  close: "m6 6 12 12M6 18 18 6",
  left: "m14 5-7 7 7 7",
  right: "m10 5 7 7-7 7",
  help: "M9 8a3 3 0 1 1 4 3c-1 .5-1 1-1 3M12 17v1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
};
export default function PlaygroundIcon({ name }: { name: PlaygroundIconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
