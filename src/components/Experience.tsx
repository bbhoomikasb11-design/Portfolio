import { experience } from "../data/experience";
export default function Experience({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";
  const ItemHeading = page ? "h2" : "h3";
  return (
    <section
      id="experience"
      className={
        page ? "container profile-page experience-page" : "container section"
      }
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">{page ? "EXPERIENCE" : "03 / EXPERIENCE"}</p>
          <Heading data-reveal="heading">
            Learning through
            <br />
            <em>meaningful work.</em>
          </Heading>
        </div>
        <p className="section-aside">
          Different contexts.
          <br />
          The same care for the details.
        </p>
      </div>
      <div className="experience-list">
        {experience.map((item, i) => (
          <article key={item.organization} data-reveal="rise">
            <span className="experience-index">0{i + 1}</span>
            <div className="experience-title">
              <p className="eyebrow">{item.kind}</p>
              <ItemHeading>{item.organization}</ItemHeading>
              <span>{item.role}</span>
            </div>
            <div className="experience-copy">
              <p>{item.description}</p>
              <ul>
                {item.contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
