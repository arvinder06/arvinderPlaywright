const { test, expect } = require('@playwright/test');

// test('First PlayWright Test', async ({ browser, page }) => { //'{}' is required so that compiler knows that browser is a playwright fixture
test('TC001_First PlayWright Test with manual context', async ({ browser }) => {
    //async have to be there when we are using await in the function
    //becuase the Javascript is async programming laguage, we have to add await with each step to execute the steps in sequence.
    //Fixtures are nothing but global variables available thoughout the project 

    const context = await browser.newContext(); //like a fresh browser. Like chrome capabilities in selenium
    const page = await context.newPage(); //To open a page like we open a tab in a browser
    await page.goto('https://www.google.com/');
    console.log(await page.title)
    await expect(page).toHaveTitle("Google")
});

//only this test will run with test.only, very useful in developing one test and running only that one
test.only('TC002_Test with default context', async ({ page }) => {
    const userNameLocator = page.locator('input[name=username]');
    const passwordLocator = page.locator('input[name=password]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //Enter Credentials
    await userNameLocator.type("rahulshetty");
    await passwordLocator.type("learning");
    await page.locator('input[name=signin]').click();

    //Get error message from page

    console.log(await page.locator("div[style*='display']").textContent()); //this is like gettext() in selenium
    await expect(page.locator("div[style*='display']")).toContainText('Incorrect'); //To Contain Text in locator

    //To clear a text box and type in the vaule again
    await passwordLocator.fill("")
    await passwordLocator.fill("learning2") // Here fill() will act same as type()
})