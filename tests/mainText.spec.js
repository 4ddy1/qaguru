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
import {kebabCase} from "lodash";
import slugify from "slugify"; // штука для slugify (формат в который строка преобразовывается в url)

test.describe.serial('main', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.signIn(process.env.EMAIL, process.env.PASSWORD)
        await page.waitForURL(process.env.MAIN_URL); // без этого тест не работает, стр не успевает загрузиться
    });

    test('publish article', async ({ page }) => {
        const mainPage = new MainPage(page);
        const articleBuilder = new ArticleBuilder();
        const article = await articleBuilder.build(); // сбилдить статью для публикации
        const slug = slugify(article.title, {
            replacement: '-',    // Замена для пробелов и невалидных символов
            lower: true,         // Преобразование в нижний регистр
            strict: true,         // Удаление символов, не соответствующих [a-zA-Z0-9 -_]
            trim: false            // удаление последнего символа
        });

        await mainPage.publishArticle(article.title, article.description, article.text, article.tag);
        console.log(slug); // пришлось городить параметры к методу slug, т.к. целевой сайт использует не дефолтные значения (повторения тире, преобразование точки на конце и тд)
        await expect(page).toHaveURL(`${process.env.MAIN_URL}article/${slug}`);
    });

    test('comment article', async({page}) => {
        const mainPage = new MainPage(page)
        const articleBuilder = new ArticleBuilder()
        const article = await articleBuilder.build(); // сбилдить статью для публикации
        const articlePage = new ArticlePage(page);
        const articleComment = faker.lorem.sentence(5);

        //await mainPage.publishArticle(article.title, article.description, article.text, article.tag) // опубликовать статью для комментирования

        await articlePage.commentArticle(articleComment);
        await expect(articlePage.comment).toHaveText(articleComment);
    })

  });