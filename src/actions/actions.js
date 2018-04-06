import Api from './../api/api';

export function loadOrders() {
    return function (dispatch) {
        return Api.getAllOrders().then(orders => {
            dispatch(loadOrdersSuccess(orders));
        }).catch(error => {
            throw (error);
        });
    };
}

export function loadProducts() {
    return function (dispatch) {
        return Api.getAllProducts().then(products => {
            dispatch(loadProductsSuccess(products));
        }).catch(error => {
            throw (error);
        });
    };
}

export function loadCustomers() {
    return function (dispatch) {
        return Api.getAllCustomers().then(customers => {
            dispatch(loadCustomersSuccess(customers));
        }).catch(error => {
            throw (error);
        });
    };
}

export function loadOrdersSuccess(orders) {
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
        payload: { 'quantity': quantity, 'productId': productId, 'orderId': orderId }
    };
}

export function addProduct(product, orderId) {
    return {
        type: ADD_PRODUCT,
        payload: { 'product': product, 'orderId': orderId }
    };
}


export function deleteProduct(productId, orderId) {
    return {
        type: DELETE_PRODUCT,
        payload: { 'productId': productId, 'orderId': orderId }
    };
}


export function placeOrder(orderId) {
    return {
        type: PLACE_ORDER,
        payload: { 'orderId': orderId }
    };
}


export function reopenOrder(orderId) {
    return {
        type: REOPEN_ORDER,
        payload: { 'orderId': orderId }
    };
}



export const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_CUSTOMERS_SUCCESS = 'LOAD_CUSTOMERS_SUCCESS';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const PLACE_ORDER = 'PLACE_ORDER';
export const REOPEN_ORDER = 'REOPEN_ORDER';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';