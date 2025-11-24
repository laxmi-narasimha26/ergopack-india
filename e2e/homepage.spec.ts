import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/ErgoPack India/);
  });

  test('should display main navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should have accessible skip navigation link', async ({ page }) => {
    const skipLink = page.locator('a:has-text("Skip to main content")');
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('main').first();
    await expect(hero).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should have valid Core Web Vitals', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check for good LCP (< 2.5s)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        setTimeout(() => resolve(0), 5000);
      });
    });

    expect(lcp).toBeLessThan(2500);
  });

  test('should navigate to products page', async ({ page }) => {
    await page.click('a:has-text("Products")');
    await expect(page).toHaveURL(/products/);
  });

  test('should navigate to contact page', async ({ page }) => {
    await page.click('a:has-text("Contact")');
    await expect(page).toHaveURL(/contact/);
  });

  test('should have proper meta tags', async ({ page }) => {
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('ErgoPack');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('ErgoPack India');
  });

  test('should have manifest.json', async ({ page }) => {
    const manifest = await page.locator('link[rel="manifest"]').getAttribute('href');
    expect(manifest).toBe('/manifest.json');

    // Verify manifest is accessible
    const response = await page.request.get('/manifest.json');
    expect(response.ok()).toBeTruthy();
  });
});

test.describe('Accessibility', () => {
  test('should pass basic accessibility checks', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);

    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check for proper form labels
    const inputs = await page.locator('input[type="text"], input[type="email"]').all();
    for (const input of inputs) {
      const ariaLabel = await input.getAttribute('aria-label');
      const id = await input.getAttribute('id');
      const hasLabel = ariaLabel || (id && (await page.locator(`label[for="${id}"]`).count()) > 0);
      expect(hasLabel).toBeTruthy();
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    const firstFocusable = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(firstFocusable);
  });
});
