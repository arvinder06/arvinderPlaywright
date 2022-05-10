const { expect } = require('@playwright/test')

class APIUtils {

    constructor(apiContext, loginAPIpayload) {
        this.apiContext = apiContext;
        this.loginAPIpayload = loginAPIpayload
    }

    /**
     * To get the token from login API
     * @returns token
     */
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginAPIpayload
            }
        )
        expect(loginResponse.ok()).toBeTruthy(); //playwright function to check response 200 and retun true
        const loginResponseJsonBody = await loginResponse.json();
        const token = await loginResponseJsonBody.token;
        console.log(token);
        return token;
    }

    /**
     * To create order and return order ID via create order API
     * @param {*} createOrderPayload 
     * @returns response
     */
    async createOrder(createOrderPayload) {
        let response = {};
        response.token = await this.getToken();

        const createOrderAPIResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: createOrderPayload,
                headers: {
                    'Authorization': String(response.token), //call the local function to get the token
                    'Content-Type': 'application/json'
                }
            }
        )
        expect(await createOrderAPIResponse.ok()).toBeTruthy();
        const createOderJsonBody = await createOrderAPIResponse.json();
        console.log(createOderJsonBody)
        const orderID = await createOderJsonBody.orders[0];
        console.log('Oder ID created: ' + orderID);
        response.orderID = orderID;
        return response;
    }
}
module.exports = { APIUtils }