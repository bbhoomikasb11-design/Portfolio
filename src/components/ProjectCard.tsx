import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { Arrow } from "./Icons";

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual visual-${project.slug}`}>
      <div className="visual-topline">
        <span>{project.name}</span>
        <span>
          {project.category === "Product design"
            ? "DESIGN EXPLORATION"
            : "FROM THE SOURCE"}
        </span>
      </div>
      <div className="screenshot-frame">
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          width={project.slug === "adaptui" ? 380 : 1280}
          height={project.slug === "adaptui" ? 740 : 800}
        />
      </div>
      <span className="visual-index" aria-hidden="true">
        {project.slug === "adaptui"
          ? "Aa"
          : project.slug === "clearhead"
            ? "A little clarity."
            : project.slug === "safescan"
              ? "From scan to understanding."
              : "Made for campus life."}
      </span>
    </div>
  );
}
export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className="project-card">
      <button
        type="button"
        className="project-image-link"
        aria-label={`Preview ${project.name}`}
        aria-haspopup="dialog"
        onClick={() => onOpen(project)}
      >
        <ProjectVisual project={project} />
        <span className="image-arrow">
          <Arrow diagonal />
        </span>
      </button>
      <div className="project-card-copy">
        <p className="eyebrow">
          {String(index + 1).padStart(2, "0")} / {project.discipline}
        </p>
        <h2>
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
          >
            {project.name}
          </button>
        </h2>
        <p className="project-summary">{project.summary}</p>
        <p className="project-status">
          <span aria-hidden="true" />
          {project.status}
        </p>
        <ul
          className="project-tools"
          aria-label={`${project.name} technologies`}
        >
          {project.stack.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <div className="project-card-actions">
          <button
            className="button button-primary"
            type="button"
            aria-haspopup="dialog"
            aria-label={`More about ${project.name}`}
            onClick={() => onOpen(project)}
          >
            More info <Arrow />
          </button>
          <Link to={`/projects/${project.slug}`} className="text-link">
            Case study <Arrow diagonal />
          </Link>
        </div>
      </div>
    </article>
  );
}
