export class LoginPage{
    constructor(page){
        this.page = page;
        this.LoginPageLink = this.page.goto("https://realworld.qa.guru/");
        this.loginLink = this.page.getByRole('link', { name: 'Login' });
        this.emailTextBox = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordTextBox = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }
    async signIn(email, password){
        await this.LoginPageLink
        await this.loginLink.click();
        await this.emailTextBox.fill(email);
        await this.passwordTextBox.click();
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
    }
}
