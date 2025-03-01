import {expect} from "@playwright/test";

export class ArticlePage{
    constructor(page){
        this.page = page;
        this.articlesPageButton = this.page.getByRole('button', { name: 'Global Feed' }); // страница со статьями
        this.backButton = this.page.locator('a.navbar-brand').filter({ hasText: 'conduit' });
        this.articleDiv = this.page.locator('div.article-preview');
        this.articleSelectLocator = this.page.locator('div.article-preview').filter({ hasText: 'adil ' }); // выбор статьи по имени
        this.commentTextBox = this.page.getByRole('textbox', { name: 'Write a comment...' }); // поле воода коммента
        this.postCommentButton = this.page.getByRole('button', { name: 'Post Comment' }); // кнопка публикации комма
        this.comment = this.page.locator('p.card-text').last(); // выбрать див с комментом
    }
    async commentArticle(articleComment){
        await this.backButton.first().click();
        await this.articlesPageButton.click();
        await this.articleDiv.waitFor({ state: 'attached' });
        await this.articleSelectLocator.first().click();
        await this.commentTextBox.click();
        await this.commentTextBox.fill(articleComment);
        await this.postCommentButton.click();
        await expect(this.comment).toHaveText(articleComment);

        /*await this.page.goto("https://realworld.qa.guru/#/"); // главная
        await this.articlesPageButton.click();
        await this.page.waitForNavigation();
        await this.page.locator('div.article-preview').filter({ hasText: 'adil ' }).first().click();
        await this.commentTextBox.click();
        await this.commentTextBox.fill(articleComment);
        await this.postCommentButton.click();
        await expect(this.comment).toHaveText(articleComment);*/
    }
}