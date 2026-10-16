import { useEffect } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { Skills } from './components/Skills';
import { Background } from './components/Background';
import { Achievements } from './components/Achievements';
import { Playground } from './components/playground/Playground';
import { Arrow } from './components/Icons';
import { profile } from './data/profile';
import { projects, additionalProjects } from './data/projects';
import { resolveLegacyLocation } from './lib/location';

export default function App() {
  useEffect(() => {
    resolveLegacyLocation();
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);
  return <>
    <div id="top" aria-hidden="true" />
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main" tabIndex={-1} className="container">
      <section className="introduction" aria-labelledby="intro-title">
        <div className="intro-person">
          <span className="portrait-frame"><img className="portrait" src="/images/bhoomika-portrait-480.webp" alt={profile.portrait?.alt} width="96" height="112" fetchPriority="high" /></span>
          <div><p className="eyebrow">Bengaluru, India</p><h1 id="intro-title">Hi, I’m Bhoomika<span className="blue">.</span></h1><p className="intro-role">Developer & Product Designer</p></div>
        </div>
        <div className="intro-note"><p>I like figuring out how a product should work, then building the interface that makes it useful.</p><p className="availability"><span aria-hidden="true" />Open to internships & full-time roles</p></div>
      </section>
      <section id="work" className="work section" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">From a sketch to a screen.</h2></div><p>Product thinking, interface design<br className="desktop-break" /> and the code behind it.</p></div>
        <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
        <div className="more-work"><span>Also explored</span>{additionalProjects.map(project => <a key={project.name} href={project.source} target="_blank" rel="noreferrer">{project.name}<span className="more-work-note">{project.note}</span><Arrow diagonal /></a>)}</div>
      </section>
      <Skills />
      <Playground />
      <Background />
      <Achievements />
    </main>
    <footer id="connect" className="site-footer container">
      <div className="footer-top"><div><p className="eyebrow">Have something in mind?</p><h2>Let’s make it happen.</h2></div><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a></div>
      <div className="footer-bottom"><p>Bhoomika.S <span aria-hidden="true">/</span> Bengaluru, India</p><div className="social-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub<Arrow diagonal /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow diagonal /></a><a href="#top">Back to top ↑</a></div></div>
    </footer>
  </>;
}
