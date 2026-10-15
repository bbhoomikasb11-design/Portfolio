/** Development-only artwork renderer: local Chrome, Python/Pillow, and the Vite dev server. */
import { chromium } from '@playwright/test';
import { readFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);
const temporary = await mkdtemp(join(tmpdir(), 'portfolio-comparison-'));
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 900, height: 1000 } });
  await page.goto(process.env.PLAYGROUND_ORIGIN || 'http://localhost:5173');
  await page.setContent(await readFile('design/comparison/artboards.html', 'utf8'));
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await mkdir('public/images/comparison', { recursive: true });
  for (const board of await page.locator('[data-artboard]').all()) {
    const name = await board.getAttribute('data-artboard');
    await board.evaluate(element => {
      if (element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) throw new Error(`Artwork overflows: ${element.dataset.artboard}`);
      const bounds = element.getBoundingClientRect();
      const footer = element.querySelector('.study-note').getBoundingClientRect();
      if (footer.bottom > bounds.bottom + 1) throw new Error(`Footer is clipped: ${element.dataset.artboard}`);
    });
    const png = join(temporary, `${name}.png`);
    await board.screenshot({ path: png });
    await run('python3', ['-c', 'from PIL import Image; import sys; Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], "WEBP", quality=94, method=6)', png, `public/images/comparison/${name}.webp`]);
    console.log(`Rendered ${name}`);
  }
} finally {
  await browser.close();
  await rm(temporary, { recursive: true, force: true });
}
