import { Page, Locator } from '@playwright/test';

class UploadComponent {
    private page: Page;
    uploadInput: string;
    submitButton: Locator; 
    successText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadInput = 'input#upfile_1';
        this.submitButton = page.locator('#upload_1');
        this.successText = page.locator('#wfu_messageblock_header_1_label_1');  
    }

    async uploadFile(filePath: string){
            // upload test file
            await this.page.setInputFiles(this.uploadInput, filePath);
            // click submit button
            await this.submitButton.click();
    }

}

export default UploadComponent;