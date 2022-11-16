const { test, expect, request } = require('@playwright/test')
let webcontext;
// when there is a need to store the complete state of a browser (eg cokkies, local storage etc) and inject in a new page, it is easy with playwright
test.describe.configure({ mode: 'parallel' });
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    //Login
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').type('anshika@gmail.com');
    await page.locator('#userPassword').type('Iamking@000');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' }); //this will store the state of the page in json file
    webcontext = await browser.newContext({ storageState: 'state.json' }) //this will inject the above stored state in the context and using this context, you can open as many pages in the various test cases
})

test('@API TC_Store browser state', async () => {
    const page = await webcontext.newPage(); //
    // await page.pause();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    const allProducts = await page.locator('.card-body b').allTextContents();
    console.log(allProducts);
})