import Api from './../api/api';

export function loadOrders() {
    return function (dispatch) {
        return Api
            .getAllOrders()
            .then(orders => {
                orders.forEach(order => dispatch(checkForDiscount(order, true)));
                dispatch(loadOrdersSuccess(orders));
            })
            .catch(error => {
                this.addToast('Please check network connection', 'danger');
                throw (error);
            });
    };
}
export function loadProducts() {
    return function (dispatch) {
        return Api
            .getAllProducts()
            .then(products => {
                dispatch(loadProductsSuccess(products));
            })
            .catch(error => {
                throw (error);
            });
    };
}
export function loadCustomers() {
    return function (dispatch) {
        return Api
            .getAllCustomers()
            .then(customers => {
                dispatch(loadCustomersSuccess(customers));
            })
            .catch(error => {
                throw (error);
            });
    };
}
export function checkForDiscount(order, initialCheck = false) {
    return function (dispatch) {
        return Api
            .checkForDiscount(order)
            .then(data => {
                dispatch(checkForDiscountSuccess(data.order, initialCheck));
            })
            .catch(error => {
                throw (error);
            });
    };
}
export function checkForDiscountSuccess(order, initialCheck) {
    return {
        type: CHECK_FOR_DISCOUNT_SUCCESS, payload: {
            order, initialCheck
        }
    };
}
export function loadOrdersSuccess(orders) {
    orders.forEach(o => checkForDiscount(o));

    return { type: LOAD_ORDERS_SUCCESS, orders };
}
export function loadProductsSuccess(products) {
    return { type: LOAD_PRODUCTS_SUCCESS, products };
}
export function loadCustomersSuccess(customers) {
    return { type: LOAD_CUSTOMERS_SUCCESS, customers };
}
export function addQuantity(quantity, productId, orderId) {
    return {
        type: ADD_QUANTITY,
        payload: {
            'quantity': quantity,
            'productId': productId,
            'orderId': orderId
        }
    };
}
export function addProduct(product, orderId) {
    return {
        type: ADD_PRODUCT,
        payload: {
            'product': product,
            'orderId': orderId
        }
    };
}
export function addOrder(customerId) {
    return {
        type: ADD_ORDER,
        payload: {
            customerId
        }
    };
}
export function deleteProduct(productId, orderId) {
    return {
        type: DELETE_PRODUCT,
        payload: {
            'productId': productId,
            'orderId': orderId
        }
    };
}
export function placeOrder(orderId) {
    return {
        type: PLACE_ORDER,
        payload: {
            'orderId': orderId
        }
    };
}
export function reopenOrder(orderId) {
    return {
        type: REOPEN_ORDER,
        payload: {
            'orderId': orderId
        }
    };
}
export function setSelectedOrder(orderId) {
    return {
        type: SET_SELECTED_ORDER,
        payload: {
            'orderId': orderId
        }
    };
}
export function addToast(msg, type) {
    return {
        type: ADD_TOAST,
        payload: {
            msg, type
        }
    };
}
export function clearToast() {
    return {
        type: CLEAR_TOAST,
        payload: {

        }
    };
}


export const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';
export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_CUSTOMERS_SUCCESS = 'LOAD_CUSTOMERS_SUCCESS';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const ADD_ORDER = 'ADD_ORDER';
export const PLACE_ORDER = 'PLACE_ORDER';
export const REOPEN_ORDER = 'REOPEN_ORDER';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CHECK_FOR_DISCOUNT_SUCCESS = 'CHECK_FOR_DISCOUNT_SUCCESS';
export const ADD_TOAST = 'ADD_TOAST';
export const CLEAR_TOAST = 'CLEAR_TOAST';
