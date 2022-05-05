const { test, except } = require('@playwright/test')

test.only('TC001_API Testing', ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client')
    //Login
    await page.locator('#userEmail').type('anshika@gmail.com')
    await page.locator('#userPassword').type('Iamking@000')
    await page.locator('#login').click()

    await page.waitForLoadState('networkidle') //This will wait for network layer to be stable
})