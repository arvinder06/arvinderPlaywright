const { test, expect, request } = require('@playwright/test')
let token;
let orderID;
// request library is used to Web API testing in playwright

//execute before all the tests (not before each test)
test.beforeAll(async () => {
    //for login from API and inject the token in browser
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: {
                userEmail: "arvinder06@gmail.com",
                userPassword: "Abcde@12345"
            }
        }
    )
    expect(loginResponse.ok()).toBeTruthy(); //playwright function to check response 200 and retun true
    const loginResponseJsonBody = await loginResponse.json();
    token = await loginResponseJsonBody.token;
    console.log(token);

    //Create order API
    const createOrderAPIResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: {
                orders: [
                    { country: "Australia", productOrderedId: "6262e95ae26b7e1a10e89bf0" }
                ]
            },
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    )
    expect(createOrderAPIResponse.ok()).toBeTruthy();
    const createOderJsonBody = await createOrderAPIResponse.json();
    console.log(createOderJsonBody)
    orderID = createOderJsonBody.orders[0];
    console.log('Oder ID created: ' + orderID);
})

// this block of code will execute before each test
test.beforeEach(() => {

})

test.only('TC001_API Testing - Grab API response', async ({ page }) => {

    // to inject the token in brower, playwright does not have any out of the box. We have to use javascript
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token); //here at run time, the token will go into the value and then the value will be stored as token via the javascript

    await page.goto('https://rahulshettyacademy.com/client');
    // await page.pause();
    await page.waitForLoadState('networkidle'); //This will wait for network layer to be stable
})