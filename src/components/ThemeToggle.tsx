import { useEffect, useState } from "react";
import { ThemeIcon } from "./Icons";
export default function ThemeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.dataset.theme === "dark",
  );
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      let saved = null;
      try {
        saved = localStorage.getItem("bhoomika-theme");
      } catch {
        /* Storage is optional. */
      }
      if (!saved) {
        setDark(media.matches);
        document.documentElement.dataset.theme = media.matches
          ? "dark"
          : "light";
      }
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      localStorage.setItem("bhoomika-theme", next ? "dark" : "light");
    } catch {
      /* Keep session preference. */
    }
  }
  return (
    <button
      className="footer-theme"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
    >
      <ThemeIcon dark={dark} />
      <span>{dark ? "Light" : "Dark"} theme</span>
    </button>
  );
}
