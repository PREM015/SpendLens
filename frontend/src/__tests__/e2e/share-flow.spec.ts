import { test, expect } from '@playwright/test';

test('share flow loads public audit', async ({ page }) => {
  // Mock token
  await page.goto('/share/test_token_123');
  await expect(page.locator('h1')).toHaveText('AI Spend Audit Results');
});
