import { Page, Locator } from '@playwright/test';

class ContactPage {
    private page: Page;
    nameInput: Locator;
    emailInput: Locator;
    phoneInput: Locator;
    messageTextArea: Locator;
    submitButton: Locator;
    alertBox: Locator;


    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.getByLabel('Name *');
        this.emailInput = page.getByLabel('Email *');
        this.phoneInput = page.getByLabel('Phone *');
        this.messageTextArea = page.getByRole('textbox', { name: 'Message'});
        this.submitButton = page.getByRole('button', { name: 'Submit'});
        this.alertBox = page.getByRole('alert');
        
    }

    async navigate() {
        await this.page.goto('/contact');
    }

    async submitForm(name: string, email: string, phone: string, message:string ){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
        await this.messageTextArea.fill(message);
        await this.page.waitForTimeout(5000);
        await this.submitButton.click();
    }

}

export default ContactPage;