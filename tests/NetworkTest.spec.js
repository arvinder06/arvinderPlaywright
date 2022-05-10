const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIutils');

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

test('TC001_Intercep Network Call response', async ({ page }) => {

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

test('TC002_Intercept Network request', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, responseForToken.token);

    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();


    // listen to the URL. Here we are intercepting the request to hit and query the order ID of someone else which the requetng user is not authorised for
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=" + responseForToken.orderID,
        async route => route.continue( //.continue() method will repalce the request URL to the given one
            {
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=627427dee26b7e1a10e9fe43'
            }
        )
    )

    //Click on the first view
    const rows = await page.locator('table tr.ng-star-inserted th[scope]');
    for (let i = 1; i < await rows.count(); i++) {
        let element = await page.locator('table tr.ng-star-inserted th[scope]').nth(i);
        if (await element.textContent() == responseForToken.orderID) {
            await page.locator('table tr button.btn.btn-primary').nth(i).click();
            break;
        }
    }
    expect(await page.locator('p.blink_me').textContent()).toBe('You are not authorize to view this order')
})

test('TC003_Abort the network call', async ({ page }) => { // Can be used to test the servers are down mimic etc

    const userNameLocator = page.locator('input[name=username]');
    const passwordLocator = page.locator('input[name=password]');
    const signinLocator = page.locator('input[name=signin]');
    const loginErrorTextLocator = page.locator("div[style*='display']");
    const cardTitleLocator = page.locator('.card-body a')
    const roleDropDownLocator = page.locator('select.form-control')

    await page.route('**/*.css', route => route.abort())
    page.on('request', request => console.log(request.url())) //this will print all the request made on browser in the console
    page.on('response', response => console.log(response.url(), '   :   ' + response.status())) //this will print the URL and status code for all the responses on network tab
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //Enter Credentials
    await userNameLocator.type("rahulshettyacademy");
    await passwordLocator.fill("learning")
    await signinLocator.click();
    await page.waitForLoadState('networkidle');
})