import { test, expect } from '@playwright/test';
import {
    LoginPage,
    MainPage,
    UserSettings
} from '../src/pages/index';
import {
    UserBuilder,
} from "../src/helpers/builder/index";
import 'dotenv/config';
import { fakerRU as faker } from '@faker-js/faker';

test.describe('user settings (создание нового юзера и редактирование его настроек)', async () => {
    const userBuilder = new UserBuilder();
    const user = await userBuilder.build();

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.signUp(user.name, user.email,user.password);
        await page.waitForURL(process.env.MAIN_URL); // без этого тест не работает, стр не успевает загрузиться
    });

    test ('updatePassword', async({page}) => {
        const mainPage = new MainPage(page, user.name);
        const loginPage = new LoginPage(page);
        const updatePassword = new UserSettings(page, user.name);
        const userLabel = await mainPage.getUserLabel(user.name);

        const newPassword = faker.internet.password()
        await updatePassword.updatePassword(newPassword); // установка нового пароля
        await userBuilder.setPassword(newPassword);

        await mainPage.logout(user.name) // проверка входа с новым паролем
        await loginPage.signIn(user.email,user.password);
        await expect(userLabel).toHaveText(user.name);
    });

});