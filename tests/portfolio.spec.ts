import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/experience",
  "/education",
  "/contact",
  "/projects",
  "/projects/campusmesh",
  "/projects/adaptui",
  "/projects/clearhead",
  "/projects/safescan",
];
for (const width of [320, 375, 430, 768, 1024, 1440, 1680]) {
  test(`all routes fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      // Lazy media is deliberately not required to load before scrolling.
      if (path.startsWith("/projects/")) {
        await page.locator(".case-figure").scrollIntoViewIfNeeded();
        await expect(page.locator(".case-figure img")).toBeVisible();
      }
    }
  });
}
test("keyboard navigation, mobile menu, filters and theme persistence", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL("/projects");
  await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.getByRole("button", { name: "Product design" }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("SafeScan");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});
test("contact validation and truthful email draft", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.locator("input[name=name]")).toBeFocused();
  await page.getByLabel("Your name").fill("Portfolio QA");
  await page.getByLabel("Email address").fill("qa@example.com");
  await page
    .getByLabel("What’s on your mind?")
    .fill("Hello, I would like to discuss a project.");
  await page.getByRole("button", { name: "Prepare email" }).click();
  await expect(page.locator("form").getByRole("status")).toContainText(
    "Nothing has been sent.",
  );
  await expect(
    page.getByRole("link", { name: "open the draft again" }),
  ).toHaveAttribute(
    "href",
    /mailto:bbhoomikasb11@gmail.com\?subject=Portfolio%20enquiry/,
  );
});
test("WCAG automated checks on both themes and all routes", async ({
  page,
}) => {
  for (const theme of ["light", "dark"])
    for (const path of routes) {
      await page.goto(path);
      await page.evaluate((t) => {
        document.documentElement.dataset.theme = t;
        localStorage.setItem("bhoomika-theme", t);
      }, theme);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        result.violations,
        `${theme} ${path}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
});
test("reduced motion, missing routes and image delivery", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveJSProperty("complete", true);
    expect(
      await img.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
  }
  await page.goto("/projects/missing");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Nothing here",
  );
});

test("skills-first home and supplied portrait", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Bhoomika.S home" })).toHaveText(
    "Bhoomika.S",
  );
  await expect(page.locator("main > section").nth(1)).toHaveAttribute(
    "id",
    "skills",
  );
  await expect(page.locator(".hero .portrait img")).toHaveAttribute(
    "src",
    "/images/bhoomika-portrait-960.webp",
  );
  await expect(page.locator(".project-card")).toHaveCount(0);
  await expect(page.locator("#experience")).toHaveCount(0);
  await expect(page.locator("#achievements .achievement-card")).toHaveCount(4);
  await expect(page.locator(".about-focus article")).toHaveCount(3);
  await page.getByRole("button", { name: "Frontend", exact: true }).click();
  await expect(page.locator(".skill-cloud li")).toHaveCount(5);
  await expect(page.locator(".skill-cloud")).toContainText("React");
  await expect(page.locator(".skill-cloud")).not.toContainText("Figma");
  await page.getByRole("button", { name: "All skills", exact: true }).click();
  await expect(page.locator(".skill-cloud li")).toHaveCount(22);
});

for (const width of [320, 768, 1440]) {
  test(`project dialog keyboard and scroll behavior at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects");
    const trigger = page.getByRole("button", { name: "More about AdaptUI" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "AdaptUI." });
    await expect(dialog).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Close project details" }),
    ).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe(
      "hidden",
    );
    expect(
      await dialog.evaluate((e) => e.scrollWidth <= e.clientWidth),
    ).toBeTruthy();
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate((e) => e.contains(document.activeElement)),
      ).toBeTruthy();
    }
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
    await trigger.click();
    await page
      .getByRole("link", { name: "Full case study", exact: true })
      .click();
    await expect(page).toHaveURL("/projects/adaptui");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
  });
}

test("all project dialogs meet automated contrast and accessibility checks", async ({
  page,
}) => {
  for (const theme of ["light", "dark"]) {
    await page.goto("/projects");
    await page.evaluate((t) => {
      document.documentElement.dataset.theme = t;
      localStorage.setItem("bhoomika-theme", t);
    }, theme);
    for (const name of ["CampusMesh", "AdaptUI", "ClearHead", "SafeScan"]) {
      await page.getByRole("button", { name: `More about ${name}` }).click();
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
    }
  }
});

test("reduced-motion dialog closes on backdrop and restores page position", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects");
  const trigger = page.getByRole("button", { name: "More about SafeScan" });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();
  const position = await page.evaluate(() => window.scrollY);
  const dialog = page.getByRole("dialog");
  expect(
    await dialog.evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Full case study" }),
  ).toBeFocused();
  await page.mouse.click(5, 5);
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBe(position);
});

test("five destination navigation, active pill and page metadata", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav.getByRole("link")).toHaveText([
    "Home",
    "Experience",
    "Education",
    "Projects",
    "Contact",
  ]);
  for (const [name, path] of [
    ["Experience", "/experience"],
    ["Education", "/education"],
    ["Projects", "/projects"],
    ["Contact", "/contact"],
    ["Home", "/"],
  ]) {
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(nav.getByRole("link", { name, exact: true })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(nav.locator("a[aria-current]")).toHaveCount(1);
    await expect(page.locator("main")).toBeFocused();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Bhoomika S/);
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const active = document
            .querySelector('nav[aria-label="Main navigation"] a[aria-current]')!
            .getBoundingClientRect();
          const pill = document
            .querySelector(".nav-active-pill")!
            .getBoundingClientRect();
          return (
            Math.abs(active.left - pill.left) < 1 &&
            Math.abs(active.width - pill.width) < 1
          );
        }),
      )
      .toBe(true);
  }
  await page.goBack();
  await expect(page).toHaveURL("/contact");
  await expect(
    nav.getByRole("link", { name: "Contact", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.getByLabel("Your name")).toBeVisible();
});

test("scroll reveals respect changing reduced-motion preference", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".skills-panel").scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.getAnimations().filter((a) => a.playState === "running")
            .length,
      ),
    )
    .toBe(0);
  await page.locator(".achievement-grid").scrollIntoViewIfNeeded();
  expect(
    await page
      .locator(".achievement-grid article")
      .first()
      .evaluate((e) => e.getAnimations().length),
  ).toBe(0);
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Education", exact: true })
    .click();
  expect(
    await page
      .locator("main")
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
});
