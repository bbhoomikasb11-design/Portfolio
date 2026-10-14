import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("canvas pans endlessly, zooms, resets and opens image-only previews", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/playground");
  const canvas = page.getByRole("region", { name: "Infinite design canvas" });
  const plane = page.locator(".play-plane");
  await expect(canvas).toBeVisible();
  const initial = await plane.getAttribute("style");
  const rect = await canvas.boundingBox();
  if (!rect) throw new Error("No canvas bounds");
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    rect.x + rect.width / 2 - 230,
    rect.y + rect.height / 2 + 70,
    { steps: 12 },
  );
  await page.mouse.up();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect.poll(() => plane.getAttribute("style")).not.toBe(initial);
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(page.getByLabel("Canvas zoom")).toHaveText("105%");
  await page.getByRole("button", { name: "Zoom out", exact: true }).click();
  await expect(page.getByLabel("Canvas zoom")).toHaveText("90%");
  await page.getByRole("button", { name: "Reset canvas view" }).click();
  await expect.poll(() => plane.getAttribute("style")).toBe(initial);
  await canvas.focus();
  await page.keyboard.press("ArrowDown");
  await expect.poll(() => plane.getAttribute("style")).not.toBe(initial);
  await page.keyboard.press("0");
  await expect.poll(() => plane.getAttribute("style")).toBe(initial);
  // A very long trackpad move still has a bounded, populated tile window.
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.wheel(15000, 24000);
  await expect.poll(() => plane.getAttribute("style")).not.toBe(initial);
  expect(await page.locator(".play-tile").count()).toBeLessThan(60);
  expect(
    await page.locator('.play-tile[aria-hidden="false"]').count(),
  ).toBeGreaterThan(0);
  await page.getByRole("button", { name: "Reset canvas view" }).click();
  await page
    .locator('.play-tile[data-piece="muse"][aria-hidden="false"]')
    .first()
    .click();
  const viewer = page.getByRole("dialog");
  await expect(viewer).toBeVisible();
  await expect(viewer.getByRole("heading", { level: 2 })).toHaveText(
    "A little play",
  );
  await expect(viewer.locator("a")).toHaveCount(0);
  await expect(
    viewer.getByRole("button", { name: "Close image preview" }),
  ).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(viewer.getByRole("heading", { level: 2 })).toHaveText(
    "A calmer workspace",
  );
  await viewer.getByRole("button", { name: "Enlarge image" }).click();
  await expect(page.locator(".play-viewer-image")).toHaveClass(/is-actual/);
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  await expect(canvas).toBeFocused();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await expect(page).toHaveURL("/");
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("gallery filters, loads every image, traps viewer focus and restores trigger", async ({
  page,
}) => {
  await page.goto("/playground");
  await page.getByRole("button", { name: "Gallery", exact: true }).click();
  await expect(page.locator(".play-gallery-card")).toHaveCount(16);
  for (const img of await page.locator(".play-gallery-card img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveJSProperty("complete", true);
    expect(
      await img.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
  }
  await page.getByRole("button", { name: "Posters 2", exact: true }).click();
  await expect(page.locator(".play-gallery-card")).toHaveCount(2);
  const trigger = page.getByRole("button", {
    name: "Preview Make room for play",
  });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const viewer = page.getByRole("dialog");
  await expect(viewer).toBeVisible();
  await page.keyboard.press("Shift+Tab");
  await expect(
    viewer.getByRole("button", { name: "Enlarge image" }),
  ).toBeFocused();
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    expect(
      await viewer.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "Artwork 2", exact: true }).click();
  await expect(page.locator(".play-gallery-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All 16", exact: true }).click();
  await expect(page.locator(".play-gallery-card")).toHaveCount(16);
  await page.getByRole("button", { name: "Canvas", exact: true }).click();
  const first = await page
    .locator(".play-tile")
    .first()
    .getAttribute("data-piece");
  await page.getByRole("button", { name: "Shuffle designs" }).click();
  await expect
    .poll(() => page.locator(".play-tile").first().getAttribute("data-piece"))
    .not.toBe(first);
});

test("canvas, gallery and image preview pass axe in both themes", async ({
  page,
}) => {
  await page.goto("/playground");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((t) => {
      document.documentElement.dataset.theme = t;
    }, theme);
    for (const mode of ["Canvas", "Gallery"]) {
      await page.getByRole("button", { name: mode, exact: true }).click();
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
    }
    await page
      .getByRole("button", { name: "Preview A little play", exact: true })
      .click();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.keyboard.press("Escape");
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
  const before = await page.getByLabel("Canvas zoom").textContent();
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
    .poll(() => page.getByLabel("Canvas zoom").textContent())
    .not.toBe(before);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Gallery", exact: true }).click();
  await page
    .getByRole("button", { name: "Preview A little play", exact: true })
    .click();
  expect(
    await page
      .getByRole("dialog")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.getByRole("button", { name: "Close image preview" }).click();
  await context.close();
});
