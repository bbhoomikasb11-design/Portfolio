import { test, expect } from '@playwright/test';

test('gallery loads near the viewport; originals load only when requested', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => requests.push(request.url()));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  expect(requests.filter(url => /Gallery-|images\/playground\//.test(url))).toEqual([]);
  await page.locator('#playground').scrollIntoViewIfNeeded();
  await expect(page.locator('.gallery-preview')).toHaveCount(4);
  await expect.poll(() => requests.filter(url => url.includes('/playground/thumbnails/')).length).toBe(4);
  expect(requests.filter(url => /\/images\/playground\/[^/]+\.webp/.test(url))).toHaveLength(0);
  await page.getByRole('button', { name: 'Open design: Daily Bread — neighbourhood bakery' }).click();
  await expect(page.locator('.design-full-image')).toHaveJSProperty('complete', true);
  expect(requests.filter(url => /\/images\/playground\/[^/]+\.webp/.test(url))).toHaveLength(1);
  await page.keyboard.press('Escape');
});

test('finite pagination covers all studies once, never wraps, and keeps DOM bounded', async ({ page }) => {
  await page.goto('/#playground');
  await expect(page.getByRole('button', { name: 'Previous designs' })).toBeDisabled();
  const titles: string[] = [];
  for (let index = 0; index < 4; index++) {
    const current = await page.locator('.gallery-item figcaption').allTextContents();
    expect(current.length).toBeLessThanOrEqual(4);
    titles.push(...current);
    if (index < 3) await page.getByRole('button', { name: 'Next designs' }).click();
  }
  expect(titles).toHaveLength(14);
  expect(new Set(titles).size).toBe(14);
  await expect(page.getByRole('button', { name: 'Next designs' })).toBeDisabled();
  await expect(page.locator('.gallery-pagination')).toContainText('13–14');
  await page.getByRole('button', { name: 'Previous designs' }).click();
  await expect(page.locator('.gallery-pagination')).toContainText('9–12');
});

test('dialog traps focus, closes with Escape and returns focus without scrolling', async ({ page }) => {
  await page.goto('/#playground');
  const opener = page.locator('.gallery-preview').first();
  await opener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close design preview' })).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe('hidden');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  expect(await page.getByRole('dialog').evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  await opener.click();
  await page.getByRole('button', { name: 'Close design preview' }).click();
  await expect(opener).toBeFocused();
});

test('idle gallery does not animate or schedule animation frames; wheel scroll stays native', async ({ page }) => {
  await page.addInitScript(() => {
    const original = window.requestAnimationFrame.bind(window);
    (window as Window & { frameCalls: number }).frameCalls = 0;
    window.requestAnimationFrame = callback => { (window as Window & { frameCalls: number }).frameCalls++; return original(callback); };
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#playground');
  await expect(page.locator('.gallery-preview')).toHaveCount(4);
  const frames = () => page.evaluate(() => (window as Window & { frameCalls: number }).frameCalls);
  const first = await frames();
  await page.waitForTimeout(500);
  expect(await frames()).toBe(first);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  const before = await page.evaluate(() => scrollY);
  await page.locator('.gallery-preview').first().hover();
  await page.mouse.wheel(0, 360);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
  await page.locator('#playground').scrollIntoViewIfNeeded();
  await page.locator('.gallery-preview').first().click();
  expect(await page.getByRole('dialog').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
});

test('all previews and full-size images decode without browser errors', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#playground');
  for (let index = 0; index < 4; index++) {
    await expect(page.locator('.gallery-preview').first()).toBeVisible();
    for (const button of await page.locator('.gallery-preview').all()) {
      await button.click();
      await expect.poll(() => page.locator('.design-full-image').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      await page.keyboard.press('Escape');
    }
    if (index < 3) await page.getByRole('button', { name: 'Next designs' }).click();
  }
  for (const source of await page.locator('.project-visual img, .achievement-photo img').evaluateAll(images => images.map(image => (image as HTMLImageElement).src))) expect((await request.get(source)).ok()).toBe(true);
  expect(errors).toEqual([]);
});
