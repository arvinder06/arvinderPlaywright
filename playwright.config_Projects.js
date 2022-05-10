// This is like a test runner in Selenium
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests', //Test specs directory
  timeout: 30 * 1000, //30 sec
  retries: 0, //to retry the failed tests
  workers: 100, // how many test specs/files in parallel. This will not run the tests in parallel within the same file
  expect: {
    timeout: 5000 // Time out for assertions
  },
  reporter: 'html',
  projects: [ //to run the different configuration we can make multiple projects. Using this we can prevent having different condig files
    // npx playwright test --config playwright.config_Projects.js --project=firefox
    //if no project given in command, all projects will run
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      },
    },
    {
      name: 'iphone11ProMax', //npx playwright test --config playwright.config_Projects.js --project=iphone11ProMax
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        ...devices['iPhone 11 Pro Max'], //to open the browser in this phone demension
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        ignoreHttpsErrors: true, //to tell playwright to handle if there will be any ssl certificate error on the browser
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        permissions: ['geolocation'], // to allow the geo location ... playwright will click the allow button
        video: 'retain-on-failure'
        // viewport: { width: 720, height: 720 } // custom 
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      },
    }
  ]
};

module.exports = config;