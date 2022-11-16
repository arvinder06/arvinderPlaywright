const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' }); // this will run all the tests cases in parallel with in this file

// test.describe.configure({ mode: 'serial' }); // This will make sure the tests will run on serial. from TC001 onwards. Moreover, when the one test fails the following tests will be skipped.
//Use above when the one tests have dependency on the previous test

test('@Web TC_001-Pop up validations', async ({ page }) => { //tag used here

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://www.google.com');

    // // Navigation methods on the same page
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible(); // assert the visibility of an element
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden(); // assert the invisibility of an element

    // handle Java pop ups/dialog where the page will be blocked until the pop up is gone and cannot spy the pop up
    page.on('dialog', dialog => dialog.accept()); //this is a listner step which always listen to dialogs
    await page.locator('#alertbtn').click();

    // page.on('dialog', dialog => dialog.dismiss());
    // await page.locator('#alertbtn').click();

    // Mouse hover
    await page.locator('#mousehover').hover();
})

test('TC002_iFrame handeling', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    const framePage = page.frameLocator('#courses-iframe');
    await page.locator('//legend[text()="iFrame Example"]').click();
    await framePage.locator('li a[href="lifetime-access"]:visible').click(); //playwright will focus on the only visible locator among multiple locators with same locator
    expect(await framePage.locator('span[style="color: #ec5252;"]').textContent()).toBe('13,522');
})

test('@Web TC003_Manual Screenshot', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({ path: 'objectLevelScreenshot.png' }) //manually take screenshot of the particular test
    await page.locator('#hide-textbox').click();
    await page.screenshot({ path: 'screenshot.png' }) //manually take screenshot of the whole page
    await expect(page.locator('#displayed-text')).toBeHidden();

})

test('TC004_Visual Automation testing', async ({ page }) => {
    // await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.locator('#hide-textbox').click();

    await page.goto('https://www.google.com');
    expect(await page.screenshot()).toMatchSnapshot('screenshot.png')
})