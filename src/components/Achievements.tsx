import { achievements } from '../data/profile';
import { Arrow } from './Icons';
export function Achievements() {
  return <section id="achievements" className="achievements-section" aria-labelledby="achievements-title">
    <h2 id="achievements-title">A few moments along the way.</h2>
    <div className="achievements-grid">{achievements.map(item => <article className="achievement" key={item.title}>
      {item.photo ? <a className={`achievement-photo ${item.photo.presentation}`} href={item.photo.original} target="_blank" rel="noreferrer" aria-label={`View photo: ${item.title}`}><img src={item.photo.src} alt={item.photo.alt} width={item.photo.width} height={item.photo.height} loading="lazy" decoding="async" /></a> : <span className="achievement-mark" aria-hidden="true">{item.highlight}</span>}
      <div><h3>{item.title}</h3><p>{item.text}</p>{item.href && <a className="text-link" href={item.href} target="_blank" rel="noreferrer">Team project<Arrow diagonal /></a>}</div>
    </article>)}</div>
  </section>;
}
