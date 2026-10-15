import { test, expect } from "@playwright/test";

declare global {
  interface Window { observedImageReveals: Element[]; }
}

test("hero finishes promptly and magnetic feedback keeps a stable hit target", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toHaveText("I’M A DESIGNER & DEVELOPER.");
  const endTimes = await heading.locator(".opening-line-text").evaluateAll(lines => lines.map(line => {
    const style = getComputedStyle(line);
    return (parseFloat(style.animationDuration) + parseFloat(style.animationDelay)) * 1000;
  }));
  expect(Math.min(...endTimes)).toBeGreaterThanOrEqual(800);
  expect(Math.max(...endTimes)).toBeLessThanOrEqual(1200);
  await expect.poll(() => page.locator(".opening-hero").evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBe(0);

  const link = page.getByRole("link", { name: "View my work", exact: true });
  const surface = link.locator(".opening-arrow");
  const before = (await link.boundingBox())!;
  await page.mouse.move(before.x + before.width - 8, before.y + 8);
  await expect.poll(() => surface.evaluate(e => Math.abs(parseFloat((e as HTMLElement).style.getPropertyValue("--magnet-x"))))).toBeGreaterThan(0);
  expect(await link.boundingBox()).toEqual(before);
  expect(await surface.evaluate(e => Math.abs(parseFloat((e as HTMLElement).style.getPropertyValue("--magnet-x"))))).toBeLessThanOrEqual(4);
  await page.keyboard.press("Tab");
  await expect.poll(() => surface.evaluate(e => (e as HTMLElement).style.getPropertyValue("--magnet-x"))).toBe("");
  await page.mouse.move(before.x + 15, before.y + 25);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => surface.evaluate(e => (e as HTMLElement).style.getPropertyValue("--magnet-x"))).toBe("");
  await link.click();
  await expect(page).toHaveURL("/projects");
  await expect(page.locator("main")).toBeFocused();
});

test("filtered project and dialog images reveal, and reduced motion settles them", async ({ page }) => {
  // Record actual entrances, so a busy parallel run cannot miss a 560 ms animation.
  await page.addInitScript(() => {
    window.observedImageReveals = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      const animation = animate.call(this, frames, options);
      if (this.matches('.screenshot-frame[data-reveal="image"]')) window.observedImageReveals.push(this);
      return animation;
    };
  });
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/projects");
  await page.getByRole("button", { name: /^Product design/ }).click();
  const image = page.locator(".project-card .screenshot-frame");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect.poll(() => image.evaluate(e => window.observedImageReveals.includes(e))).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => image.evaluate(e => e.getAnimations().length)).toBe(0);
  expect(await image.evaluate(e => getComputedStyle(e).clipPath)).toBe("none");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "More about SafeScan" }).click();
  const dialog = page.getByRole("dialog");
  await expect.poll(() => dialog.locator(".screenshot-frame").evaluate(e => window.observedImageReveals.includes(e))).toBe(true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => dialog.evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBe(0);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("button", { name: "More about SafeScan" })).toBeFocused();
});

test("theme reveal persists the latest choice and cancels on reduced motion", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).not.toHaveClass(/theme-transitioning/);
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(17, 20, 27)");
  // Rapid toggles cannot leave an old snapshot or commit a stale callback.
  await page.locator(".footer-theme").evaluate(button => {
    (button as HTMLButtonElement).click();
    (button as HTMLButtonElement).click();
    (button as HTMLButtonElement).click();
  });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/theme-transitioning/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await page.locator("html").evaluate(e => e.getAnimations({ subtree: true }).filter(a => a.playState === "running").length)).toBe(0);
});

test("theme changes work without the View Transition API", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(document, "startViewTransition", { value: undefined }));
  await page.goto("/contact");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).not.toHaveClass(/theme-transitioning/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("touch navigation and CTA remain direct with reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".opening-line-text").first()).toBeVisible();
  expect(await page.locator(".opening-hero").evaluate(e => e.getAnimations({ subtree: true }).length)).toBe(0);
  await page.getByRole("button", { name: "Menu", exact: true }).tap();
  await page.getByRole("link", { name: "Education", exact: true }).tap();
  await expect(page).toHaveURL("/education");
  await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("main")).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
