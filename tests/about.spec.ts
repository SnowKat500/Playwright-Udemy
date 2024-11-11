import {test, expect} from '@playwright/test'

test.describe('About page', () => {
    test('Open AboutPage and verify title', async ({ page }) => {
        await page.goto('/about');
        await expect(page).toHaveTitle('About – Practice E-Commerce Site');
    });    
});
