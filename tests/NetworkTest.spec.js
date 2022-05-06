const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIutils');

const createOderPayload = { orders: [{ country: "Australia", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] };
const loginAPIpayload = { userEmail: "arvinder06@gmail.com", userPassword: "Abcde@12345" };
let responseForToken;
const fakeNullOrderBody = { data: [], message: "No Orders" }
// request library is used to Web API testing in playwright

//execute before all the tests (not before each test)
test.beforeAll(async () => {
    //for login from API and inject the token in browser
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginAPIpayload);
    responseForToken = await apiUtils.createOrder(createOderPayload)
})

// this block of code will execute before each test
// test.beforeEach(() => {

// })

test.only('TC001_Intercep Network Call', async ({ page }) => {

    // to inject the token in brower, playwright does not have any out of the box. We have to use javascript
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, responseForToken.token); //here at run time, the token will go into the value and then the value will be stored as token via the javascript

    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle'); //This will wait for network layer to be stable

    //intercept the request here
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6273794be26b7e1a10e9df73",
        async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeNullOrderBody);
            route.fulfill(
                {
                    response,
                    body,
                }
            );
        }
    );

    // await page.pause();
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.waitForLoadState('networkidle');

    let noOrderTextUI;

    // This will poll the object and wait for 10 sec to element change the text as expected. PLease see https://playwright.dev/docs/test-assertions#polling
    await expect.poll(async () => {
        noOrderTextUI = await page.locator('div.mt-4.ng-star-inserted').textContent();
        return noOrderTextUI;
    },
        {
            message: 'Polling to test the no order message on screen',
            timeout: 10000
        }).toContain('You have No Orders to show at this time.')
})