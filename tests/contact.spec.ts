import {test, expect} from '@playwright/test';
import ContactPage from '../pages/contact.page';
import { faker } from '@faker-js/faker';

test.describe('contact page tests', () => {
    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        await contactPage.navigate();
    })
    

    //task: fill in form on contact page and assert submission successful text; 
    test('Fill in Contact form and verify success message', async ({ page }) => {
        await contactPage.submitForm(faker.person.fullName(), faker.internet.email(), faker.phone.number(), faker.lorem.paragraphs(2));
        await expect(contactPage.alertBox).toHaveText("Thanks for contacting us! We will be in touch with you shortly");
    });

})

