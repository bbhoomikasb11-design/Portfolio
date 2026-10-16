import { readFile, writeFile } from 'node:fs/promises';
const base = await readFile('dist/index.html', 'utf8');
const origin = process.env.SITE_URL?.replace(/\/$/, '');
if (origin && !/^https:\/\/[^/]+$/.test(origin)) throw new Error('SITE_URL must be an HTTPS origin, with no path.');
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
let html = base;
if (origin) {
  html = html.replace('</head>', `<link rel="canonical" href="${escape(origin)}/"/><meta property="og:url" content="${escape(origin)}/"/></head>`).replace('content="/social-preview.png"', `content="${escape(origin)}/social-preview.png"`);
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(origin)}/</loc></url></urlset>`);
}
await writeFile('dist/index.html', html);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`);
console.log(`Generated single-page metadata${origin ? ', canonical URL and sitemap' : ' (SITE_URL not set; canonical and sitemap deferred)'}.`);
