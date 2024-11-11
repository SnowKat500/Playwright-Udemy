import {test, expect} from '@playwright/test';
import CartPage from '../pages/cart.page';
const path = require('path');

test.describe('Upload file tests', () => {
    let cartPage: CartPage;
    const fileName = ['largeFileCat.jpg', 'pokemon_image.png'];

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        await cartPage.navigate();
    })

    for (const name of fileName){
        test(`should upload a ${name} file`, async ({ page }) => {
            // store test file path
            const filePath = path.join(__dirname, `../data/${name}`);
            cartPage.uploadComponent().uploadFile(filePath);
            // assertion
            await expect(cartPage.uploadComponent().successText).toContainText('uploaded successfully');
        });
    }
    
    test.skip('should upload a test file on a hidden input field', async ({ page }) => {
        // store test file path
        const filePath = path.join(__dirname, '../data/pokemon_image.png');
        //DOM manipulation due to hidden file input
       await page.evaluate(() => {
            const selector = document.querySelector('#upfile_1');
            if (selector) {
                selector.className = ''
            }
       });
       cartPage.uploadComponent().uploadFile(filePath);
        // assertion
        await expect(cartPage.uploadComponent().successText).toContainText('uploaded successfully');
    });

    test.skip('should upload a large test file', async ({ page }) => {
        // store test file path
        const filePath = path.join(__dirname, '../data/largeFileCat.jpg');
        cartPage.uploadComponent().uploadFile(filePath);
        // hardcoded await - WRONG WAY
        //await page.waitForTimeout(5000);
        
        //wait for condition
        await (cartPage.uploadComponent().successText)
            .waitFor({ state: 'visible', timeout: 15000});

        // assertion
        await expect(cartPage.uploadComponent().successText).toContainText('uploaded successfully');
    });

    test('should upload a large test file this time with assertion wait', async ({ page }) => {
        // store test file path
        const filePath = path.join(__dirname, '../data/largeFileCat.jpg');
        // upload test file
        cartPage.uploadComponent().uploadFile(filePath);
        // assertion with wait
        await expect(cartPage.uploadComponent().successText).toContainText('uploaded successfully', {timeout: 15000});
    });
})
