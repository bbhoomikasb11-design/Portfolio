import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("image-only canvas pans and zooms without opening overlays", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/playground");
  const canvas = page.getByRole("region", { name: "Infinite design canvas" });
  const plane = page.locator(".play-plane");
  await expect(canvas).toBeVisible();
  await expect(page.locator(".playground-shell button")).toHaveCount(0);
  const rect = await canvas.boundingBox();
  if (!rect) throw new Error("No canvas bounds");
  expect(rect.y).toBe(110);
  expect(rect.height).toBe(890);
  await canvas.focus();
  await page.keyboard.press("0");
  const initial = await plane.getAttribute("style");
  const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
  await page.mouse.click(x, y);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 230, y + 70, { steps: 12 });
  await page.mouse.up();
  await expect.poll(() => plane.getAttribute("style")).not.toBe(initial);
  await page.keyboard.press("0");
  await expect.poll(() => plane.getAttribute("style")).toBe(initial);
  await page.keyboard.press("+");
  await expect.poll(() => plane.getAttribute("style")).toContain("scale(1)");
  await page.keyboard.press("0");
  await page.keyboard.press("ArrowDown");
  await expect.poll(() => plane.getAttribute("style")).not.toBe(initial);
  await page.mouse.wheel(15000, 24000);
  await expect.poll(() => plane.getAttribute("style")).not.toBe(initial);
  expect(await page.locator(".play-tile").count()).toBeLessThan(70);
  await page.getByRole("navigation").getByRole("link", { name: "Home", exact: true }).click();
  await expect(page).toHaveURL("/");
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});

test("image-only canvas remains accessible in both themes", async ({ page }) => {
  await page.goto("/playground");
  await expect(page.getByRole("list", { name: "Original design concepts" }).getByRole("listitem")).toHaveCount(14);
  for (const theme of ["light", "dark"]) {
    await page.evaluate(t => { document.documentElement.dataset.theme = t; }, theme);
    expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
  }
  await page.locator(".play-tile img").evaluateAll(images => Promise.all(images.map(image => (image as HTMLImageElement).decode())));
  for (const img of await page.locator(".play-tile img").all()) {
    expect(await img.evaluate(e => (e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
});

test("touch pan and pinch, compact layouts and reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/playground");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Playground", exact: true })).toHaveAttribute("aria-current", "page");
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  const canvas = page.getByRole("region", { name: "Infinite design canvas" });
  await expect(canvas).toBeVisible();
  const r = await canvas.boundingBox();
  if (!r) throw new Error("No canvas");
  const cdp = await context.newCDPSession(page);
  const x = r.x + r.width / 2,
    y = r.y + r.height / 2;
  const start = await page.locator(".play-plane").getAttribute("style");
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y, id: 0 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: x - 55, y: y + 40, id: 0 }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() => page.locator(".play-plane").getAttribute("style"))
    .not.toBe(start);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const before = await page.locator(".play-plane").getAttribute("style");
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [
      { x: x - 35, y, id: 0 },
      { x: x + 35, y, id: 1 },
    ],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [
      { x: x - 60, y, id: 0 },
      { x: x + 60, y, id: 1 },
    ],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect
    .poll(() => page.locator(".play-plane").getAttribute("style"))
    .not.toBe(before);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const still = await page.locator(".play-plane").getAttribute("style");
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  expect(await page.locator(".play-plane").getAttribute("style")).toBe(still);
  await context.close();
});

test("wheel glides under the cursor and live reduced motion stops interpolation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/playground");
  const canvas = page.getByRole("region", { name: "Infinite design canvas" });
  await canvas.focus();
  await page.keyboard.press("0");
  const before = await page.locator(".play-plane").evaluate(el => {
    const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return { x: m.m41, y: m.m42 };
  });
  await page.mouse.move(350, 400);
  await page.mouse.wheel(240, 380);
  const samples = await page.locator(".play-plane").evaluate(async el => {
    const started = performance.now();
    const values: { x: number; y: number }[] = [];
    for (const time of [0, 80, 250, 1500]) {
      while (performance.now() - started < time) await new Promise(requestAnimationFrame);
      const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      values.push({ x: matrix.m41, y: matrix.m42 });
    }
    return values;
  });
  expect(samples[0].x).toBeGreaterThan(samples[2].x);
  expect(samples[0].y).toBeGreaterThan(samples[2].y);
  expect(samples[3].x).toBeCloseTo(before.x - 240, 0);
  expect(samples[3].y).toBeCloseTo(before.y - 380, 0);
  await page.mouse.wheel(300, 300);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.locator(".playground-shell").evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBe(0);
  const stopped = await page.locator(".play-plane").getAttribute("style");
  await page.evaluate(async () => { for (let i = 0; i < 10; i++) await new Promise(requestAnimationFrame); });
  expect(await page.locator(".play-plane").getAttribute("style")).toBe(stopped);
  await canvas.focus();
  await page.keyboard.press("0");
  for (let i = 0; i < 8; i++) await page.keyboard.press("-");
  await expect(page.locator(".play-plane")).toHaveAttribute("style", /scale\(0.3\)/);
  await page.mouse.wheel(25000, -35000);
  expect(await page.locator(".play-tile").count()).toBeLessThan(70);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
