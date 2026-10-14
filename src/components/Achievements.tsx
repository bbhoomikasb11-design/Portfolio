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
          <p className="eyebrow">03 / ACHIEVEMENTS & PARTICIPATION</p>
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
              <img
                className="achievement-photo"
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                width={800}
                height={500}
              />
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
        Achievements and competition selection are self-reported. Hackathon
        participation is listed separately from awards.
      </p>
    </section>
  );
}
