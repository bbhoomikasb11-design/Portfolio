/** Rebuild original raster concepts. Requires Chrome, Python/Pillow and `npm run dev`. */
import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1100 }, deviceScaleFactor: 1 });
  await page.goto(process.env.PLAYGROUND_ORIGIN || 'http://localhost:5174');
  await mkdir('design/playground/renders', { recursive: true });
  await mkdir('public/images/playground', { recursive: true });
  const premiumOnly = process.argv.includes('--premium');
  const manifest = premiumOnly ? JSON.parse(await readFile('design/playground/dimensions.json', 'utf8')) : {};
  for (const source of premiumOnly ? ['premium.html'] : ['artboards.html', 'premium.html']) {
    await page.setContent(await readFile(`design/playground/${source}`, 'utf8'));
    await page.evaluate(() => document.fonts.ready);
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    for (const board of await page.locator('[data-artboard]').all()) {
      const name = await board.getAttribute('data-artboard');
      const dimensions = await board.evaluate(element => {
        const bounds = element.getBoundingClientRect();
        if (element.scrollWidth > element.clientWidth) throw new Error('Artboard overflows horizontally');
        if (element.scrollHeight > element.clientHeight) throw new Error('Artboard clips vertically');
        return { width: Math.round(bounds.width), height: Math.round(bounds.height) };
      });
      manifest[name] = dimensions;
      await board.screenshot({ path: `design/playground/renders/${name}.png` });
      await run('python3', ['-c', 'from PIL import Image; import sys; Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2], "WEBP", quality=91, method=6)', `design/playground/renders/${name}.png`, `public/images/playground/${name}.webp`]);
      console.log(`Rendered ${name}: ${dimensions.width} × ${dimensions.height}`);
    }
  }
  await writeFile('design/playground/dimensions.json', JSON.stringify(manifest, null, 2) + '\n');
} finally { await browser.close(); }
