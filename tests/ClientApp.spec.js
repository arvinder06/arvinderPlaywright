const { test, expect } = require('@playwright/test');

//RSA = Rahul Shetty Academy
test('TC001_ClientApp_Pages with Neetwrok call_RSA Shopping Website', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client')

    //Login
    await page.locator('#userEmail').type('anshika@gmail.com')
    await page.locator('#userPassword').type('Iamking@000')
    await page.locator('#login').click()

    await page.waitForLoadState('networkidle') //This will wait for network layer to be stable
    const allProducts = await page.locator('.card-body b').allTextContents()
    console.log(allProducts)
})