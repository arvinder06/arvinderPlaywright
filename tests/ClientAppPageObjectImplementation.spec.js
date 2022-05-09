const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { CheckoutPage } = require('../pageObjects/CheckoutPage');

//RSA = Rahul Shetty Academy
test.only('TC001_ClientApp_Pages with Neetwrok call_RSA Shopping Website', async ({ page }) => {
    const productName = 'zara coat 3';

    //Login Page
    const loginPage = new LoginPage(page);
    await loginPage.gotoURL('https://rahulshettyacademy.com/client')
    await loginPage.loginViaUI('anshika@gmail.com', 'Iamking@000');

    //Dashboard Page
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.navigateToCart();

    //Checkout Page
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyProductInCart(productName);
    await checkoutPage.clickCheckout();
})