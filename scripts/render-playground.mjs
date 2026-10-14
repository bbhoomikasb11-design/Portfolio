/** Rebuild original raster UI concepts. Requires Chrome, Python/Pillow and `npm run dev`. */
import { chromium } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto(process.env.PLAYGROUND_ORIGIN || 'http://localhost:5173');
  await page.setContent(await readFile('design/playground/artboards.html', 'utf8'));
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await mkdir('design/playground/renders', { recursive: true });
  await mkdir('public/images/playground', { recursive: true });
  for (const board of await page.locator('[data-artboard]').all()) {
    const name = await board.getAttribute('data-artboard');
    await board.evaluate(element => {
      const top = element.getBoundingClientRect().top;
      const bottom = Math.max(...Array.from(element.children).filter(child => !child.classList.contains('caption') && getComputedStyle(child).position !== 'absolute').map(child => child.getBoundingClientRect().bottom));
      element.style.height = `${Math.max(940, Math.ceil(bottom - top + 70))}px`;
    });
    await board.screenshot({ path: `design/playground/renders/${name}.png` });
    await run('python3', ['-c', 'from PIL import Image; import sys; Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], "WEBP", quality=91, method=6)', `design/playground/renders/${name}.png`, `public/images/playground/${name}.webp`]);
    console.log(`Rendered ${name}`);
  }
} finally { await browser.close(); }
