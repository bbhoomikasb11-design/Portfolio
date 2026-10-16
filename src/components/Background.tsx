import { education } from '../data/education';
import { experience } from '../data/experience';
export function Background() {
  return <section id="background" className="section background-section" aria-labelledby="background-title">
    <div className="section-heading"><div><p className="eyebrow">04 / A little context</p><h2 id="background-title">Learning by doing.</h2></div><p>I enjoy the design file, the code editor<br className="desktop-break" /> and the conversation in between.</p></div>
    <div className="background-grid">
      <div id="experience"><h3 className="column-label">Experience</h3>{experience.map(item => <article className="experience-entry" key={item.organization}><p className="entry-kind">{item.kind}</p><h4>{item.organization}</h4><p className="entry-role">{item.role}</p><p>{item.contributions.join(' ')}</p></article>)}</div>
      <div id="education"><h3 className="column-label">Education</h3>{education.map(item => <article className="education-entry" key={item.level}><div><h4>{item.qualification}</h4><p>{item.institution}</p></div><p className="education-result"><strong>{item.result.value}{item.result.suffix}</strong><span>{item.result.label}</span></p></article>)}</div>
    </div>
  </section>;
}
