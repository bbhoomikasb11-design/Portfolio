import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { profile } from "./data/profile";
import { projects, archive } from "./data/projects";
import Experience from "./components/Experience";
import About from "./components/About";
import DesignComparison from "./components/DesignComparison";
import Achievements from "./components/Achievements";
import ThemeToggle from "./components/ThemeToggle";
import EducationPage from "./pages/EducationPage";
import { pages } from "./data/pages";
import { useScrollReveals } from "./hooks/useScrollReveals";
import ProjectCard, { ProjectVisual } from "./components/ProjectCard";
import Contact from "./components/Contact";
import { Arrow } from "./components/Icons";
import Header from "./components/Header";
import Skills from "./components/Skills";
import ProjectDialog from "./components/ProjectDialog";
import type { Project } from "./data/projects";

const PlaygroundPage = lazy(() => import("./pages/PlaygroundPage"));

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const initial = useRef(true);
  useEffect(() => {
    const project = projects.find((p) => pathname === `/projects/${p.slug}`);
    const page = pages.find((p) => p.path === pathname);
    const title = project
      ? `${project.name} — Bhoomika S`
      : page?.title || "Page not found — Bhoomika S";
    const description =
      project?.summary ||
      page?.description ||
      "Explore Bhoomika S’s portfolio.";
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
    if (hash)
      requestAnimationFrame(() =>
        document
          .getElementById(hash === "#work" ? "skills" : hash.slice(1))
          ?.scrollIntoView(),
      );
    else {
      window.scrollTo({ top: 0, behavior: "instant" });
      if (!initial.current)
        document
          .querySelector<HTMLElement>("main")
          ?.focus({ preventScroll: true });
    }
    initial.current = false;
  }, [pathname, hash]);
  return null;
}
function Footer() {
  return (
    <footer className="site-footer container">
      <Link to="/" className="footer-wordmark">
        Bhoomika S<span>© {new Date().getFullYear()}</span>
      </Link>
      <p>Thoughtfully designed. Purposefully built.</p>
      <div className="footer-actions">
        <ThemeToggle />
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-top">
          <p className="eyebrow">DEVELOPER + PRODUCT DESIGNER</p>
          <p className="location">
            <span aria-hidden="true">↗</span> Bengaluru, India
          </p>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <h1>
              {profile.headline[0]}
              <br />
              <em>{profile.headline[1]}</em>
            </h1>
            <div className="hero-description">
              <span className="small-star" aria-hidden="true">
                ✳
              </span>
              <p>{profile.introduction}</p>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#skills">
                Explore my skills <Arrow />
              </a>
              <Link className="text-link" to="/projects">
                View my work <Arrow diagonal />
              </Link>
            </div>
          </div>
          <figure className="portrait">
            <div className="portrait-corner top-left" />
            <div className="portrait-corner bottom-right" />
            {profile.portrait ? (
              <img
                src={profile.portrait.src}
                srcSet={profile.portrait.srcSet}
                sizes="(max-width: 760px) 75vw, 380px"
                alt={profile.portrait.alt}
                width="960"
                height="1280"
                fetchPriority="high"
              />
            ) : (
              <div className="portrait-placeholder">
                <span className="portrait-label">
                  THE PERSON BEHIND THE PIXELS
                </span>
                <span className="portrait-initials" aria-hidden="true">
                  bs<span>✳</span>
                </span>
                <span className="portrait-placeholder-note">
                  A space for my portrait.
                </span>
              </div>
            )}
            <figcaption>
              <span>Bhoomika S</span>
              <span>
                {profile.portrait
                  ? "Designer. Developer. Always curious."
                  : "Portrait to be added"}
              </span>
            </figcaption>
          </figure>
        </div>
        <div className="hero-bottom">
          <p className="availability">
            <span aria-hidden="true" />
            Open to internships & full-time opportunities
          </p>
          <a href="#skills">
            A little further down <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <Skills />
      <About />
      <DesignComparison />
      <Achievements />
      <Contact />
    </>
  );
}
function Projects() {
  const [filter, setFilter] = useState("All work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const visible = projects.filter(
    (p) => filter === "All work" || p.category === filter,
  );
  return (
    <div className="container archive-page">
      <p className="eyebrow">THE PROJECT INDEX</p>
      <h1>
        Thought, craft
        <br />
        and <em>working code.</em>
      </h1>
      <p className="page-intro">
        Product explorations, shared builds and independent experiments. Each
        one is another way of learning by making.
      </p>
      <div className="filter-bar" aria-label="Filter projects">
        {["All work", "Engineering", "Product design"].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
            <span>
              {f === "All work" ? "04" : f === "Engineering" ? "03" : "01"}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} projects shown
      </p>
      <div className="project-grid">
        {visible.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={projects.indexOf(p)}
            onOpen={setSelectedProject}
          />
        ))}
      </div>
      <section className="additional-work section">
        <p className="eyebrow">ALSO ON THE WORKBENCH</p>
        <h2>
          More things <em>I’ve explored.</em>
        </h2>
        {archive.map((p) => (
          <a
            className="archive-row"
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <span className="eyebrow">{p.label}</span>
              <h3>{p.name}</h3>
            </div>
            <p>{p.description}</p>
            <Arrow diagonal />
          </a>
        ))}
      </section>
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className="case-study container">
      <Link className="text-link back-link" to="/projects">
        ← All projects
      </Link>
      <div className="case-heading">
        <p className="eyebrow">{project.discipline}</p>
        <h1>
          {project.name}
          <span>.</span>
        </h1>
        <p className="case-intro">{project.intro}</p>
      </div>
      <dl className="case-facts">
        <div>
          <dt>MY ROLE</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt>STATUS</dt>
          <dd>{project.status}</dd>
        </div>
        <div>
          <dt>TOOLS & TECHNOLOGIES</dt>
          <dd>{project.stack.join(" · ")}</dd>
        </div>
      </dl>
      <figure className="case-figure">
        <ProjectVisual project={project} />
        <figcaption>{project.caption}</figcaption>
      </figure>
      <div className="case-body">
        <aside>
          <p className="eyebrow">INSIDE THE PROJECT</p>
          <nav aria-label="Case study sections">
            {project.sections.map((s, i) => (
              <a key={s.title} href={`#section-${i}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <a
            className="text-link"
            href={project.source}
            target="_blank"
            rel="noreferrer"
          >
            {project.sourceLabel}
            <Arrow diagonal />
          </a>
        </aside>
        <div className="case-sections">
          <section className="journey">
            <p className="eyebrow">THE INTENDED JOURNEY</p>
            <ol>
              {project.flow.map((f, i) => (
                <li key={f}>
                  <span>0{i + 1}</span>
                  {f}
                </li>
              ))}
            </ol>
          </section>
          {project.sections.map((s, i) => (
            <section id={`section-${i}`} key={s.title}>
              <span className="eyebrow">0{i + 1}</span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <a
            className="button button-primary"
            href={project.source}
            target="_blank"
            rel="noreferrer"
          >
            {project.sourceLabel}
            <Arrow diagonal />
          </a>
        </div>
      </div>
      <Link className="next-project" to={`/projects/${next.slug}`}>
        <div>
          <p className="eyebrow">NEXT EXPLORATION</p>
          <h2>{next.name}</h2>
        </div>
        <Arrow diagonal />
      </Link>
    </article>
  );
}
function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>
        Nothing here.
        <br />
        <em>Plenty to explore.</em>
      </h1>
      <Link className="button button-primary" to="/">
        Back to home <Arrow />
      </Link>
    </section>
  );
}
export default function App() {
  const { pathname } = useLocation();
  useScrollReveals(pathname);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div id="top" />
      <RouteEffects />
      <Header />
      <main
        id="main"
        tabIndex={-1}
        key={pathname}
        className={pathname === "/playground" ? "playground-route" : undefined}
      >
        <Suspense
          fallback={
            <p className="container" role="status">
              Opening the playground…
            </p>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience page />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/contact" element={<Contact page />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {pathname !== "/playground" && <Footer />}
    </>
  );
}
