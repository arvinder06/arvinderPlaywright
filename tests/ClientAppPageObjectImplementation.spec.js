const { test, expect } = require('@playwright/test');
const { PageObjectManager } = require('../pageObjects/PageObjectManager');
const dataSet = JSON.parse(JSON.stringify(require('../test-data/placeOrderTestData.json'))) // JSON FIle --> String --> JS Object to traverse easily

//RSA = Rahul Shetty Academy
test.only('TC001_ClientApp_Pages with Neetwrok call_RSA Shopping Website', async ({ page }) => {
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
    await loginPage.loginViaUI(dataSet.userName, dataSet.password);

    //Dashboard Page
    // const dashboardPage = new DashboardPage(page);
    await dashboardPage.addProductToCart(dataSet.productName);
    await dashboardPage.navigateToCart();

    //Checkout Page
    // const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyProductInCart(dataSet.productName);
    await checkoutPage.clickCheckout();

    //Place order
    await ordersReviewPage.searchCountryAndSelect(dataSet.countryCode, dataSet.countryName);
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    //Verify the order
    await dashboardPage.navigateToOrders();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
})