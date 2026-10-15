import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { Arrow } from "./Icons";

export default function Hero() {
  return (
    <section className="opening-hero container" aria-labelledby="opening-title">
      <div className="opening-stage">
        <div className="opening-copy hero-copy">
          <p className="opening-kicker">{profile.name} <span aria-hidden="true">/</span> Product design + development</p>
          <h1 id="opening-title">
            {profile.opening.headline.map((line, index) => (
              <span className={index === 1 ? "opening-emphasis" : undefined} key={line}>{line}{index < 2 && " "}</span>
            ))}
          </h1>
          <p className="opening-introduction">{profile.opening.introduction}</p>
          <div className="opening-actions">
            <Link className="opening-work-link" to="/projects">
              <span className="opening-arrow"><Arrow /></span>
              <span>View my work</span>
            </Link>
            <a className="opening-skills-link" href="#skills">Explore my skills <span aria-hidden="true">↘</span></a>
          </div>
        </div>
        <div className="opening-visual">
          <figure className="opening-portrait">
            <div className="opening-blue-panel" aria-hidden="true" />
            <img
              src={profile.heroPortrait.src}
              srcSet={profile.heroPortrait.srcSet}
              sizes="(max-width: 700px) 85vw, (max-width: 1100px) 43vw, 480px"
              alt={profile.heroPortrait.alt}
              width="720"
              height="1419"
              fetchPriority="high"
            />
            <figcaption className="sr-only">{profile.name}, developer and product designer.</figcaption>
          </figure>
          <aside className="opening-margin" aria-label="Based in Bengaluru, India">
            <p className="opening-location">Based in<br /><strong>Bengaluru,<br />India.</strong></p>
            <div className="opening-handnote" aria-hidden="true">
              <span className="opening-margin-rule" />
              <p>Design.<br />Code.<br />Create.</p>
              <svg viewBox="0 0 85 30" fill="none"><path d="M5 8C23 2 49 1 78 9M10 13C30 10 54 13 75 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
              <span className="opening-margin-rule" />
            </div>
          </aside>
          <Link to="/contact" className="opening-seal" aria-label="Open to internships and full-time opportunities. Let's talk.">
            <svg className="opening-seal-ring" viewBox="0 0 140 140" aria-hidden="true">
              <circle cx="70" cy="70" r="67" />
              <circle cx="70" cy="70" r="49" />
              <defs><path id="availability-ring" d="M70 14a56 56 0 1 1 0 112a56 56 0 1 1 0-112" /></defs>
              <text><textPath href="#availability-ring" textLength="352" lengthAdjust="spacing">INTERNSHIPS · FULL-TIME · LET’S MAKE SOMETHING · </textPath></text>
            </svg>
            <span className="opening-seal-copy"><i aria-hidden="true" />OPEN TO<br />WHAT’S NEXT<Arrow diagonal /></span>
          </Link>
        </div>
      </div>
      <div className="opening-footer">
        <p>{profile.headline.join(" ")}</p>
        <a href="#skills">A little more about what I do <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
