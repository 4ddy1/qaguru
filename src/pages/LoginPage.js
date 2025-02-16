export class LoginPage{
    constructor(page){
        this.page = page;
        this.LoginPageLink = this.page.goto("https://realworld.qa.guru/");
        this.loginLink = this.page.getByRole('link', { name: 'Login' }); // кнопка перехода на вход
        this.registerLink = this.page.getByRole('link', { name: 'Sign up' }); // кнопка перехода на регистрацию
        this.usernameTextBox = this.page.getByRole('textbox', { name: 'Your Name' }) // поле воода имени
        this.emailTextBox = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordTextBox = this.page.getByRole('textbox', { name: 'Password' });
        this.signInButton = this.page.getByRole('button', { name: 'Login' });
        this.signUpButton = this.page.getByRole('button', { name: 'Sign up' });
    }
    async signIn(email, password){
        await this.LoginPageLink
        await this.loginLink.click();
        await this.emailTextBox.fill(email);
        await this.passwordTextBox.click();
        await this.passwordTextBox.fill(password);
        await this.signInButton.click();
    }

    async signUp(name, email, password){
        await this.LoginPageLink;
        await this.registerLink.click();
        await this.usernameTextBox.click();
        await this.usernameTextBox.fill(name);
        await this.emailTextBox.click();
        await this.emailTextBox.fill(email);
        await this.passwordTextBox.click();
        await this.passwordTextBox.fill(password);
        await this.signUpButton.click();
    }
}
