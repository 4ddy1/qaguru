import { test, expect } from '@playwright/test';
const {LoginPage, PublishArticle, CommentArticle, UpdatePassword} = require('../src/pages/LoginPage')

test.describe.serial('qaGuru', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        await loginPage.signIn("adil_15-05@mail.ru", "adil46589")
    
        await expect(page).toHaveURL('https://realworld.qa.guru/#/');
    });
  
    test('publish article', async ({ page }) => {
        const loginPage = new PublishArticle(page)
        const articleTitle = "testadil"
        await loginPage.publishArticle(articleTitle, "testDescription", "testTex", "testTag")

    });

    test('comment article', async({page}) => {
        const loginPage = new CommentArticle(page)
        await loginPage.commentArticle("testadil", "test comment1")
        await page
            .locator('.card-text', { hasText: 'test comment1' }) // CSS-класс + текст
            .first() // Явно берем первый элемент
            .click();

        await expect(page.locator('.card-text', { hasText: 'test comment' }).first())
            .toHaveText('test comment1');
    })

    test ('updatePassword', async({page}) => {
        const updatePassword = new UpdatePassword(page)
        await updatePassword.updatePassword('newpassword123')
    })
  });