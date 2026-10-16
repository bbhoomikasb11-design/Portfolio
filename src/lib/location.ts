const legacyAnchors: Record<string, string> = {
  '/projects': 'work', '/playground': 'playground', '/experience': 'experience',
  '/education': 'education', '/about': 'background', '/contact': 'connect',
  '/projects/safescan': 'project-safescan', '/projects/campusmesh': 'project-campusmesh',
  '/projects/adaptui': 'project-adaptui', '/projects/clearhead': 'project-clearhead',
};
/** Keep previously shared URLs useful without maintaining separate pages. */
export function resolveLegacyLocation() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/') return;
  const anchor = legacyAnchors[path];
  history.replaceState(null, '', `/${anchor ? `#${anchor}` : ''}`);
}
