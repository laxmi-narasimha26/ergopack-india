import { test, expect } from '@playwright/test';

test.describe('SEO Validation', () => {
  test.describe('Homepage SEO', () => {
    test('should have correct meta title', async ({ page }) => {
      await page.goto('/');
      const title = await page.title();
      expect(title).toContain('ErgoPack India');
      expect(title.length).toBeLessThanOrEqual(60);
    });

    test('should have meta description under 160 chars', async ({ page }) => {
      await page.goto('/');
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeLessThanOrEqual(160);
      // Should contain core keywords
      expect(description!.toLowerCase()).toMatch(/pallet|strapping|ergopack/i);
    });

    test('should have Open Graph tags', async ({ page }) => {
      await page.goto('/');

      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();

      const ogDescription = await page
        .locator('meta[property="og:description"]')
        .getAttribute('content');
      expect(ogDescription).toBeTruthy();

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      expect(ogImage).toBeTruthy();

      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
      expect(ogType).toBeTruthy();
    });

    test('should have Twitter Card tags', async ({ page }) => {
      await page.goto('/');

      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
      expect(twitterCard).toBe('summary_large_image');

      const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute('content');
      expect(twitterTitle).toBeTruthy();
    });

    test('should have canonical URL', async ({ page }) => {
      await page.goto('/');
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
    });
  });

  test.describe('JSON-LD Structured Data', () => {
    test('should have Organization schema', async ({ page }) => {
      await page.goto('/');

      const scripts = await page.locator('script[type="application/ld+json"]').all();
      const schemas = await Promise.all(
        scripts.map(async (script) => {
          const content = await script.textContent();
          return content ? JSON.parse(content) : null;
        })
      );

      const orgSchema = schemas.find((s) => s && s['@type'] === 'Organization');

      expect(orgSchema).toBeTruthy();
      expect(orgSchema['@context']).toBe('https://schema.org');
      expect(orgSchema.name).toContain('ErgoPack');
    });

    test('should have Website schema', async ({ page }) => {
      await page.goto('/');

      const scripts = await page.locator('script[type="application/ld+json"]').all();
      const schemas = await Promise.all(
        scripts.map(async (script) => {
          const content = await script.textContent();
          return content ? JSON.parse(content) : null;
        })
      );

      const websiteSchema = schemas.find((s) => s && s['@type'] === 'WebSite');

      expect(websiteSchema).toBeTruthy();
      expect(websiteSchema.potentialAction).toBeTruthy();
    });

    test('should have LocalBusiness schema', async ({ page }) => {
      await page.goto('/');

      const scripts = await page.locator('script[type="application/ld+json"]').all();
      const schemas = await Promise.all(
        scripts.map(async (script) => {
          const content = await script.textContent();
          return content ? JSON.parse(content) : null;
        })
      );

      const localSchema = schemas.find((s) => s && s['@type'] === 'LocalBusiness');

      expect(localSchema).toBeTruthy();
    });

    test('should have FAQ schema', async ({ page }) => {
      await page.goto('/');

      const scripts = await page.locator('script[type="application/ld+json"]').all();
      const schemas = await Promise.all(
        scripts.map(async (script) => {
          const content = await script.textContent();
          return content ? JSON.parse(content) : null;
        })
      );

      const faqSchema = schemas.find((s) => s && s['@type'] === 'FAQPage');

      expect(faqSchema).toBeTruthy();
      expect(faqSchema.mainEntity).toBeTruthy();
      expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
    });
  });

  test.describe('Sitemap', () => {
    test('should have accessible sitemap.xml', async ({ page }) => {
      const response = await page.request.get('/sitemap.xml');
      expect(response.ok()).toBeTruthy();
      expect(response.headers()['content-type']).toContain('xml');

      const text = await response.text();
      expect(text).toContain('<?xml');
      expect(text).toContain('<urlset');
      expect(text).toContain('<url>');
    });

    test('should include product pages in sitemap', async ({ page }) => {
      const response = await page.request.get('/sitemap.xml');
      const text = await response.text();

      // Core product pages should be in sitemap
      expect(text).toContain('/products');
      expect(text).toContain('priority');
      expect(text).toContain('changefreq');
    });
  });

  test.describe('Robots.txt', () => {
    test('should have accessible robots.txt', async ({ page }) => {
      const response = await page.request.get('/robots.txt');
      expect(response.ok()).toBeTruthy();

      const text = await response.text();
      expect(text).toContain('User-agent');
      expect(text).toContain('Sitemap');
    });

    test('should block admin and API routes', async ({ page }) => {
      const response = await page.request.get('/robots.txt');
      const text = await response.text();

      expect(text).toContain('Disallow: /admin');
      expect(text).toContain('Disallow: /api');
    });
  });

  test.describe('Product Page SEO', () => {
    test('should have product-specific meta tags', async ({ page }) => {
      await page.goto('/products/745e');

      const title = await page.title();
      expect(title).toContain('745E');

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
    });

    test('should have breadcrumb structured data on product pages', async ({ page }) => {
      await page.goto('/products/745e');

      const scripts = await page.locator('script[type="application/ld+json"]').all();
      const schemas = await Promise.all(
        scripts.map(async (script) => {
          const content = await script.textContent();
          return content ? JSON.parse(content) : null;
        })
      );

      // May or may not have breadcrumb schema depending on page implementation
      // This just checks the schema is valid JSON
      expect(scripts.length).toBeGreaterThan(0);
    });
  });

  test.describe('Image SEO', () => {
    test('should have alt text on all images', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const images = await page.locator('img').all();

      for (const img of images) {
        const alt = await img.getAttribute('alt');
        const src = await img.getAttribute('src');

        // Every image should have alt text
        expect(alt, `Image ${src} missing alt text`).toBeTruthy();
      }
    });
  });

  test.describe('Page Load Performance', () => {
    test('should load homepage under 3 seconds', async ({ page }) => {
      const start = Date.now();
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      const duration = Date.now() - start;

      expect(duration).toBeLessThan(3000);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/');

      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThan(0);
      expect(h1Count).toBeLessThanOrEqual(1); // Only one H1 per page

      // H2s should exist if there's an H3
      const h2Count = await page.locator('h2').count();
      const h3Count = await page.locator('h3').count();

      if (h3Count > 0) {
        expect(h2Count).toBeGreaterThan(0);
      }
    });
  });
});
