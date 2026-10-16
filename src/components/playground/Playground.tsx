import { lazy, Suspense, useEffect, useRef, useState } from 'react';
const Gallery = lazy(() => import('./Gallery'));

export function Playground() {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setReady(true); observer.disconnect(); }
    }, { rootMargin: '240px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <section ref={root} id="playground" className="section playground-section" aria-labelledby="playground-title">
    <div className="section-heading"><div><p className="eyebrow">03 / Off the brief</p><h2 id="playground-title">Room to try something.</h2></div><p>A small collection of original design studies.<br className="desktop-break" /> Open a design to see the whole page.</p></div>
    <div className="gallery-boundary">{ready ? <Suspense fallback={<GalleryPlaceholder />}><Gallery /></Suspense> : <GalleryPlaceholder />}</div>
  </section>;
}
function GalleryPlaceholder() {
  return <div className="gallery-placeholder" role="status"><span className="sr-only">Loading design studies.</span><div className="gallery-grid" aria-hidden="true">{[0, 1, 2, 3].map(index => <div key={index}><div className="gallery-loading-preview" /><div className="gallery-loading-label" /></div>)}</div><div className="gallery-loading-pagination" aria-hidden="true" /></div>;
}
