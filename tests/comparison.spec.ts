import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("comparison follows About and supports keyboard reveal and browsing", async ({ page }) => {
  await page.goto("/");
  const section = page.locator(".design-comparison");
  expect(await page.locator("#about").evaluate(e => e.nextElementSibling?.classList.contains("design-comparison"))).toBe(true);
  await section.scrollIntoViewIfNeeded();
  const range = page.getByRole("slider", { name: "Before and after design comparison" });
  await range.focus();
  await page.keyboard.press("ArrowRight");
  await expect(range).toHaveValue("51");
  await expect(range).toHaveAttribute("aria-valuetext", "51% original design, 49% refined design");
  expect(await page.locator(".comparison-after").evaluate(e => getComputedStyle(e).clipPath)).toContain("51%");
  await page.keyboard.press("Home");
  await expect(range).toHaveValue("0");
  await page.keyboard.press("End");
  await expect(range).toHaveValue("100");
  const stage = page.locator(".comparison-stage");
  const before = await stage.evaluate(e => e.style.getPropertyValue("--travel"));
  await page.getByRole("button", { name: "Next design study" }).click();
  await expect.poll(() => stage.evaluate(e => e.style.getPropertyValue("--travel"))).not.toBe(before);
  await expect(page.getByRole("button", { name: "Play design comparison motion" })).toBeVisible();
  for (const img of await section.locator("img").all()) {
    await expect.poll(() => img.evaluate(e => (e as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  for (const theme of ["light", "dark"]) {
    await page.evaluate(t => { document.documentElement.dataset.theme = t; }, theme);
    expect((await new AxeBuilder({ page }).include(".design-comparison").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze()).violations).toEqual([]);
  }
});

test("comparison tracks stay aligned, pause and respect a changing motion preference", async ({ page }) => {
  await page.goto("/");
  await page.locator(".design-comparison").scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const travel = () => page.locator(".comparison-stage").evaluate(e => e.style.getPropertyValue("--travel"));
  const initial = await travel();
  await expect.poll(travel).not.toBe(initial);
  const tracks = await page.locator(".comparison-track").evaluateAll(items => items.map(e => getComputedStyle(e).transform));
  expect(tracks[0]).toBe(tracks[1]);
  await page.getByRole("button", { name: "Pause design comparison motion" }).click();
  const stopped = await travel();
  await page.waitForTimeout(150);
  expect(await travel()).toBe(stopped);
  await page.getByRole("button", { name: "Play design comparison motion" }).click();
  await expect.poll(travel).not.toBe(stopped);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.getByRole("button", { name: /design comparison motion/ })).toHaveCount(0);
  const reduced = await travel();
  await page.waitForTimeout(150);
  expect(await travel()).toBe(reduced);
  await page.getByRole("button", { name: "Next design study" }).click();
  await expect.poll(travel).not.toBe(reduced);
  expect(await page.locator(".comparison-track").first().evaluate(e => getComputedStyle(e).transitionDuration)).toBe("0s");
});

test("comparison is usable with touch at narrow widths", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  const range = page.getByRole("slider", { name: "Before and after design comparison" });
  await range.scrollIntoViewIfNeeded();
  const bounds = await range.boundingBox();
  if (!bounds) throw new Error("Missing comparison slider");
  const cdp = await context.newCDPSession(page);
  const y = bounds.y + bounds.height / 2;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: bounds.x + bounds.width / 2, y, id: 0 }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: bounds.x + bounds.width * .8, y, id: 0 }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  expect(Number(await range.inputValue())).toBeGreaterThan(65);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await context.close();
});
