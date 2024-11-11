import { Page, Locator } from '@playwright/test';

class HomePage {
    private page: Page;
    getStartedButton: Locator;
    headingText: Locator;
    homeLink: Locator;
    searchIcon: Locator;
    navLinks: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.locator('#get-started');
        this.headingText = page.locator('text=Think different. Make different.');
        this.homeLink = page.locator('#zak-primary-menu:has-text("Home")');
        this.searchIcon = page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]');
        this.navLinks = page.locator('#zak-primary-menu .menu-item');
    }

    async navigate() {
        await this.page.goto('/');
    }

    getNavLinksText () {
        return this.navLinks.allTextContents();
    }

}

export default HomePage;