import {test, expect, APIResponse} from '@playwright/test';
import ContactPage from '../pages/contact.page';
import apiController from '../controller/api.controller';

test.describe('contact page tests', () => {
    let contactPage: ContactPage;
    let randomPerson: APIResponse;

    test.beforeAll(async ({ playwright }) => {
        await apiController.init();
        randomPerson = await apiController.getUsers();
        const newUserTodo = await apiController.createUserTodo();
        console.log(newUserTodo);
    });

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        await contactPage.navigate();
    })
    

    //task: fill in form on contact page and assert submission successful text; 
    test('Fill in Contact form and verify success message', async ({ page }) => {
        await contactPage.submitForm(
            randomPerson['name'],
            randomPerson['email'],
            randomPerson['phone'],
            randomPerson['website']
        );
        
        await expect(contactPage.alertBox).toHaveText("Thanks for contacting us! We will be in touch with you shortly");
    });

})

