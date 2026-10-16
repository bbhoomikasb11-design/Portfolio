import { skills } from '../data/profile';
export function Skills() {
  return <section id="skills" className="section skills-section" aria-labelledby="skills-title">
    <div><p className="eyebrow">02 / Toolkit</p><h2 id="skills-title">What I work with.</h2></div>
    <dl className="skills-list">{skills.map(group => <div key={group.name}><dt>{group.name}</dt><dd>{group.items.join(' · ')}</dd></div>)}</dl>
  </section>;
}
