const { test, expect, request } = require('@playwright/test')
const loginCredentials = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
let token;
// request library is used to Web API testing in playwright

//execute before all the tests (not before each test)
test.beforeAll(async () => {
    //for login from API and inject the token in browser
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginCredentials
        }
    )
    expect(loginResponse.ok()).toBeTruthy(); //playwright function to check response 200 and retun true
    const loginResponseJsonBody = await loginResponse.json();
    token = await loginResponseJsonBody.token;
    console.log(token);
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
    await page.pause();
    await page.waitForLoadState('networkidle'); //This will wait for network layer to be stable
})