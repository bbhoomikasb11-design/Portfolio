import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => setOpen(false), [pathname, hash]);
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

  const navigation = useRef<HTMLElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, height: 0 });
  useLayoutEffect(() => {
    const nav = navigation.current;
    if (!nav) return;
    const measure = () => {
      const active = nav.querySelector<HTMLElement>('a[aria-current="page"]');
      if (active)
        setPill({
          left: active.offsetLeft,
          width: active.offsetWidth,
          height: active.offsetHeight,
        });
      else setPill({ left: 0, width: 0, height: 0 });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [pathname, open]);

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
            ref={navigation}
            aria-label="Main navigation"
            id="main-navigation"
            className={open ? "navigation is-open" : "navigation"}
            onClick={() => setOpen(false)}
          >
            <span
              className="nav-active-pill"
              aria-hidden="true"
              style={{
                visibility: pill.width ? "visible" : "hidden",
                width: pill.width,
                height: pill.height,
                transform: `translateX(${pill.left}px)`,
              }}
            />
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/education">Education</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
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
