import {test, expect} from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home page', () => {
    let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
})

    test.skip('Open HomePage and verify title', async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
        expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
    });    

    test('Click get started button using CSS selector', async ({ page }) => {
        await expect(page).not.toHaveURL(/.*#get-started/); 
        //await page.locator('#get-started').click();
        await homePage.getStartedButton.click();
        await expect(page).toHaveURL(/.*#get-farted/);
        
    }); 

    test('Verify heading text is visible using text selector', async ({ page }) => {
        //const headingText = page.locator('text=Think different. Make different.'); 
        const headingText = homePage.headingText;
        await expect (headingText).toBeVisible();
    })
    
    test('Verify menu home link is enabled using text and CSS selector', async ({ page }) => {
        //const homeText = await page.locator('#zak-primary-menu >>text=Home'); 
        //const homeText = page.locator('#zak-primary-menu:has-text("Home")');
        const homeText = homePage.homeLink;
        await expect (homeText).toBeEnabled();
    });

    test('Verify search icon is visible using xpath selector', async ({ page }) => {
        //const searchIcon = page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]');
        const searchIcon = homePage.searchIcon;
        await expect (searchIcon).toBeVisible();
    });

    test('Verify the text for all nav links', async ({ page }) => {
        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account"
        ];
        expect(await homePage.getNavLinksText()).toEqual(expectedLinks);
    });

    test('Verify the text of the 4th nav link', async ({ page }) => {
        const expectedLinks = [
            "Home",
            "About",
            "Shop",
            "Blog",
            "Contact",
            "My account"
        ];
        const navLinks = homePage.navLinks.nth(3);
        expect(await navLinks.textContent()).toEqual(expectedLinks[3]);
    });

    test('Verify the text of the 4th nav link is blog', async ({ page }) => {
        const navLinks = homePage.navLinks.nth(3);
        expect(await navLinks.textContent()).toEqual("Blog");
    });

    // "for of" loop, for printing out the list of nav links:
/*     test('Print out the nav links', async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigate();
        const navLinks = page.locator('#zak-primary-menu .menu-item');
        for (const navItem of await navLinks.elementHandles()) {
         console.log(await navItem.textContent());   
        }
    });
 */
});
