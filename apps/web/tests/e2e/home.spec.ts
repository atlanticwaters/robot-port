import { expect, test } from '@playwright/test';

test('homepage renders hero and sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Creative Technologist');
  await expect(page.getByRole('heading', { name: 'Recent engagements' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Case studies' })).toBeVisible();
});
