import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "../styles/comparison.css";

const studies = [
  {
    id: "bakery",
    label: "BUTTER & CRUMB / BAKERY",
    title: "A shopfront with some warmth.",
    description: "Red ink, butter-yellow paper and bread that fills the frame. The counter menu is easy to scan, and reserving a loaf is the obvious next step.",
  },
  {
    id: "cycling",
    label: "LONGWAY / CYCLE SHOP",
    title: "A bike you want to take out.",
    description: "Lime, ink and oversized type give the shop its own voice. Frame sizes, price and a test ride sit together; the Sunday ride gives you a reason to come back.",
  },
  {
    id: "stay",
    label: "FIELD HOUSE / WEEKEND STAY",
    title: "Let the room set the mood.",
    description: "Olive, warm paper and an unhurried layout let the house speak. The booking strip stays close to the photograph, with the price and guest count just below.",
  },
];
const repeatedStudies = [...studies, ...studies, ...studies];

export default function DesignComparison() {
  const stage = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  const pitch = useRef(424);
  const inView = useRef(false);
  const [split, setSplit] = useState(50);
  const [imagesReady, setImagesReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(media.matches);
    media.addEventListener("change", change);
    const element = stage.current!;
    const resize = new ResizeObserver(() => {
      const card = element.querySelector<HTMLElement>(".comparison-card");
      if (!card) return;
      const nextPitch = card.offsetWidth + 24;
      position.current *= nextPitch / pitch.current;
      pitch.current = nextPitch;
      element.style.setProperty("--travel", `${position.current}px`);
    });
    resize.observe(element);
    const visibility = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting;
      if (entry.isIntersecting) setImagesReady(true);
    });
    visibility.observe(element);
    return () => {
      media.removeEventListener("change", change);
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const elapsed = last ? Math.min(now - last, 40) : 0;
      last = now;
      if (inView.current && !document.hidden) {
        position.current = (position.current + elapsed * 0.048) % (pitch.current * studies.length);
        stage.current?.style.setProperty("--travel", `${position.current}px`);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, reduced]);

  function step(direction: number) {
    setPaused(true);
    setManual(true);
    const next = Math.round(position.current / pitch.current) + direction;
    position.current = ((next + studies.length) % studies.length) * pitch.current;
    stage.current?.style.setProperty("--travel", `${position.current}px`);
  }

  return (
    <section id="design-thinking" className="design-comparison section" aria-labelledby="comparison-title">
      <div className="container comparison-intro">
        <div>
          <p className="eyebrow">03 / BACK TO THE DRAWING BOARD</p>
          <h2 id="comparison-title">Same brief.<br /><em>Different feeling.</em></h2>
        </div>
        <p>A bakery, a bike shop, a weekend away. I kept the information and the photographs, then gave each page a personality of its own. Pull the divider across.</p>
      </div>
      <div
        ref={stage}
        className={`comparison-stage${manual ? " is-manual" : ""}`}
        style={{ "--split": `${split}%` } as CSSProperties}
      >
        {(["before", "after"] as const).map(version => (
          <div className={`comparison-layer comparison-${version}`} key={version} aria-hidden="true">
            <div className="comparison-track">
              {repeatedStudies.map((study, index) => (
                <div className="comparison-card" key={`${study.id}-${index}`}>
                  <img
                    src={`/images/comparison/${study.id}-${version}.webp`}
                    alt=""
                    width="900"
                    height="1125"
                    loading={imagesReady ? "eager" : "lazy"}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <span className="comparison-label comparison-label-before" aria-hidden="true">Before</span>
        <span className="comparison-label comparison-label-after" aria-hidden="true">After</span>
        <div className="comparison-divider" aria-hidden="true"><span>‹ <i /> ›</span></div>
        <input
          className="comparison-range"
          type="range"
          min="0"
          max="100"
          value={split}
          aria-label="Before and after design comparison"
          aria-valuetext={`${split}% original design, ${100 - split}% refined design`}
          aria-describedby="comparison-instructions"
          onChange={event => setSplit(Number(event.target.value))}
        />
      </div>
      <div className="container comparison-controls">
        <p id="comparison-instructions">Drag the divider. See what changes.</p>
        <div>
          <button type="button" onClick={() => step(-1)} aria-label="Previous design study">←</button>
          {!reduced && <button type="button" className="comparison-motion" onClick={() => { setManual(false); setPaused(!paused); }} aria-label={paused ? "Play design comparison motion" : "Pause design comparison motion"}>{paused ? "Play" : "Pause"}</button>}
          <button type="button" onClick={() => step(1)} aria-label="Next design study">→</button>
        </div>
      </div>
      <div className="container comparison-notes">
        {studies.map((study, index) => (
          <article key={study.id}>
            <span className="eyebrow">0{index + 1} / {study.label}</span>
            <h3>{study.title}</h3>
            <p>{study.description}</p>
          </article>
        ))}
      </div>
      <p className="container comparison-footnote">Original interface studies, made for this portfolio. Sample content, not client work or measured results.</p>
    </section>
  );
}
