import { readFile, writeFile, mkdir } from 'node:fs/promises';
import ts from 'typescript';
const code=ts.transpileModule(await readFile('src/data/projects.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {projects}=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const base=await readFile('dist/index.html','utf8');
const origin=process.env.SITE_URL?.replace(/\/$/,'');
if(origin && !/^https:\/\/[^/]+$/.test(origin)) throw new Error('SITE_URL must be an HTTPS origin, with no path.');
const routes=[{path:'/',title:'Bhoomika S — Developer + Product Designer',description:'Curiosity in design. Purpose in code. Selected projects by Bhoomika S, developer and product designer in Bengaluru.'},{path:'/projects',title:'Selected work — Bhoomika S',description:'Explore product design, accessibility, frontend and AI integration projects by Bhoomika S.'},...projects.map(p=>({path:`/projects/${p.slug}`,title:`${p.name} — Bhoomika S`,description:p.summary}))];
const esc=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
for(const route of routes){
 let html=base.replace(/<title>.*?<\/title>/,`<title>${esc(route.title)}</title>`).replace(/(<meta name="description" content=")[^"]*/,`$1${esc(route.description)}`).replace(/(<meta property="og:title" content=")[^"]*/,`$1${esc(route.title)}`).replace(/(<meta property="og:description" content=")[^"]*/,`$1${esc(route.description)}`);
 if(origin)html=html.replace('</head>',`<link rel="canonical" href="${origin}${route.path}"/><meta property="og:url" content="${origin}${route.path}"/></head>`).replace('content="/social-preview.png"',`content="${origin}/social-preview.png"`);
 const dir=route.path==='/'?'dist':`dist${route.path}`;await mkdir(dir,{recursive:true});await writeFile(`${dir}/index.html`,html);
}
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n${origin?`Sitemap: ${origin}/sitemap.xml\n`:''}`);
if(origin)await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin}${r.path}</loc></url>`).join('')}</urlset>`);
console.log(`Generated metadata for ${routes.length} routes${origin?' and sitemap':' (SITE_URL not set; canonical and sitemap deferred)'}.`);

await writeFile('dist/404.html',base.replace('</head>','<meta name="robots" content="noindex"/></head>'));
