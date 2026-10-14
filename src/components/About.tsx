import { Link } from "react-router-dom";
import { aboutFocus } from "../data/profile";
import { Arrow } from "./Icons";

export default function About() {
  return (
    <section
      id="about"
      className="about-section section"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="about-overview">
          <div className="about-heading">
            <p className="eyebrow">02 / A LITTLE ABOUT ME</p>
            <h2 id="about-title">
              Curious by nature.
              <br />
              <em>Builder by choice.</em>
            </h2>
            <p className="about-location">
              <span aria-hidden="true">↗</span> Bengaluru, India
            </p>
          </div>
          <div className="about-story">
            <p className="about-lead">
              I like turning <em>“what if?”</em>
              <br />
              into something you can use.
            </p>
            <p>
              I’m Bhoomika, a developer and product designer. I enjoy coding,
              designing useful products, and experimenting with ideas across
              disciplines.
            </p>
            <p>
              I care about understanding the product, building the interface,
              and making the idea easy to understand.
            </p>
            <Link className="text-link" to="/projects">
              See how that takes shape <Arrow diagonal />
            </Link>
          </div>
        </div>
        <div className="about-focus">
          {aboutFocus.map((item, index) => (
            <article key={item.title}>
              <div className="focus-topline">
                <span className="eyebrow">0{index + 1}</span>
                <span className="focus-detail">{item.detail}</span>
              </div>
              <h3>
                {item.title}
                <span aria-hidden="true">.</span>
              </h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="about-footnote">
          <p>From the design file to the code editor.</p>
          <Link className="text-link" to="/education">
            My education <Arrow diagonal />
          </Link>
        </div>
      </div>
    </section>
  );
}
