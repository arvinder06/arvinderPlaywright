// This is like a test runner in Selenium
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests', //Test specs directory
  timeout: 30 * 1000, //30 sec
  expect: {
    timeout: 5000 // Time out for assertions
  },
  reporter: 'html',
  use: {
    // Test properties/metadata like browser,retries etc
    browserName: 'webkit',
    headless: false
  },
};

module.exports = config;