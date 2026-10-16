/** Optional Chrome lab check. Run against a built preview; not a field metric. */
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'light' });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1600000 / 8, uploadThroughput: 750000 / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    window.__lab = { lcp: 0, cls: 0, frames: 0 };
    new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__lab.lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__lab.cls += entry.value; }).observe({ type: 'layout-shift', buffered: true });
    const original = requestAnimationFrame.bind(window);
    window.requestAnimationFrame = callback => { window.__lab.frames++; return original(callback); };
  });
  await page.goto(process.env.PERFORMANCE_URL || 'http://127.0.0.1:4173/');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
  const initial = await page.evaluate(() => ({ ...window.__lab, resources: performance.getEntriesByType('resource').filter(entry => entry.transferSize).map(entry => ({ name: new URL(entry.name).pathname, bytes: entry.transferSize })), galleryMounted: !!document.querySelector('.gallery-preview') }));
  await page.evaluate(() => document.getElementById('playground').scrollIntoView({ behavior: 'instant' }));
  await page.locator('.gallery-preview').first().waitFor();
  await page.locator('.gallery-preview img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await page.waitForTimeout(600);
  const gallery = await page.evaluate(() => ({ ...window.__lab, thumbnails: document.querySelectorAll('.gallery-preview').length, sectionHeight: document.getElementById('playground').getBoundingClientRect().height }));
  const result = { measurement: 'One Chrome lab run against the local production preview, cold cache, 390x844, 4x CPU slowdown, 1.6 Mbps down / 750 Kbps up / 150 ms latency; not field data or a Lighthouse score.', initial, gallery };
  await writeFile('docs/qa/single-page-performance.json', JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ lcpMs: initial.lcp, initialCLS: initial.cls, galleryCLS: gallery.cls, animationFrameCalls: gallery.frames, initialTransferBytes: initial.resources.reduce((total, item) => total + item.bytes, 0), galleryLoadedInitially: initial.galleryMounted, visibleGalleryImages: gallery.thumbnails, mobileGalleryHeight: gallery.sectionHeight }));
} finally { await browser.close(); }
