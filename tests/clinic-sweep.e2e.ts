import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

const base = (process.env.APP_URL ?? 'http://localhost:8624').replace(/\/+$/, '');
const targetHost = new URL(base).hostname;
const sitemapPath = process.env.SWEEP_SITEMAP ?? '/post-sitemap1.xml';
const articlePath = process.env.SWEEP_ARTICLE ?? '/blogs/lost-clear-aligner-while-away/';
const notFoundPath = process.env.SWEEP_404 ?? '/blogs/not-a-real-article-sweep-404/';

test('sitemap lists the article and an unknown path returns 404', async () => {
  const sitemap = await fetch(`${base}${sitemapPath}`);
  expect(sitemap.status).toBe(200);
  const xml = await sitemap.text();
  const locs = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1].trim());
  expect(locs.length).toBeGreaterThan(0);
  expect(locs.some((loc) => new URL(loc).pathname === articlePath)).toBe(true);

  const notFound = await fetch(`${base}${notFoundPath}`, { redirect: 'manual' });
  expect(notFound.status).toBe(404);
});

test('one article page renders with the read-only host guard active', async ({ app, browser }) => {
  const decisions: Array<{ url: string; method: string; allowed: boolean }> = [];
  await browser.route('**/*', async (route) => {
    const u = new URL(route.request.url);
    const allowed = route.request.method === 'GET' && (
      u.hostname === targetHost ||
      (u.hostname === 'fonts.googleapis.com' && u.pathname.startsWith('/css')) ||
      (u.hostname === 'fonts.gstatic.com' && /\.(woff2?|ttf)$/.test(u.pathname)) ||
      (u.hostname === 'cdnjs.cloudflare.com' && /^\/ajax\/libs\/(jquery|slick-carousel)\//.test(u.pathname) && /\.(js|css)$/.test(u.pathname))
    );
    decisions.push({ url: route.request.url, method: route.request.method, allowed });
    if (allowed) await route.continue();
    else await route.abort();
  });

  await app.open(articlePath);
  await expect(browser.locator('h1')).toHaveCount(1);
  await expect(browser.locator('h1')).toBeVisible();

  const pageState = await browser.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    width: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(pageState.h1.length).toBeGreaterThan(0);
  expect(pageState.canonical.length).toBeGreaterThan(0);
  expect(new URL(pageState.canonical, base).pathname).toBe(articlePath);
  expect(pageState.scrollWidth).toBeLessThanOrEqual(pageState.width);

  await browser.evaluate(async () => {
    await Promise.all([
      fetch('/__readonly_probe', { method: 'POST' }).catch(() => null),
      fetch('https://www.google-analytics.com/g/collect?sweep=guard-probe').catch(() => null),
    ]);
    return true;
  });
  expect(decisions.some((d) => d.method === 'POST' && !d.allowed)).toBe(true);
  expect(decisions.some((d) => d.url.includes('sweep=guard-probe') && !d.allowed)).toBe(true);
});
