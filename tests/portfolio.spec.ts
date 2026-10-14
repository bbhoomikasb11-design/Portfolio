import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes=['/','/projects','/projects/campusmesh','/projects/adaptui','/projects/clearhead','/projects/safescan'];
for(const width of [320,375,430,768,1024,1440,1680]) {
 test(`all routes fit ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:900});
  for(const path of routes){
   await page.goto(path);await page.evaluate(()=>document.fonts.ready);
   await expect(page.locator('h1')).toHaveCount(1);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
   // Lazy media is deliberately not required to load before scrolling.
   if(path.startsWith('/projects/')){await page.locator('.case-figure').scrollIntoViewIfNeeded();await expect(page.locator('.case-figure img')).toBeVisible();}
  }
 });
}
test('keyboard navigation, mobile menu, filters and theme persistence',async({page})=>{
 await page.setViewportSize({width:375,height:850});await page.goto('/');
 await page.keyboard.press('Tab');await expect(page.getByText('Skip to content')).toBeFocused();
 await page.getByRole('button',{name:'Menu'}).click();await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Menu'})).toBeFocused();
 await page.getByRole('button',{name:'Menu'}).click();await page.getByRole('link',{name:'Work',exact:true}).click();
 await expect(page).toHaveURL('/projects');await expect(page.getByRole('button',{name:'Menu'})).toHaveAttribute('aria-expanded','false');
 await page.getByRole('button',{name:'Product design'}).click();await expect(page.locator('.project-card')).toHaveCount(1);await expect(page.locator('.project-card')).toContainText('SafeScan');
 await page.getByRole('button',{name:'Switch to dark theme'}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 await page.getByRole('button',{name:'Switch to light theme'}).click();await expect(page.locator('html')).toHaveAttribute('data-theme','light');
});
test('contact validation and truthful email draft',async({page})=>{
 await page.goto('/#contact');
 await page.getByRole('button',{name:'Prepare email'}).click();await expect(page.locator('input[name=name]')).toBeFocused();
 await page.getByLabel('Your name').fill('Portfolio QA');await page.getByLabel('Email address').fill('qa@example.com');await page.getByLabel('What’s on your mind?').fill('Hello, I would like to discuss a project.');
 await page.getByRole('button',{name:'Prepare email'}).click();await expect(page.getByRole('status')).toContainText('Nothing has been sent.');
 await expect(page.getByRole('link',{name:'open the draft again'})).toHaveAttribute('href',/mailto:bbhoomikasb11@gmail.com\?subject=Portfolio%20enquiry/);
});
test('WCAG automated checks on both themes and all routes',async({page})=>{
 for(const theme of ['light','dark'])for(const path of routes){
  await page.goto(path);await page.evaluate(t=>{document.documentElement.dataset.theme=t;localStorage.setItem('bhoomika-theme',t)},theme);
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  expect(result.violations,`${theme} ${path}: ${JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})))}`).toEqual([]);
 }
});
test('reduced motion, missing routes and image delivery',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 expect(await page.locator('.hero-copy').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();await expect(img).toHaveJSProperty('complete',true);expect(await img.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)}
 await page.goto('/projects/missing');await expect(page.getByRole('heading',{level:1})).toContainText('Nothing here');
});
