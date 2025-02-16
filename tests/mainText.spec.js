import { test, expect } from '@playwright/test';
import {
    LoginPage,
    MainPage,
    ArticlePage,
} from '../src/pages/index';
import {
    ArticleBuilder
} from "../src/helpers/builder/index";
import 'dotenv/config';
import { fakerRU as faker } from '@faker-js/faker';

test.describe.serial('main', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.signIn(process.env.EMAIL, process.env.PASSWORD)

        await expect(page).toHaveURL(process.env.MAIN_URL);
    });

    test('publish article', async ({ page }) => {
        const mainPage = new MainPage(page)
        const articleBuilder = new ArticleBuilder()
        const article = await articleBuilder.build(); // сбилдить статью для публикации

        await mainPage.publishArticle(article.title, article.description, article.text, article.tag)

    });

    test('comment article', async({page}) => {
        const articlePage = new ArticlePage(page);
        const articleComment = faker.lorem.sentence(5);

        await articlePage.commentArticle(articleComment);
    })

  });