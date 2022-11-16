class LoginPage {

    constructor(page) {
        this.page = page
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.signInButton = page.locator('#login');
    }

    /**
     * To go to any fiven URL
     * 
     * @param {String} url 
     */
    async gotoURL(url) {
        await this.page.goto(url);
    }

    /**
     * To login with valid credentials via UI
     * @param {String} username 
     * @param {String} password 
     */
    async loginViaUI(username, password) {
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle')
    }
}
module.exports = { LoginPage };