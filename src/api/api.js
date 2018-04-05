const apiEndpointOrders = 'https://nameless-citadel-45339.herokuapp.com/getOrders';
const apiEndpointProducts = 'https://nameless-citadel-45339.herokuapp.com/getProducts';
// const apiEndpointCustomers = 'https://jsonplaceholder.typicode.com/users';
const apiEndpointCustomers = 'https://nameless-citadel-45339.herokuapp.com/getCustomers';

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
}

export default Api;