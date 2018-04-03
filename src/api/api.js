const apiEndpointOrders = 'https://nameless-citadel-45339.herokuapp.com/getOrders';
const apiEndpointProducts = 'https://nameless-citadel-45339.herokuapp.com/getProducts';

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
}

export default Api;