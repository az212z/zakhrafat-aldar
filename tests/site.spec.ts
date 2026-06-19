import { test, expect } from "@playwright/test";

test.describe("زخرفة الدار — static site", () => {
  test("loads with RTL Arabic and correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/زخرفة الدار/);
    const html = page.locator("html");
    await expect(html).toHaveAttribute("dir", "rtl");
    await expect(html).toHaveAttribute("lang", "ar");
  });

  test("hero headline and CTAs visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: "اطلب عرض سعر" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "شاهد أعمالنا" })).toBeVisible();
  });

  test("google rating cited", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/تقييم على خرائط قوقل/)).toBeVisible();
    await expect(page.getByText(/4\.8/).first()).toBeVisible();
  });

  test("all content images resolve (no broken)", async ({ page }) => {
    await page.goto("/");
    // Scroll through the page so lazy images load.
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    // Only images with a real src (the lightbox img is intentionally empty until opened)
    const imgs = page.locator('img[src]:not([src=""])');
    const count = await imgs.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await imgs.nth(i).scrollIntoViewIfNeeded();
      await expect
        .poll(async () =>
          imgs.nth(i).evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)
        , { timeout: 5000 })
        .toBeTruthy();
    }
  });

  test("services has no invented prices", async ({ page }) => {
    await page.goto("/");
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/ريال|﷼|SAR|\$/);
    expect(body).toMatch(/حسب الطلب/);
  });

  test("mobile menu is full-screen overlay", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.locator("#burger").click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toHaveClass(/open/);
    const box = await menu.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(380);
    expect(box?.height).toBeGreaterThanOrEqual(800);
    await page.locator("#menu-close").click();
    await expect(menu).not.toHaveClass(/open/);
  });

  test("no horizontal scroll at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1
    );
    expect(overflow).toBeFalsy();
  });

  test("quote form validates and builds wa.me link", async ({ page, context }) => {
    await page.goto("/");
    await page.locator("#quote-form button[type=submit]").click();
    await expect(page.locator('.field-error[data-for="q-name"]')).not.toHaveText("");

    await page.fill("#q-name", "محمد العتيبي");
    await page.fill("#q-phone", "0501234567");
    await page.selectOption("#q-service", { label: "ورق جدران" });

    const popupPromise = context.waitForEvent("page");
    await page.locator("#quote-form button[type=submit]").click();
    await expect(page.locator("#toast")).toHaveClass(/show/);
    const popup = await popupPromise;
    // wa.me redirects to api.whatsapp.com/send; accept either form
    expect(popup.url()).toMatch(/(wa\.me|api\.whatsapp\.com).*966500943560/);
  });

  test("gallery lightbox opens", async ({ page }) => {
    await page.goto("/");
    await page.locator(".gallery-item").first().click();
    await expect(page.locator("#lightbox")).toHaveClass(/open/);
    await page.locator("#lightbox-close").click();
    await expect(page.locator("#lightbox")).not.toHaveClass(/open/);
  });
});
