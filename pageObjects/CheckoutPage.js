const { expect } = require("@playwright/test");

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.allProductsInCart = page.locator('div.cart ul li');
        this.checkoutButton = page.locator('div[class*=subtotal] [type="button"]');
    }

    /**
     * To Verify that the product is avilable in the checkout cart
     * @param {String} productname 
     */
    async verifyProductInCart(productname) {

        await this.allProductsInCart.first().waitFor();
        const isProductAvailable = await this.allProductsInCart.locator("h3:has-text('" + productname + "')")
        expect(await isProductAvailable).toBeTruthy();


        // for (let i = 0; i < countProductsInCart; i++) {
        //     console.log(await this.allProductsInCart.nth(i).locator('h3').textContent());

        //     if (await this.allProductsInCart.nth(i).locator('h3').textContent() == productname) {
        //         isProductAvailable = true;
        //         break;
        //     }
        // }
    }

    async clickCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { CheckoutPage }