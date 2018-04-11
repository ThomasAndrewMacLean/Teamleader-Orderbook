export const apiEndpointOrders = 'https://nameless-citadel-45339.herokuapp.com/getOrders';
export const apiEndpointProducts = 'https://nameless-citadel-45339.herokuapp.com/getProducts';
export const apiEndpointCustomers = 'https://nameless-citadel-45339.herokuapp.com/getCustomers';
export const apiEndpointCheckForDiscount = 'https://nameless-citadel-45339.herokuapp.com/calculateDiscount';
// const apiEndpointCustomers = 'https://jsonplaceholder.typicode.com/users';

class Api {

    static getAllOrders() {
        return fetch(apiEndpointOrders).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getAllProducts() {
        return fetch(apiEndpointProducts).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static getAllCustomers() {
        return fetch(apiEndpointCustomers).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static checkForDiscount(order) {
        
        return fetch(apiEndpointCheckForDiscount, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ order: order })
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}

export default Api;