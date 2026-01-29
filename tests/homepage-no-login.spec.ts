import {expect, test} from '@playwright/test';

const expectedTitle = 'Energy Co-op User Dashboard';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('titles are correct', async ({ page }) => {
  await expect(page).toHaveTitle(expectedTitle);
});

test.describe('Header', () => {
  test('to exist', async ({ page }) => {
    const header = page.locator('section#header');

    await expect(header).toBeVisible();
  });

  test('to have title', async ({ page }) => {
    const title = page.locator('section#header>div', { hasText: expectedTitle });

    await expect(title).toBeVisible();
  });

  test('to be the correct colour', async ({ page }) => {
    const title = page.locator('section#header');

    await expect(title).toHaveCSS('background-color', 'rgb(12, 125, 157)');
  });

  test('to have pointer cursor', async ({ page }) => {
    const title = page.locator('section#header>div');

    await expect(title).toHaveCSS('cursor', 'pointer');
  });

  test('link to home to work', async ({ page }) => {
    const title = page.locator('section#header>div');

    await title.click();

    expect(page.url()).toContain('/');
  });
});

test.describe('Nav Bar', () => {
  test('to exist', async ({ page }) => {
    const navbar = page.locator('div.pill-group');

    await expect(navbar).toBeVisible();
  });
});

test.describe('Social Links', () => {
  test('to exist', async ({ page }) => {
    const socialLinks = page.locator('div.social-links');

    await expect(socialLinks).toBeVisible();
  });

  test('to have GitHub', async ({ page }) => {
    const link = page.locator('[href*="https://github.com/Energy-Co-op/Energy-Co-op-UI"]');

    await expect(link).toBeVisible();
  });

  test('to have Contact Us', async ({ page }) => {
    const link = page.locator('[href*="mailto:coopemail@coop.com"]');

    expect(link).toBeTruthy();
  });
});

test.describe('Content', () => {
  test('to exist', async ({ page }) => {
    const contentArea = page.locator('section#right-side');

    await expect(contentArea).toBeVisible();
  });

  test('to have title', async ({ page }) => {
    const title = page.locator('app-home>h1', { hasText: expectedTitle });

    await expect(title).toBeVisible();
  });

  test('energy mix graph to exist', async({ page }) => {
    const canvas = page.locator('#energyMixChart>canvas');

    await expect(canvas).toBeVisible();
  });
});
