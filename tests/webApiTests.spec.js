const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIutils');

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

test.only('TC001_API Testing - Grab API response', async ({ page }) => {

    // to inject the token in brower, playwright does not have any out of the box. We have to use javascript
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token); //here at run time, the token will go into the value and then the value will be stored as token via the javascript

    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle'); //This will wait for network layer to be stable


})