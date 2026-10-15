import { achievements } from "../data/profile";
import { Arrow } from "./Icons";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="achievements-section container section"
      aria-labelledby="achievements-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / ACHIEVEMENTS & PARTICIPATION</p>
          <h2 id="achievements-title">
            A few moments
            <br />
            <em>worth sharing.</em>
          </h2>
        </div>
        <p className="achievement-intro">
          Presenting ideas, finding my voice, and building alongside a team.
        </p>
      </div>
      <div className="achievement-grid">
        {achievements.map((item) => (
          <article className="achievement-card" key={item.title}>
            {item.photo && (
              <figure className={`achievement-media achievement-media--${item.photo.presentation}`}>
                <img
                  className="achievement-photo"
                  src={item.photo.src}
                  alt={item.photo.alt}
                  loading="lazy"
                  decoding="async"
                  width={item.photo.width}
                  height={item.photo.height}
                />
                <figcaption>
                  <span>Enhanced photo</span>
                  <a href={item.photo.original} target="_blank" rel="noreferrer"
                    aria-label={`View original photo: ${item.title} (opens in a new tab)`}>
                    View original <Arrow diagonal />
                  </a>
                </figcaption>
              </figure>
            )}
            <div className="achievement-card-body">
              <div className="achievement-topline">
                <p className="eyebrow">{item.category}</p>
                <span className="achievement-symbol" aria-hidden="true">
                  ✳
                </span>
              </div>
              <div className="achievement-highlight">
                <span>{item.highlight}</span>
                <span>{item.label}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="achievement-description">{item.text}</p>
              {item.href && (
                <a
                  className="text-link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the team project <Arrow diagonal />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="achievement-provenance">
        Photos shared from my own collection. The three poster wins and TechSprint
        selection are self-reported; hackathon participation is listed separately
        from awards.
      </p>
    </section>
  );
}
