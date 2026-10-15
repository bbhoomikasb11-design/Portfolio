import { useEffect, useRef, useState } from "react";
import { achievements } from "../data/profile";
import { Arrow } from "./Icons";

export default function Achievements() {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setEdges({
      start: element.scrollLeft <= 2,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function browse(direction: number) {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section id="achievements" className="achievements-section container section" aria-labelledby="achievements-title">
      <div className="achievement-heading">
        <div>
          <p className="eyebrow">04 / A FEW MOMENTS WORTH SHARING</p>
          <h2 id="achievements-title" data-reveal="heading">Achievements<span>.</span></h2>
        </div>
        <div className="achievement-controls" aria-label="Browse achievements">
          <button type="button" aria-label="Previous achievements" aria-controls="achievement-track" disabled={edges.start} onClick={() => browse(-1)}><Arrow /></button>
          <button type="button" aria-label="Next achievements" aria-controls="achievement-track" disabled={edges.end} onClick={() => browse(1)}><Arrow /></button>
        </div>
      </div>
      <div ref={track} id="achievement-track" className="achievement-grid" role="region" aria-label="Achievements — swipe or use the arrow buttons to browse" tabIndex={0}>
        {achievements.map((item) => (
          <article className="achievement-card" key={item.title} data-reveal="pop">
            {item.photo ? (
              <figure className={`achievement-media achievement-media--${item.photo.presentation}`}>
                <img className="achievement-photo" src={item.photo.src} alt={item.photo.alt} loading="lazy" decoding="async" width={item.photo.width} height={item.photo.height} />
              </figure>
            ) : (
              <div className="achievement-highlight" aria-hidden="true"><span>{item.highlight}</span><span>{item.label}</span></div>
            )}
            <div className="achievement-card-body">
              <p className="eyebrow">{item.category}</p>
              <h3>{item.title}</h3>
              <p className="achievement-description">{item.text}</p>
              {item.href && <a className="text-link" href={item.href} target="_blank" rel="noreferrer">Team project <Arrow diagonal /></a>}
            </div>
          </article>
        ))}
      </div>
      <p className="achievement-provenance">The three poster wins and TechSprint selection are self-reported. Hackathon participation is listed separately from awards.</p>
    </section>
  );
}
