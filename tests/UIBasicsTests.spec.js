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
test.only('TC002_Test with default context Rahul Shetty Academy', async ({ page }) => {

    // Locators
    const userNameLocator = page.locator('input[name=username]');
    const passwordLocator = page.locator('input[name=password]');
    const signinLocator = page.locator('input[name=signin]');
    const loginErrorTextLocator = page.locator("div[style*='display']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //Enter Credentials
    await userNameLocator.type("rahulshettyacademy");
    await passwordLocator.type("learningsss");

    await signinLocator.click();

    //Get error message from page

    console.log(await loginErrorTextLocator.textContent()); //this is like gettext() in selenium
    await expect(loginErrorTextLocator).toContainText('Incorrect'); //To Contain Text in locator
    await page.waitForTimeout(5000)
    //To clear a text box and type in the vaule again
    await passwordLocator.fill("")
    await passwordLocator.fill("learning") // Here fill() will act same as type()

    await Promise.all(
        [
            page.waitForNavigation(),
            signinLocator.click(),
        ]
    );

    // await page.waitForTimeout(5000) // For har coded wait

    // Multiple objects handeling
    const cardTitleLocator = await page.locator('.card-body a')
    // console.log(await cardTitleLocator.nth(0).textContent()) //this will only print the first element text and test will not fail
    // console.log(await cardTitleLocator.first().textContent()) //same purpose as above
    // console.log(await cardTitleLocator.nth(1).textContent()) // seconds element's text
    // console.log(await cardTitleLocator.last().textContent()) //value of the last element in the element array

    // print text for all the element in the elements array
    const allTitles = await cardTitleLocator.allTextContents()  // .allTextContents() will not wait like .textContent() and will return the 0 elements array values. Hence get the textContent of first element before using the all
    expect(allTitles.length).toBeGreaterThan(0);
    console.log(allTitles)

    //To overcome the above problem without using the .first element we can do it with wait
    // await page.waitForLoadState('networkidle') //this will wait until the network finishes all the call and get the data. Please see TC001_ClientApp

    // else if no network layer please Promise for waitForNavigation is used before clicking

})
