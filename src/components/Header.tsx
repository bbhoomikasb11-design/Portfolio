import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { profile } from '../data/profile';
import { Arrow } from './Icons';
export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menu.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><div className="header-inner container">
    <a href="#top" className="wordmark" aria-label="Bhoomika S, back to top">Bhoomika<span>.</span>S</a>
    <nav aria-label="Main navigation" id="main-navigation" className={`main-navigation${open ? ' is-open' : ''}`} onClick={event => { if ((event.target as HTMLElement).closest('a')) setOpen(false); }}>
      <a href="#work">Work</a><a href="#playground">Playground</a><a href="#background">Background</a><a className="nav-email" href={`mailto:${profile.email}`}>Say hello<Arrow diagonal /></a>
    </nav>
    <div className="header-controls"><ThemeToggle /><button ref={menu} className="menu-toggle" aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '−' : '+'}</span></button></div>
  </div></header>;
}
