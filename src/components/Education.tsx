import type { EducationEntry } from "../data/education";

export default function Education({ entry }: { entry: EducationEntry }) {
  return (
    <article className="education-card" data-reveal="">
      <div className="education">
        <p className="eyebrow">{entry.level}</p>
        <h2>{entry.qualification}</h2>
        <p>{entry.institution}</p>
        <span>{entry.result}</span>
      </div>
    </article>
  );
}
