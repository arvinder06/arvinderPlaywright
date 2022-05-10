//This is the class to extend and customise the test fixture which come from playwright test object. For eample we can add test data to the custom test
const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testDataForAdidas: {
            userName: "arvinder06@gmail.com",
            password: "Abcde@12345",
            productName: "adidas original",
            countryCode: "Aus",
            countryName: "Australia"
        }
    }
)