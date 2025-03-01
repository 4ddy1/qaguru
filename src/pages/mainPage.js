export class MainPage{
    constructor(page){
        this.page = page
        this.newArticleLink = this.page.getByRole('link', { name: 'New Article' });
        this.articleTitleTextBox = this.page.getByRole('textbox', { name: 'Article Title' });
        this.articleDescriptionTextBox = this.page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleTextTextBox = this.page.getByRole('textbox', { name: 'Write your article (in' });
        this.articleTagTextBox = this.page.getByRole('textbox', { name: 'Enter tags' });
        this.articlePiblishButton = this.page.getByRole('button', { name: 'Publish Article' });
        this.logoutButton = this.page.locator('a.dropdown-item').filter({ hasText: 'Logout' });// кнопка выпадающего меню
    }
    async publishArticle(articleTitle, testDescription, testText, testTag){
        await this.newArticleLink.click();
        await this.articleTitleTextBox.click();
        await this.articleTitleTextBox.fill(articleTitle);
        await this.articleDescriptionTextBox.click();
        await this.articleDescriptionTextBox.fill(testDescription);
        await this.articleTextTextBox.click();
        await this.articleTextTextBox.fill(testText);
        await this.articleTagTextBox.click();
        await this.articleTagTextBox.fill(testTag);
        await this.articlePiblishButton.click();
    }

    async logout(username){
        await this.page.getByText(username).click();
        await this.logoutButton.click();
    }

    async getUserLabel(username){
        return this.userLabel = this.page.getByText(username);
    }
}