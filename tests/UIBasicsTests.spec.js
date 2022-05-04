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
test('TC002_Test with default context Rahul Shetty Academy', async ({ page }) => {

    // Locators
    const userNameLocator = page.locator('input[name=username]');
    const passwordLocator = page.locator('input[name=password]');
    const signinLocator = page.locator('input[name=signin]');
    const loginErrorTextLocator = page.locator("div[style*='display']");
    const cardTitleLocator = page.locator('.card-body a')
    const roleDropDownLocator = page.locator('select.form-control')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //Enter Credentials
    await userNameLocator.type("rahulshettyacademy");
    await passwordLocator.type("learningsss");

    await signinLocator.click();

    //Get error message from page

    console.log(await loginErrorTextLocator.textContent()); //this is like gettext() in selenium
    await expect(loginErrorTextLocator).toContainText('Incorrect'); //To Contain Text in locator
    // await page.waitForTimeout(5000)
    //To clear a text box and type in the vaule again
    await passwordLocator.fill("")
    await passwordLocator.fill("learning") // Here fill() will act same as type()

    // await Promise.all(
    //     [
    //         page.waitForNavigation(),
    //         signinLocator.click(),
    //     ]
    // );

    signinLocator.click()

    // await page.waitForTimeout(5000) // For har coded wait

    // Multiple objects handeling

    console.log(await cardTitleLocator.nth(0).textContent()) //this will only print the first element text and test will not fail
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

test('TC003_UI Controls', async ({ page }) => {
    // Locators
    const userNameLocator = page.locator('input[name=username]');
    const passwordLocator = page.locator('input[name=password]');
    const signinLocator = page.locator('input[name=signin]');
    const loginErrorTextLocator = page.locator("div[style*='display']");
    const cardTitleLocator = page.locator('.card-body a')
    const roleDropDownLocator = page.locator('select.form-control')
    const radioUserLocator = page.locator('[value="user"]')
    const okayButtonPopUpLocator = page.locator('#okayBtn')
    const acceptTermsCheckBox = page.locator('#terms')
    const documentBlinkingLink = page.locator('a[href*=documents-request]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //Fill in login details
    // await page.pause()
    await userNameLocator.type("rahulshettyacademy");
    await passwordLocator.type("learning");
    await roleDropDownLocator.selectOption("teach"); // give value property of the option

    await radioUserLocator.click(); //Radio button
    await okayButtonPopUpLocator.click();
    await expect(radioUserLocator).toBeChecked();//assert that the radio button is selected successfully
    // await page.pause(); //This will open the Playwright Inspector debug mode
    await acceptTermsCheckBox.click()
    await expect(acceptTermsCheckBox).toBeChecked();
    await acceptTermsCheckBox.uncheck(); //unckeck out of the box from playwright
    expect(await acceptTermsCheckBox.isChecked()).toBeFalsy(); // Check the false value. await is inside the expect becaus the action is performed inside the bracket.

    // Validating the object attributes/properties
    await expect(documentBlinkingLink).toHaveAttribute('class', 'blinkingText');
    await signinLocator.click();
})

test('TC004_Handeling child window/tab', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();


    const documentBlinkingLink = page.locator('a[href*=documents-request]');
    const userNameLocator = page.locator('input[name=username]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');


    //Tell playwright that click the button will open the new page event

    const [newPage] = await Promise.all([ // if 2 child windows then add const [newPage,newPage2 ] = await Promise.all([
        context.waitForEvent('page'),
        documentBlinkingLink.click(), //a new tab will open with this
    ])

    let redText = await newPage.locator('div.col-md-6.text-left').textContent();
    console.log(redText);
    expect(redText).toContain('World class Tutorials on Selenium')
    await userNameLocator.type('backToOriginalPage')

    //to start the test in debug mode, give npx playwright test --debug. This will open inspector from very first step of the test case

    //codegen command for record and playback tests - npx playwright codegen https://www.google.com
})