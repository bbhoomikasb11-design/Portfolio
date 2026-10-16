import type { Project } from '../data/projects';
import { Arrow } from './Icons';
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article id={`project-${project.slug}`} className={`project-card project-${project.slug}`} aria-labelledby={`${project.slug}-title`}>
    <a className="project-visual" href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.name}: ${project.sourceLabel} (opens in a new tab)`}>
      <img src={project.image} alt={project.alt} width={project.width} height={project.height} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
      <span className="visual-link" aria-hidden="true"><Arrow diagonal /></span>
    </a>
    <div className="project-caption"><span>{project.discipline}</span><span>{project.status}</span></div>
    <div className="project-title-row"><h3 id={`${project.slug}-title`}>{project.name}</h3><a className="text-link" href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.sourceLabel} for ${project.name}`}>{project.sourceLabel}<Arrow diagonal /></a></div>
    <p className="project-description">{project.summary}</p>
    <p className="project-role"><span>My role</span>{project.role}</p>
    <ul className="project-tools" aria-label={`${project.name} tools`}>{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul>
    <details className="project-evidence"><summary>About this preview</summary><p>{project.evidence}</p></details>
  </article>;
}
