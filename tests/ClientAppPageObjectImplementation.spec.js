const { test, expect } = require('@playwright/test');
const { PageObjectManager } = require('../pageObjects/PageObjectManager');
const dataSet = JSON.parse(JSON.stringify(require('../test-data/placeOrderTestData.json'))) // JSON FIle --> String --> JS Object to traverse easily
const { customTest } = require('../Fixtures/baseTest')

for (const data of dataSet) { //this is to run the same test for different set of data from json
    test(`TC001_ClientApp_Pages with Neetwrok call_RSA Shopping Website for product ${data.productName}`, async ({ page }) => { // The test name should be unique else playwright will throw error
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
        await loginPage.loginViaUI(data.userName, data.password);

        //Dashboard Page
        // const dashboardPage = new DashboardPage(page);
        await dashboardPage.addProductToCart(data.productName);
        await dashboardPage.navigateToCart();

        //Checkout Page
        // const checkoutPage = new CheckoutPage(page);
        await checkoutPage.verifyProductInCart(data.productName);
        await checkoutPage.clickCheckout();

        //Place order
        await ordersReviewPage.searchCountryAndSelect(data.countryCode, data.countryName);
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        //Verify the order
        await dashboardPage.navigateToOrders();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    })
}

customTest('TC_Customer test by extending the base object', async ({ page, testDataForAdidas }) => {
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
    await loginPage.loginViaUI(testDataForAdidas.userName, testDataForAdidas.password);

    //Dashboard Page
    // const dashboardPage = new DashboardPage(page);
    await dashboardPage.addProductToCart(testDataForAdidas.productName);
    await dashboardPage.navigateToCart();

    //Checkout Page
    // const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyProductInCart(testDataForAdidas.productName);
    await checkoutPage.clickCheckout();

    //Place order
    await ordersReviewPage.searchCountryAndSelect(testDataForAdidas.countryCode, testDataForAdidas.countryName);
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    //Verify the order
    await dashboardPage.navigateToOrders();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})