import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { profile, skills, achievements } from './data/profile';
import { projects, archive } from './data/projects';
import { experience } from './data/experience';
import ProjectCard, { ProjectVisual } from './components/ProjectCard';
import Contact from './components/Contact';
import { Arrow, ThemeIcon } from './components/Icons';

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const initial = useRef(true);
  useEffect(()=>{
    const project=projects.find(p=>pathname===`/projects/${p.slug}`);
    const title=project ? `${project.name} — Bhoomika S` : pathname==='/projects' ? 'Selected work — Bhoomika S' : pathname==='/' ? 'Bhoomika S — Developer + Product Designer' : 'Page not found — Bhoomika S';
    const description=project?.summary || 'Bhoomika S — developer and product designer in Bengaluru. Thoughtful digital experiences, accessible interfaces and useful products.';
    document.title=title;
    document.querySelector('meta[name="description"]')?.setAttribute('content',description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content',title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content',description);
    if(hash) requestAnimationFrame(()=>document.getElementById(hash.slice(1))?.scrollIntoView());
    else { window.scrollTo({top:0,behavior:'instant'}); if(!initial.current) document.querySelector<HTMLElement>('main')?.focus({preventScroll:true}); }
    initial.current=false;
  },[pathname,hash]);
  return null;
}
function Header() {
  const [open,setOpen]=useState(false);
  const [dark,setDark]=useState(document.documentElement.dataset.theme==='dark');
  const {pathname,hash}=useLocation();
  const menuButton=useRef<HTMLButtonElement>(null);
  useEffect(()=>setOpen(false),[pathname,hash]);
  useEffect(()=>{
    const media=matchMedia('(prefers-color-scheme: dark)');
    const update=()=>{let saved=null;try{saved=localStorage.getItem('bhoomika-theme')}catch{/* Storage is optional. */}if(!saved){setDark(media.matches);document.documentElement.dataset.theme=media.matches?'dark':'light';}};
    media.addEventListener('change',update);return()=>media.removeEventListener('change',update);
  },[]);
  function toggleTheme(){const next=!dark;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';try{localStorage.setItem('bhoomika-theme',next?'dark':'light')}catch{/* Keep the session preference. */}}
  return <header className="site-header"><div className="container header-inner"><Link to="/" className="wordmark" aria-label="Bhoomika S home">bhoomika<span className="wordmark-dot">.</span><span className="wordmark-s">S</span></Link><div className="nav-area" onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);menuButton.current?.focus();}}}><nav aria-label="Main navigation" id="main-navigation" className={open?'navigation is-open':'navigation'}><NavLink to="/projects">Work</NavLink><Link to="/#about">About</Link><Link to="/#experience">Experience</Link><Link className="nav-contact" to="/#contact">Let’s talk <Arrow diagonal/></Link></nav><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark?'light':'dark'} theme`}><ThemeIcon dark={dark}/></button><button ref={menuButton} className="menu-button" aria-expanded={open} aria-controls="main-navigation" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}<span aria-hidden="true">{open?'−':'+'}</span></button></div></div></header>;
}
function Footer(){return <footer className="site-footer container"><Link to="/" className="footer-wordmark">Bhoomika S<span>© {new Date().getFullYear()}</span></Link><p>Thoughtfully designed. Purposefully built.</p><a href="#top">Back to top ↑</a></footer>}
function Home() {
 return <><section className="hero container"><div className="hero-top"><p className="eyebrow">DEVELOPER + PRODUCT DESIGNER</p><p className="location"><span aria-hidden="true">↗</span> Bengaluru, India</p></div><div className="hero-layout"><div className="hero-copy"><h1>{profile.headline[0]}<br/><em>{profile.headline[1]}</em></h1><div className="hero-description"><span className="small-star" aria-hidden="true">✳</span><p>{profile.introduction}</p></div><div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <Arrow diagonal/></a><a className="text-link" href={`mailto:${profile.email}`}>Say hello <Arrow diagonal/></a></div></div><figure className="portrait"><div className="portrait-corner top-left"/><div className="portrait-corner bottom-right"/>{profile.portrait ? <img src={profile.portrait.src} alt={profile.portrait.alt} width="480" height="600"/> : <div className="portrait-placeholder"><span className="portrait-label">THE PERSON BEHIND THE PIXELS</span><span className="portrait-initials" aria-hidden="true">bs<span>✳</span></span><span className="portrait-placeholder-note">A space for my portrait.</span></div>}<figcaption><span>Bhoomika S</span><span>{profile.portrait?'Designer. Developer. Always curious.':'Portrait to be added'}</span></figcaption></figure></div><div className="hero-bottom"><p className="availability"><span aria-hidden="true"/>Open to internships & full-time opportunities</p><a href="#work">A little further down <span aria-hidden="true">↓</span></a></div></section>
 <section id="work" className="work-section container section"><div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Ideas, made <em>real.</em></h2></div><div className="section-aside"><p>A few explorations at the intersection<br/>of people, design and technology.</p><Link className="text-link" to="/projects">View all work <Arrow diagonal/></Link></div></div><div className="project-grid">{projects.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div></section>
 <section id="about" className="about-section section"><div className="container about-grid"><div><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>Curious by nature.<br/><em>Builder by choice.</em></h2><div className="about-mark" aria-hidden="true">b<span>✳</span></div></div><div className="about-copy"><p className="lead">I like the space where an idea becomes something you can actually use.</p><p>I’m Bhoomika, a developer and product designer based in Bengaluru. I enjoy coding, designing useful products, and experimenting with ideas across disciplines.</p><p>For me, understanding the product and communicating the idea matter just as much as building the interface. I bring that curiosity to both the design file and the code editor.</p><div className="education"><p className="eyebrow">CURRENTLY LEARNING & BUILDING</p><h3>{profile.education}</h3><p>{profile.institution}</p><span>Reported CGPA: {profile.cgpa}</span></div></div></div><div className="container skills-grid">{skills.map(group=><div key={group.name}><h3>{group.name}</h3><ul>{group.items.map(s=><li key={s}>{s}</li>)}</ul></div>)}</div></section>
 <section id="experience" className="container section"><div className="section-heading"><div><p className="eyebrow">03 / EXPERIENCE</p><h2>Learning through<br/><em>meaningful work.</em></h2></div><p className="section-aside">Different contexts.<br/>The same care for the details.</p></div><div className="experience-list">{experience.map((item,i)=><article key={item.organization}><span className="experience-index">0{i+1}</span><div className="experience-title"><p className="eyebrow">{item.kind}</p><h3>{item.organization}</h3><span>{item.role}</span></div><div className="experience-copy"><p>{item.description}</p><ul>{item.contributions.map(c=><li key={c}>{c}</li>)}</ul></div></article>)}</div></section>
 <section className="recognition-section container section"><div className="section-heading"><div><p className="eyebrow">04 / BEYOND THE EVERYDAY</p><h2>A little more <em>perspective.</em></h2></div></div><div className="recognition-grid">{achievements.map((a,i)=><article key={a.title}><span className="recognition-number">0{i+1}</span><h3>{a.title}</h3><p>{a.text}</p>{a.href?<a className="text-link" href={a.href} target="_blank" rel="noreferrer">Explore team project <Arrow diagonal/></a>:<span className="small-note">{a.note}</span>}</article>)}</div></section><Contact/></>;
}
function Projects() {
 const [filter,setFilter]=useState('All work');
 const visible=projects.filter(p=>filter==='All work'||p.category===filter);
 return <div className="container archive-page"><p className="eyebrow">THE PROJECT INDEX</p><h1>Thought, craft<br/>and <em>working code.</em></h1><p className="page-intro">Product explorations, shared builds and independent experiments. Each one is another way of learning by making.</p><div className="filter-bar" aria-label="Filter projects">{['All work','Engineering','Product design'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}<span>{f==='All work'?'04':f==='Engineering'?'03':'01'}</span></button>)}</div><p className="sr-only" role="status">{visible.length} projects shown</p><div className="project-grid">{visible.map(p=><ProjectCard key={p.slug} project={p} index={projects.indexOf(p)}/>)}</div><section className="additional-work section"><p className="eyebrow">ALSO ON THE WORKBENCH</p><h2>More things <em>I’ve explored.</em></h2>{archive.map(p=><a className="archive-row" key={p.name} href={p.href} target="_blank" rel="noreferrer"><div><span className="eyebrow">{p.label}</span><h3>{p.name}</h3></div><p>{p.description}</p><Arrow diagonal/></a>)}</section></div>;
}
function CaseStudy(){
 const {slug}=useParams();const project=projects.find(p=>p.slug===slug);
 if(!project)return <NotFound/>;
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 return <article className="case-study container"><Link className="text-link back-link" to="/projects">← All projects</Link><div className="case-heading"><p className="eyebrow">{project.discipline}</p><h1>{project.name}<span>.</span></h1><p className="case-intro">{project.intro}</p></div><dl className="case-facts"><div><dt>MY ROLE</dt><dd>{project.role}</dd></div><div><dt>STATUS</dt><dd>{project.status}</dd></div><div><dt>TOOLS & TECHNOLOGIES</dt><dd>{project.stack.join(' · ')}</dd></div></dl><figure className="case-figure"><ProjectVisual project={project}/><figcaption>{project.caption}</figcaption></figure><div className="case-body"><aside><p className="eyebrow">INSIDE THE PROJECT</p><nav aria-label="Case study sections">{project.sections.map((s,i)=><a key={s.title} href={`#section-${i}`}>{s.title}</a>)}</nav><a className="text-link" href={project.source} target="_blank" rel="noreferrer">{project.sourceLabel}<Arrow diagonal/></a></aside><div className="case-sections"><section className="journey"><p className="eyebrow">THE INTENDED JOURNEY</p><ol>{project.flow.map((f,i)=><li key={f}><span>0{i+1}</span>{f}</li>)}</ol></section>{project.sections.map((s,i)=><section id={`section-${i}`} key={s.title}><span className="eyebrow">0{i+1}</span><h2>{s.title}</h2><p>{s.text}</p></section>)}<a className="button button-primary" href={project.source} target="_blank" rel="noreferrer">{project.sourceLabel}<Arrow diagonal/></a></div></div><Link className="next-project" to={`/projects/${next.slug}`}><div><p className="eyebrow">NEXT EXPLORATION</p><h2>{next.name}</h2></div><Arrow diagonal/></Link></article>;
}
function NotFound(){return <section className="container not-found"><p className="eyebrow">404 / A SMALL DETOUR</p><h1>Nothing here.<br/><em>Plenty to explore.</em></h1><Link className="button button-primary" to="/">Back to home <Arrow/></Link></section>}
export default function App(){return <><a className="skip-link" href="#main">Skip to content</a><div id="top"/><RouteEffects/><Header/><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:slug" element={<CaseStudy/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></>}
