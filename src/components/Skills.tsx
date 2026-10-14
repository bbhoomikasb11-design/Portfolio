import { useState } from "react";
import { Link } from "react-router-dom";
import { skills } from "../data/profile";
import { Arrow } from "./Icons";

export default function Skills() {
  const [selected, setSelected] = useState("All skills");
  const visible =
    selected === "All skills"
      ? skills
      : skills.filter((group) => group.name === selected);
  const total = visible.reduce((count, group) => count + group.items.length, 0);

  return (
    <section
      id="skills"
      className="skills-section container section"
      aria-labelledby="skills-title"
    >
      <div className="skills-panel">
        <p className="eyebrow">01 / MY TOOLKIT</p>
        <h2 id="skills-title">
          Thoughtful design.
          <br />
          <em>A hands-on toolkit.</em>
        </h2>
        <p className="skills-intro">
          From the first sketch to the working interface, these are the tools
          and practices I bring to the process.
        </p>
        <div className="skill-filters" role="group" aria-label="Filter skills">
          {["All skills", ...skills.map((group) => group.name)].map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={selected === name}
              onClick={() => setSelected(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {total} skills shown: {selected}
        </p>
        <div className="skill-cloud" key={selected}>
          {visible.map((group) => (
            <ul
              key={group.name}
              className="skill-group"
              aria-label={group.name}
            >
              {group.items.map((skill) => (
                <li key={skill}>
                  <span className="skill-dot" aria-hidden="true" />
                  {skill}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="skills-footer">
          <p>The toolkit is one part. What I make with it is the other.</p>
          <Link to="/projects" className="text-link">
            Explore my work <Arrow diagonal />
          </Link>
        </div>
      </div>
    </section>
  );
}
