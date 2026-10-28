import { test, expect } from '@playwright/test';

test('Fallout 4 wiki: text, search form, navigation', async ({ page }) => {
  await page.goto('https://ru.wikipedia.org/wiki/Fallout_4');
  await expect(page.locator('#firstHeading')).toContainText('Fallout 4');
  await expect(page.getByText('Bethesda Game Studios').first()).toBeVisible();

  const searchInput = page.getByRole('searchbox', { name: 'Искать в Википедии' });
  await expect(searchInput).toBeVisible();
  await searchInput.fill('Skyrim');
  await searchInput.press('Enter');

  await expect(page).toHaveURL(/\/wiki\//);
  await expect(page.locator('#firstHeading')).toBeVisible();

  await page.getByRole('link', { name: 'Bethesda Game Studios' }).first().click();
  await expect(page).toHaveURL(/\/wiki\//);
  await expect(page.locator('#firstHeading')).toBeVisible();
});