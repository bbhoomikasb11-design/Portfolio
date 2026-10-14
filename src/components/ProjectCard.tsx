import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { Arrow } from './Icons';
export function ProjectVisual({ project }: { project: Project }) {
  return <div className={`project-visual visual-${project.slug}`}><div className="visual-topline"><span>{project.name}</span><span>{project.category === 'Product design' ? 'DESIGN EXPLORATION' : 'FROM THE SOURCE'}</span></div><div className="screenshot-frame"><img src={project.image} alt={project.alt} loading="lazy" width={project.slug === 'adaptui' ? 380 : 1280} height={project.slug === 'adaptui' ? 740 : 800}/></div><span className="visual-index" aria-hidden="true">{project.slug === 'adaptui' ? 'Aa' : project.slug === 'clearhead' ? 'A little clarity.' : project.slug === 'safescan' ? 'From scan to understanding.' : 'Made for campus life.'}</span></div>;
}
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card"><Link className="project-image-link" to={`/projects/${project.slug}`} aria-label={`Explore ${project.name} case study`}><ProjectVisual project={project}/><span className="image-arrow"><Arrow diagonal/></span></Link><div className="project-meta"><span>{String(index+1).padStart(2,'0')} / {project.discipline}</span><span>{project.status}</span></div><div className="project-heading"><h3><Link to={`/projects/${project.slug}`}>{project.name}</Link></h3><Link className="round-link" to={`/projects/${project.slug}`} aria-label={`Read ${project.name} case study`}><Arrow diagonal/></Link></div><p>{project.summary}</p><p className="project-role">{project.role}</p><div className="tags">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div></article>;
}
