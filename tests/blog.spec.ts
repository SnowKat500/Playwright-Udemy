import {test, expect} from '@playwright/test';
import BlogPage from '../pages/blog.page';

test.describe('blog page tests', () => {
    let blogPage: BlogPage;

test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);
    await blogPage.navigate();
})

    //task go to blog and get length of list of recent posts, 
//then assert that minimum length of each post title is 10 char.
    test('Verify recent posts count and verify length of each list item', async ({ page }) => {
        //loop through the list and assert the char length > 10
        for (const post of await blogPage.recentPosts.elementHandles()) {
            expect(((await post.textContent()).trim()).length).toBeGreaterThan(10);
        }
        // assert char length = 5
        expect(await blogPage.recentPosts.count()).toEqual(5);
    });

})

