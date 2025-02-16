import { test, expect } from '@playwright/test';
import {
    LoginPage,
    MainPage,
    ArticlePage,
    UserSettings
} from '../src/pages/index';
import 'dotenv/config';
import { fakerRU as faker } from '@faker-js/faker';

test.describe.serial('qaGuru', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)

        await loginPage.signIn(process.env.EMAIL, process.env.PASSWORD)

        await expect(page).toHaveURL(process.env.MAIN_URL);
    });

    test('publish article', async ({ page }) => {
        const mainPage = new MainPage(page)

        const articleTitle = `adil - ${faker.lorem.sentence(2)}`
        const articleDescription = faker.lorem.sentence(5);
        const articleText = faker.lorem.paragraph(5);
        const articleTag = faker.lorem.word();

        await mainPage.publishArticle(articleTitle, articleDescription, articleText, articleTag)

    });

    test('comment article', async({page}) => {
        const articlePage = new ArticlePage(page);
        const articleComment = faker.lorem.sentence(5);

        await articlePage.commentArticle(articleComment);
    })

    test ('updatePassword', async({page}) => {
        const updatePassword = new UserSettings(page);

        await updatePassword.updatePassword("newpassword123");
    })
  });