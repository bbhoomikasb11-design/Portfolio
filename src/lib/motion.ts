/** Durations are stored in milliseconds in styles/motion.css. */
export function motionDuration(name: "hover" | "nav" | "page" | "image" | "heading" | "hero" | "theme" | "card") {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(`--motion-${name}`)) || 0;
}

export function motionEase() {
  return getComputedStyle(document.documentElement).getPropertyValue("--ease-reveal").trim() || "ease-out";
}
