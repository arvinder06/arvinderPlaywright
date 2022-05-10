class DashboardPage {
    constructor(page) {
        this.page = page;
        this.allProducts = page.locator('.card-body');
        this.allProductsText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*=cart]');
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    /**
     * To add the product to the cart directly from the product
     * @param {String} productName 
     */
    async addProductToCart(productName) {
        const count = await this.allProducts.count();
        for (let i = 0; i < count; i++) {
            if (await this.allProducts.nth(i).locator("b").textContent() == productName) {
                await this.allProducts.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * To Navigate to the cart
     */
    async navigateToCart() {
        await this.cart.dispatchEvent('click')
        await this.page.waitForLoadState('networkidle');
    }

    async navigateToOrders() {
        await this.orders.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { DashboardPage }