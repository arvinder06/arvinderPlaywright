const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIutils');

const createOderPayload = { orders: [{ country: "Australia", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
const loginAPIpayload = { userEmail: "arvinder06@gmail.com", userPassword: "Abcde@12345" };
let response;
// request library is used to Web API testing in playwright

//execute before all the tests (not before each test)
test.beforeAll(async () => {
    //for login from API and inject the token in browser
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginAPIpayload);
    response = await apiUtils.createOrder(createOderPayload)
})

// this block of code will execute before each test
// test.beforeEach(() => {

// })

test('@API TC001_API Testing - Login via API and verify order on UI created via API', async ({ page }) => {

    // to inject the token in brower, playwright does not have any out of the box. We have to use javascript
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token); //here at run time, the token will go into the value and then the value will be stored as token via the javascript

    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle'); //This will wait for network layer to be stable

    await page.locator('button[routerlink="/dashboard/myorders"]').click();

    await page.locator('tbody').waitFor();
    const rows = await page.locator('table tr.ng-star-inserted th[scope]');
    for (let i = 1; i < await rows.count(); i++) {
        let element = await page.locator('table tr.ng-star-inserted th[scope]').nth(i);
        if (await element.textContent() == response.orderID) {
            await page.locator('table tr button.btn.btn-primary').nth(i).click();
            break;
        }
    }
    expect(await page.locator('div.col-text.-main').textContent()).toBe(response.orderID);
})