import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Arrow, ThemeIcon } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(
    document.documentElement.dataset.theme === "dark",
  );
  const { pathname, hash } = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [pathname, hash]);
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
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        setOpen(false);
    };
    const desktop = matchMedia("(min-width: 901px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

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
  const sectionActive = (section: string) =>
    pathname === "/" && hash === `#${section}`;

  return (
    <header
      ref={header}
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="container header-inner">
        <Link to="/" className="wordmark" aria-label="Bhoomika.S home">
          Bhoomika<span className="wordmark-dot">.</span>S
        </Link>
        <div className="nav-area">
          <nav
            aria-label="Main navigation"
            id="main-navigation"
            className={open ? "navigation is-open" : "navigation"}
            onClick={() => setOpen(false)}
          >
            <Link
              to="/"
              aria-current={pathname === "/" && !hash ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              to="/#skills"
              aria-current={sectionActive("skills") ? "location" : undefined}
            >
              Skills
            </Link>
            <NavLink to="/projects">Work</NavLink>
            <Link
              to="/#about"
              aria-current={sectionActive("about") ? "location" : undefined}
            >
              About
            </Link>
            <Link
              to="/#experience"
              aria-current={
                sectionActive("experience") ? "location" : undefined
              }
            >
              Experience
            </Link>
            <Link
              className="nav-contact"
              to="/#contact"
              aria-current={sectionActive("contact") ? "location" : undefined}
            >
              Let’s talk <Arrow diagonal />
            </Link>
          </nav>
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
          >
            <ThemeIcon dark={dark} />
          </button>
          <button
            ref={menuButton}
            className="menu-button"
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
            <span className="menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
