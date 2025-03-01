export class UserSettings {
    constructor(page, username){
        this.page = page;
        this.user = this.page.getByText(username);
        this.settingsLink = this.page.getByRole('link', { name: 'Settings' });
        this.passwordTextbox = this.page.getByRole('textbox', { name: 'Password' });
        this.passwordButton = this.page.getByRole('button', { name: 'Update Settings' });
    }

    async updatePassword(newPassword){
        await this.user.click();
        await this.settingsLink.click();
        await this.passwordTextbox.click();
        await this.passwordTextbox.fill(newPassword);
        await this.passwordButton.click();
    }
}
