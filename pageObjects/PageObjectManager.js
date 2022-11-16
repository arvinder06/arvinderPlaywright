const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage')
const { CheckoutPage } = require('./CheckoutPage')
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');

class PageObjectManager {
    constructor(page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.ordersHistoryPage = new OrdersHistoryPage(page);
        this.ordersReviewPage = new OrdersReviewPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

}
module.exports = { PageObjectManager }