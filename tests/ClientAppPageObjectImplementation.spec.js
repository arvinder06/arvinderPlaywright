const { test, expect } = require('@playwright/test');
const { PageObjectManager } = require('../pageObjects/PageObjectManager');


//RSA = Rahul Shetty Academy
test.only('TC001_ClientApp_Pages with Neetwrok call_RSA Shopping Website', async ({ page }) => {
    const productName = 'zara coat 3';
    const pageObectManager = new PageObjectManager(page);

    //Pages
    const loginPage = pageObectManager.getLoginPage();
    const dashboardPage = pageObectManager.getDashboardPage();
    const checkoutPage = pageObectManager.getCheckoutPage();
    const ordersReviewPage = pageObectManager.getOrdersReviewPage();
    const ordersHistoryPage = pageObectManager.getOrdersHistoryPage();

    //Login Page
    // const loginPage = new LoginPage(page);

    await loginPage.gotoURL('https://rahulshettyacademy.com/client')
    await loginPage.loginViaUI('anshika@gmail.com', 'Iamking@000');

    //Dashboard Page
    // const dashboardPage = new DashboardPage(page);
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.navigateToCart();

    //Checkout Page
    // const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyProductInCart(productName);
    await checkoutPage.clickCheckout();

    //Place order
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    //Verify the order
    await dashboardPage.navigateToOrders();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
})