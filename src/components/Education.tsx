import type { EducationEntry } from "../data/education";

export default function Education({ entry, index }: { entry: EducationEntry; index: number }) {
  return (
    <article className={`education-card${index === 0 ? " education-featured" : ""}`} data-reveal="rise">
      <div className="education-topline">
        <span className="education-index" aria-hidden="true">0{index + 1}</span>
        <p className="eyebrow">{entry.level}</p>
        <svg className="education-book" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
          <path d="M16 8c-4-3-8-3-12-2v20c4-1 8-1 12 2m0-20c4-3 8-3 12-2v20c-4-1-8-1-12 2V8Z" />
          <path d="M8 11c2-.2 3 .1 5 1m-5 4c2-.2 3 .1 5 1m6-5c2-.9 3-1.2 5-1m-5 6c2-.9 3-1.2 5-1" />
        </svg>
      </div>
      <div className="education-detail">
        <h2>{entry.qualification}</h2>
        <p className="education-institution">{entry.institution}</p>
      </div>
      <dl className="education-result">
        <dt>{entry.result.label}</dt>
        <dd>{entry.result.value}<span>{entry.result.suffix}</span></dd>
      </dl>
      {index === 0 && (
        <div className="education-grid-mark" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>
      )}
    </article>
  );
}
