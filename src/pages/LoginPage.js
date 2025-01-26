import { test, expect } from '@playwright/test';

class LoginPage{
    constructor(page){
        this.page = page;
    }
    async signIn(email, password){
        await this.page.goto("https://realworld.qa.guru/");
        await this.page.getByRole('link', { name: 'Login' }).click();
        await this.page.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
};

class PublishArticle{
    constructor(page){
        this.page = page
    }
    async publishArticle(articleTitle, testDescription, testTex, testTag){
        await this.page.getByRole('link', { name: 'New Article' }).click();
        await this.page.getByRole('textbox', { name: 'Article Title' }).click();
        await this.page.getByRole('textbox', { name: 'Article Title' }).fill(articleTitle);
        await this.page.getByRole('textbox', { name: 'What\'s this article about?' }).click();
        await this.page.getByRole('textbox', { name: 'What\'s this article about?' }).fill(testDescription);
        await this.page.getByRole('textbox', { name: 'Write your article (in' }).click();
        await this.page.getByRole('textbox', { name: 'Write your article (in' }).fill(testTex);
        await this.page.getByRole('textbox', { name: 'Enter tags' }).click();
        await this.page.getByRole('textbox', { name: 'Enter tags' }).fill(testTag);
        await this.page.getByRole('button', { name: 'Publish Article' }).click();
    }
};

class CommentArticle{
    constructor(page){
        this.page = page
    }
    async commentArticle(articleTitle, comment){
        await this.page.goto(`https://realworld.qa.guru/#/article/${articleTitle}`);
        await this.page.getByRole('textbox', { name: 'Write a comment...' }).click();
        await this.page.getByRole('textbox', { name: 'Write a comment...' }).fill(comment);
        await this.page.getByRole('button', { name: 'Post Comment' }).click();
    }
};

class UpdatePassword{
    constructor(page){
        this.page = page
    }
    async updatePassword(newPassword){
        await this.page.getByText('adil').click();
        await this.page.getByRole('link', { name: 'Settings' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(newPassword);
        await this.page.getByRole('button', { name: 'Update Settings' }).click();
    }
};

module.exports = { LoginPage, PublishArticle, CommentArticle, UpdatePassword };