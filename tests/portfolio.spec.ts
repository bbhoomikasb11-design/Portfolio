import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1680]) {
  test(`single page fits ${width}px, including gallery and full-page preview`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.locator('.portrait-frame').evaluate(el => el.getBoundingClientRect().width)).toBeLessThanOrEqual(96);
    expect(await page.locator('#work').evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(500);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('#playground').scrollIntoViewIfNeeded();
    await expect(page.locator('.gallery-preview')).toHaveCount(width <= 700 ? 2 : 4);
    await page.locator('.gallery-preview').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('.design-full-image')).toBeVisible();
    expect(await page.getByRole('dialog').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await page.keyboard.press('Escape');
    await page.locator('#connect').scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test('projects lead, supporting content is concise, and social links replace contact pages', async ({ page }) => {
  await page.goto('/');
  const sectionIds = await page.locator('main > section').evaluateAll(items => items.map(item => item.id));
  expect(sectionIds).toEqual(['', 'work', 'skills', 'playground', 'background', 'achievements']);
  await expect(page.locator('.project-card')).toHaveCount(4);
  await expect(page.locator('.skills-list > div')).toHaveCount(5);
  await expect(page.getByRole('form')).toHaveCount(0);
  await expect(page.locator('a[href="/contact"], a[href="/about"], a[href="/projects"]')).toHaveCount(0);
  for (const [name, href] of [
    ['View Figma for SafeScan', 'https://www.figma.com/design/Gk104dZnM486TBImFXejHX/SafeScan'],
    ['View GitHub for CampusMesh', 'https://github.com/bbhoomikasb11-design/CampusMesh'],
    ['View GitHub for AdaptUI', 'https://github.com/bbhoomikasb11-design/AdaptUI'],
    ['View GitHub for ClearHead', 'https://github.com/bbhoomikasb11-design/ClearHead'],
  ]) await expect(page.getByRole('link', { name, exact: true })).toHaveAttribute('href', href);
  await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', 'https://github.com/bbhoomikasb11-design');
  await expect(page.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', 'https://linkedin.com/in/bhoomika-s-743758381');
  await expect(page.getByRole('link', { name: 'bbhoomikasb11@gmail.com', exact: true })).toHaveAttribute('href', 'mailto:bbhoomikasb11@gmail.com');
  await expect(page.locator('#education')).toContainText('93.3%');
  await expect(page.locator('#education')).toContainText('83.3%');
  await expect(page.locator('#achievements img[src$="poster-presentation-original.jpg"]')).toHaveCount(1);
  await expect(page.locator('#achievements img[src*="poster-presentation-enhanced"]')).toHaveCount(0);
});

test('old URLs resolve to sections on the single page', async ({ page }) => {
  const paths = { projects: 'work', playground: 'playground', experience: 'experience', education: 'education', about: 'background', contact: 'connect', 'projects/safescan': 'project-safescan', 'projects/campusmesh': 'project-campusmesh', 'projects/adaptui': 'project-adaptui', 'projects/clearhead': 'project-clearhead' };
  for (const [path, anchor] of Object.entries(paths)) {
    await page.goto(`/${path}`);
    await expect(page).toHaveURL(`/#${anchor}`);
    await expect(page.locator(`#${anchor}`)).toBeInViewport();
    await expect(page.locator('h1')).toHaveCount(1);
  }
});

test('keyboard skip, mobile menu, anchor navigation and back to top', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('button', { name: 'Menu' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused();
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Playground', exact: true }).click();
  await expect(page).toHaveURL('/#playground');
  await expect(page.getByRole('navigation')).toBeHidden();
  await expect(page.locator('#playground')).toBeInViewport();
  await page.getByRole('link', { name: 'Back to top ↑', exact: true }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test('theme follows system, persists explicit choice and tolerates unavailable storage', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage disabled'); } }));
  await page.reload();
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

for (const theme of ['light', 'dark'] as const) {
  test(`page and gallery dialog pass axe in ${theme} theme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.locator('#playground').scrollIntoViewIfNeeded();
      await expect(page.locator('.gallery-preview')).toHaveCount(width <= 700 ? 2 : 4);
      const audit = () => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect((await audit()).violations).toEqual([]);
      await page.locator('.gallery-preview').first().click();
      expect((await audit()).violations).toEqual([]);
      await page.keyboard.press('Escape');
    }
  });
}
