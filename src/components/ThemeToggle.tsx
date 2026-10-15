import { useEffect, useRef, useState } from "react";
import { ThemeIcon } from "./Icons";
export default function ThemeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.dataset.theme === "dark",
  );
  const desired = useRef(dark);
  const transition = useRef<ViewTransition | null>(null);
  const generation = useRef(0);
  function stopTransition() {
    generation.current++;
    transition.current?.skipTransition();
    transition.current = null;
    document.documentElement.classList.remove("theme-transitioning");
    document.documentElement.dataset.theme = desired.current ? "dark" : "light";
  }
  function applyTheme(next: boolean) {
    const root = document.documentElement;
    stopTransition();
    desired.current = next;
    setDark(next);
    const version = ++generation.current;
    const commit = () => {
      if (version === generation.current) root.dataset.theme = next ? "dark" : "light";
    };
    if (!document.startViewTransition || document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      commit();
      return;
    }
    root.classList.add("theme-transitioning");
    const active = document.startViewTransition(commit);
    transition.current = active;
    // A skipped transition still commits the latest preference without stale callbacks.
    active.ready.catch(() => {});
    active.finished.finally(() => {
      if (version !== generation.current) return;
      transition.current = null;
      root.classList.remove("theme-transitioning");
    }).catch(() => {});
  }
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const onReducedMotion = () => { if (reduced.matches) stopTransition(); };
    const update = () => {
      let saved = null;
      try {
        saved = localStorage.getItem("bhoomika-theme");
      } catch {
        /* Storage is optional. */
      }
      if (!saved) {
        applyTheme(media.matches);
      }
    };
    media.addEventListener("change", update);
    reduced.addEventListener("change", onReducedMotion);
    return () => {
      stopTransition();
      media.removeEventListener("change", update);
      reduced.removeEventListener("change", onReducedMotion);
    };
  }, []);
  function toggleTheme() {
    const next = !desired.current;
    applyTheme(next);
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
      <span className="theme-icon" key={String(dark)}><ThemeIcon dark={dark} /></span>
      <span>{dark ? "Light" : "Dark"} theme</span>
    </button>
  );
}
