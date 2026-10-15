import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { Arrow } from "./Icons";
import { ProjectVisual } from "./ProjectCard";
import { motionDuration } from "../lib/motion";

export default function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const backdropPointer = useRef(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer.current);
      element?.close();
      document.body.style.overflow = overflow;
    };
  }, []);

  function close() {
    if (closing) return;
    const finish = () => {
      dialog.current?.close();
      onClose();
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    setClosing(true);
    timer.current = setTimeout(finish, motionDuration("hover"));
  }
  function isBackdrop(
    event:
      | React.PointerEvent<HTMLDialogElement>
      | React.MouseEvent<HTMLDialogElement>,
  ) {
    const bounds = event.currentTarget.getBoundingClientRect();
    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  }

  return (
    <dialog
      ref={dialog}
      className={`project-dialog${closing ? " is-closing" : ""}`}
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const stops = event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex="0"]',
        );
        const first = stops[0];
        const last = stops[stops.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onPointerDown={(event) => {
        backdropPointer.current = isBackdrop(event);
      }}
      onClick={(event) => {
        if (backdropPointer.current && isBackdrop(event)) close();
        backdropPointer.current = false;
      }}
    >
      <div className="dialog-topbar">
        <span className="eyebrow">A CLOSER LOOK</span>
        <button
          type="button"
          className="dialog-close icon-button"
          aria-label="Close project details"
          onClick={close}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
      </div>
      <div
        className="dialog-scroll"
        tabIndex={0}
        role="region"
        aria-label={`${project.name} project details`}
      >
        <ProjectVisual project={project} />
        <div className="dialog-content">
          <p className="eyebrow">{project.discipline}</p>
          <h2 id="project-dialog-title">
            {project.name}
            <em>.</em>
          </h2>
          <p className="dialog-intro">{project.intro}</p>
          <dl className="dialog-facts">
            <div>
              <dt>MY ROLE</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>CURRENT STATUS</dt>
              <dd>{project.status}</dd>
            </div>
          </dl>
          <section aria-labelledby="dialog-stack-title">
            <h3 id="dialog-stack-title">The toolkit</h3>
            <ul className="dialog-tags">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="dialog-journey-title">
            <h3 id="dialog-journey-title">The intended journey</h3>
            <ol className="dialog-journey">
              {project.flow.map((step, index) => (
                <li key={step}>
                  <span>0{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h3>{project.sections[0].title}</h3>
            <p>{project.sections[0].text}</p>
          </section>
          <section>
            <h3>{project.sections[project.sections.length - 1].title}</h3>
            <p>{project.sections[project.sections.length - 1].text}</p>
          </section>
          <p className="dialog-caption">{project.caption}</p>
        </div>
      </div>
      <div className="dialog-actions">
        <a
          className="button button-secondary"
          href={project.source}
          target="_blank"
          rel="noreferrer"
        >
          {project.sourceLabel}
          <Arrow diagonal />
        </a>
        <Link
          className="button button-primary"
          to={`/projects/${project.slug}`}
        >
          Full case study <Arrow />
        </Link>
      </div>
    </dialog>
  );
}
