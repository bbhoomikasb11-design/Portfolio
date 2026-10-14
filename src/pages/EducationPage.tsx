import { Link } from "react-router-dom";
import Education from "../components/Education";
import { education } from "../data/education";
import { Arrow } from "../components/Icons";
import "../styles/education.css";

export default function EducationPage() {
  return (
    <section className="container profile-page education-page">
      <header className="profile-page-heading">
        <p className="eyebrow">EDUCATION</p>
        <h1>
          Curiosity is
          <br />
          <em>a good starting point.</em>
        </h1>
        <p>
          Learning across artificial intelligence, data science, design and
          development.
        </p>
      </header>
      <div className="education-history">
        {education.map((entry, index) => (
          <Education key={entry.institution} entry={entry} index={index} />
        ))}
      </div>
      <div className="learning-note" data-reveal="">
        <p className="eyebrow">LEARNING BY MAKING</p>
        <h2>
          From an idea to
          <br />
          <em>something useful.</em>
        </h2>
        <p>
          I enjoy experimenting with ideas across disciplines. My projects bring
          that curiosity into product design, frontend development and AI
          integration.
        </p>
        <Link className="text-link" to="/projects">
          Explore my projects <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
