import { useEffect, useState } from 'react';
import { ThemeIcon } from './Icons';
export function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      let preference: string | null = null;
      try { preference = localStorage.getItem('bhoomika-theme'); } catch { /* System preference remains available. */ }
      const next = preference === 'light' || preference === 'dark' ? preference : media.matches ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    media.addEventListener('change', sync); window.addEventListener('storage', sync);
    return () => { media.removeEventListener('change', sync); window.removeEventListener('storage', sync); };
  }, []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#11141b' : '#F8F9FC');
    setTheme(next);
    try { localStorage.setItem('bhoomika-theme', next); } catch { /* Theme still works without storage. */ }
  };
  return <button type="button" className="icon-button theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={toggle}><ThemeIcon dark={theme === 'dark'} /></button>;
}
