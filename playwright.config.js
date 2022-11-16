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
    browserName: 'chromium',
    headless: true,
    screenshot: 'retain-on-failure', //screenshot on every step in report
    // trace: 'retain-on-failure' // Log in report of every step and action performed for trace all tests give 'on'
    trace: 'on'
  },
};

module.exports = config;