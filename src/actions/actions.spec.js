import * as actions from './actions';
import * as mocks from './../test-helpers/mocks';

beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
});


it('SET_SELECTED_ORDER is SET_SELECTED_ORDER', () => {
    expect(actions.SET_SELECTED_ORDER).toBe('SET_SELECTED_ORDER');
});
it('LOAD_ORDERS_SUCCESS is LOAD_ORDERS_SUCCESS', () => {
    expect(actions.LOAD_ORDERS_SUCCESS).toBe('LOAD_ORDERS_SUCCESS');
});
it('LOAD_PRODUCTS_SUCCESS is LOAD_PRODUCTS_SUCCESS', () => {
    expect(actions.LOAD_PRODUCTS_SUCCESS).toBe('LOAD_PRODUCTS_SUCCESS');
});
it('LOAD_CUSTOMERS_SUCCESS is LOAD_CUSTOMERS_SUCCESS', () => {
    expect(actions.LOAD_CUSTOMERS_SUCCESS).toBe('LOAD_CUSTOMERS_SUCCESS');
});
it('ADD_QUANTITY is ADD_QUANTITY', () => {
    expect(actions.ADD_QUANTITY).toBe('ADD_QUANTITY');
});
it('ADD_ORDER is ADD_ORDER', () => {
    expect(actions.ADD_ORDER).toBe('ADD_ORDER');
});
it('PLACE_ORDER is PLACE_ORDER', () => {
    expect(actions.PLACE_ORDER).toBe('PLACE_ORDER');
});
it('REOPEN_ORDER is REOPEN_ORDER', () => {
    expect(actions.REOPEN_ORDER).toBe('REOPEN_ORDER');
});
it('ADD_PRODUCT is ADD_PRODUCT', () => {
    expect(actions.ADD_PRODUCT).toBe('ADD_PRODUCT');
});
it('DELETE_PRODUCT is DELETE_PRODUCT', () => {
    expect(actions.DELETE_PRODUCT).toBe('DELETE_PRODUCT');
});
it('CHECK_FOR_DISCOUNT_SUCCESS is CHECK_FOR_DISCOUNT_SUCCESS', () => {
    expect(actions.CHECK_FOR_DISCOUNT_SUCCESS).toBe('CHECK_FOR_DISCOUNT_SUCCESS');
});
it('ADD_TOAST is ADD_TOAST', () => {
    expect(actions.ADD_TOAST).toBe('ADD_TOAST');
});
it('CLEAR_TOAST is CLEAR_TOAST', () => {
    expect(actions.CLEAR_TOAST).toBe('CLEAR_TOAST');
});
it('clearToast returns clearToast', () => {
    expect(actions.clearToast()).toEqual({ type: actions.CLEAR_TOAST, payload: {} });
});
it('addToast returns addToast', () => {
    let msg = 'hi';
    let type = 'info';
    expect(actions.addToast(msg, type)).toEqual({ type: actions.ADD_TOAST, payload: { msg, type } });
});
it('setSelectedOrder returns setSelectedOrder', () => {
    let orderId = 'id';
    expect(actions.setSelectedOrder(orderId)).toEqual({ type: actions.SET_SELECTED_ORDER, payload: { orderId } });
});
it('reopenOrder returns reopenOrder', () => {
    let orderId = 'id';
    expect(actions.reopenOrder(orderId)).toEqual({ type: actions.REOPEN_ORDER, payload: { orderId } });
});
it('placeOrder returns placeOrder', () => {
    let orderId = 'id';
    expect(actions.placeOrder(orderId)).toEqual({ type: actions.PLACE_ORDER, payload: { orderId } });
});
it('deleteProduct returns deleteProduct', () => {
    let orderId = 'id';
    let productId = 'productId';
    expect(actions.deleteProduct(productId, orderId)).toEqual({ type: actions.DELETE_PRODUCT, payload: { productId, orderId } });
});
it('addOrder returns addOrder', () => {
    let customerId = 'id';
    expect(actions.addOrder(customerId)).toEqual({ type: actions.ADD_ORDER, payload: { customerId } });
});
it('addProduct returns addProduct', () => {
    let orderId = 'id';
    let product = 'product';
    expect(actions.addProduct(product, orderId)).toEqual({ type: actions.ADD_PRODUCT, payload: { product, orderId } });
});
it('addQuantity returns addQuantity', () => {
    let orderId = 'id';
    let productId = 'product';
    let quantity = 1;
    expect(actions.addQuantity(quantity, productId, orderId)).toEqual({ type: actions.ADD_QUANTITY, payload: { quantity, productId, orderId } });
});
it('loadCustomersSuccess returns loadCustomersSuccess', () => {
    let customers = mocks.getCustomers();
    expect(actions.loadCustomersSuccess(customers)).toEqual({ type: actions.LOAD_CUSTOMERS_SUCCESS, customers });
});
it('loadProductsSuccess returns loadProductsSuccess', () => {
    let products = mocks.getProducts();
    expect(actions.loadProductsSuccess(products)).toEqual({ type: actions.LOAD_PRODUCTS_SUCCESS, products });
});
it('loadOrdersSuccess returns loadOrdersSuccess', () => {
    let orders = mocks.getOrders();
    expect(actions.loadOrdersSuccess(orders)).toEqual({ type: actions.LOAD_ORDERS_SUCCESS, orders });
});
it('checkForDiscount returns function', () => {
    let order = mocks.getOrders()[0];
    expect(actions.checkForDiscount(order)).toEqual(expect.any(Function));
});
it('loadCustomers returns function', () => {
    expect(actions.loadCustomers()).toEqual(expect.any(Function));
});
it('loadProducts returns function', () => {
    expect(actions.loadProducts()).toEqual(expect.any(Function));
});
it('loadOrders returns function', () => {
    expect(actions.loadOrders()).toEqual(expect.any(Function));
});
