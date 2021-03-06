import * as types from './../actions/actions';
import dataReducer, { helperFunctions } from './dataReducer';
import initialState from './../store/initialState';
import * as mocks from './../test-helpers/mocks';


beforeEach(() => {
    jest.clearAllMocks();
});

it('should return initial state with empty input', () => {
    expect(dataReducer(undefined, { type: undefined })).toEqual(initialState.data);
});

it('getTotal should get total amount of items', () => {
    let order = { items: [{ total: 3.5 }, { total: 4 }, { total: 5.9 }] };
    expect(helperFunctions.getTotal(order)).toEqual((3.5 + 4 + 5.9).toString());
});

it('should add orders when type is LOAD_ORDERS_SUCCESS', () => {
    let orders = mocks.getOrders();
    let type = types.LOAD_ORDERS_SUCCESS;

    let result = dataReducer(undefined, { type, orders });
    expect(result.orders).toHaveLength(orders.length);
});

it('should return state if action type not found', () => {
    let orders = mocks.getOrders();
    let type = '???UNKNOWN???';

    let result = dataReducer(initialState, { type, orders });
    expect(initialState).toEqual(result);
});

it('LOAD_ORDERS_SUCCESS should be immutable', () => {
    let orders = mocks.getOrders();
    let type = types.LOAD_ORDERS_SUCCESS;

    let beginState = initialState;
    let result = dataReducer(beginState, { type, orders });
    expect(beginState).not.toEqual(result);
});

it('should add products when type is LOAD_PRODUCTS_SUCCESS', () => {
    let products = mocks.getProducts();
    let type = types.LOAD_PRODUCTS_SUCCESS;

    let result = dataReducer(undefined, { type, products });
    expect(result.products).toHaveLength(products.length);
});

it('LOAD_PRODUCTS_SUCCESS should be immutable', () => {
    let products = mocks.getProducts();
    let type = types.LOAD_PRODUCTS_SUCCESS;

    let beginState = initialState;
    let result = dataReducer(beginState, { type, products });
    expect(beginState).not.toEqual(result);
});

it('should add customers when type is LOAD_CUSTOMERS_SUCCESS', () => {
    let customers = mocks.getCustomers();
    let type = types.LOAD_CUSTOMERS_SUCCESS;

    let result = dataReducer(undefined, { type, customers });
    expect(result.customers).toHaveLength(customers.length);
});

it('LOAD_CUSTOMERS_SUCCESS should be immutable', () => {
    let customers = mocks.getCustomers();
    let type = types.LOAD_CUSTOMERS_SUCCESS;

    let beginState = initialState;
    let result = dataReducer(beginState, { type, customers });
    expect(beginState).not.toEqual(result);
});


it('ADD_QUANTITY should change the number of items', () => {
    const beginState = {
        orders: mocks.getOrders()
    };

    expect(beginState.orders[0].items[0].quantity).toBe('10');

    const action = {
        'type': types.ADD_QUANTITY,
        'payload': {
            'productId': 'B102',
            'quantity': 3,
            'orderId': '1'
        }
    };

    let result = dataReducer(beginState, action);

    expect(result.orders[0].items[0].quantity).toBe('13');
});

it('ADD_QUANTITY should do nothing if order has been placed', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    beginState.orders[0].hasBeenPlaced = true;
    expect(beginState.orders[0].items[0].quantity).toBe('10');

    const action = {
        'type': types.ADD_QUANTITY,
        'payload': {
            'productId': 'B102',
            'quantity': 3,
            'orderId': '1'
        }
    };

    let result = dataReducer(beginState, action);
    expect(result).toEqual(beginState);
    expect(result.orders[0].items[0].quantity).toBe('10');
});

it('ADD_QUANTITY should change the number of items NEGATIVE', () => {
    const beginState = {
        orders: mocks.getOrders()
    };

    expect(beginState.orders[0].items[0].quantity).toBe('10');

    const action = {
        'type': types.ADD_QUANTITY,
        'payload': {
            'productId': 'B102',
            'quantity': -3,
            'orderId': '1'
        }
    };

    let result = dataReducer(beginState, action);

    expect(result.orders[0].items[0].quantity).toBe('7');
});

it('ADD_QUANTITY should change the number of items NEGATIVE cant go under 0', () => {
    const beginState = {
        orders: mocks.getOrders()
    };

    expect(beginState.orders[2].items[1].quantity).toBe('1');

    const action = {
        'type': types.ADD_QUANTITY,
        'payload': {
            'productId': 'A102',
            'quantity': -1,
            'orderId': '3'
        }
    };

    let result = dataReducer(beginState, action);
    expect(result.orders[2].items[1].quantity).toBe('0');

    let result2 = dataReducer(result, action);
    expect(result2.orders[2].items[1].quantity).toBe('0');
});

it('ADD_QUANTITY should calculate total', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    expect(beginState.orders[0].items[0].quantity).toBe('10');
    const action = {
        'type': types.ADD_QUANTITY,
        'payload': {
            'productId': 'B102',
            'quantity': -3,
            'orderId': '1'
        }
    };
    const spy = jest.spyOn(helperFunctions, 'getTotal');
    dataReducer(beginState, action);

    expect(spy).toHaveBeenCalled();
});

it('ADD_QUANTITY should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };

    expect(beginState.orders[0].items[0].quantity).toBe('10');

    const action = {
        'type': types.ADD_QUANTITY,
        'payload': {
            'productId': 'B102',
            'quantity': -3,
            'orderId': '1'
        }
    };

    let result = dataReducer(beginState, action);

    expect(result).not.toEqual(beginState);
});

it('ADD_PRODUCT should add a product to item array', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    expect(beginState.orders[0].items).toHaveLength(1);

    const action = {
        'type': types.ADD_PRODUCT,
        'payload': {
            'orderId': '1',
            product: {
                id: 'ABC',
                price: '50'
            }
        }
    };

    let result = dataReducer(beginState, action);
    expect(result.orders[0].items).toHaveLength(2);
});

it('ADD_PRODUCT should do nothing if order has been placed', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    expect(beginState.orders[0].items).toHaveLength(1);
    beginState.orders[0].hasBeenPlaced = true;
    const action = {
        'type': types.ADD_PRODUCT,
        'payload': {
            'orderId': '1',
            product: {
                id: 'ABC',
                price: '50'
            }
        }
    };

    let result = dataReducer(beginState, action);
    expect(result).toEqual(beginState);
    expect(result.orders[0].items).toHaveLength(1);
});

it('ADD_PRODUCT should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    expect(beginState.orders[0].items).toHaveLength(1);

    const action = {
        'type': types.ADD_PRODUCT,
        'payload': {
            'orderId': '1',
            product: {
                id: 'ABC',
                price: '50'
            }
        }
    };

    let result = dataReducer(beginState, action);
    expect(result).not.toEqual(beginState);
});

it('ADD_PRODUCT should recalculate total', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.ADD_PRODUCT,
        'payload': {
            'orderId': '1',
            product: {
                id: 'ABC',
                price: '50'
            }
        }
    };
    const spy = jest.spyOn(helperFunctions, 'getTotal');
    dataReducer(beginState, action);

    expect(spy).toHaveBeenCalled();
});

it('ADD_PRODUCT adds quantity 1', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.ADD_PRODUCT,
        'payload': {
            'orderId': '1',
            product: {
                id: 'ABC',
                price: '50'
            }
        }
    };

    let result = dataReducer(beginState, action);

    expect(result.orders[0].items[1].quantity).toBe('1');
});

it('ADD_PRODUCT cant add a product that has allready been added', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.ADD_PRODUCT,
        'payload': {
            'orderId': '1',
            product: {
                id: 'ABC',
                price: '50'
            }
        }
    };
    let state1 = dataReducer(beginState, action);
    let state2 = dataReducer(state1, action);
    let result = dataReducer(state2, action);

    expect(result.orders[0].items).toHaveLength(2);
});

it('PLACE_ORDER should place order', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.PLACE_ORDER,
        'payload': { 'orderId': '1' }
    };
    expect(beginState.orders[0].hasBeenPlaced).toBeFalsy();
    let result = dataReducer(beginState, action);
    expect(result.orders[0].hasBeenPlaced).toBeTruthy();
});

it('PLACE_ORDER should call function placeOrder', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.PLACE_ORDER,
        'payload': { 'orderId': '1' }
    };
    const spy = jest.spyOn(helperFunctions, 'placeOrder');
    dataReducer(beginState, action);
    expect(spy).toHaveBeenCalled();
});

it('PLACE_ORDER can only be called once', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.PLACE_ORDER,
        'payload': { 'orderId': '1' }
    };
    const spy = jest.spyOn(helperFunctions, 'placeOrder');
    let state1 = dataReducer(beginState, action);
    let state2 = dataReducer(state1, action);
    dataReducer(state2, action);

    expect(spy).toHaveBeenCalledTimes(1);
});
it('PLACE_ORDER does nothing if order is allready placed', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.PLACE_ORDER,
        'payload': { 'orderId': '1' }
    };
    beginState.orders[0].hasBeenPlaced = true;
    const spy = jest.spyOn(helperFunctions, 'placeOrder');
    let result = dataReducer(beginState, action);

    expect(result).toEqual(beginState);
    expect(spy).not.toBeCalled();
});
it('PLACE_ORDER should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.PLACE_ORDER,
        'payload': { 'orderId': '1' }
    };
    let result = dataReducer(beginState, action);
    expect(result).not.toEqual(beginState);
});



it('REOPEN_ORDER should call function reopen0rder', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    beginState.orders[0].hasBeenPlaced = true;
    const action = {
        'type': types.REOPEN_ORDER,
        'payload': { 'orderId': '1' }
    };
    const spy = jest.spyOn(helperFunctions, 'reopenOrder');
    dataReducer(beginState, action);
    expect(spy).toHaveBeenCalled();
});

it('REOPEN_ORDER can only be called once', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    beginState.orders[0].hasBeenPlaced = true;

    const action = {
        'type': types.REOPEN_ORDER,
        'payload': { 'orderId': '1' }
    };
    const spy = jest.spyOn(helperFunctions, 'reopenOrder');
    let state1 = dataReducer(beginState, action);
    let state2 = dataReducer(state1, action);
    dataReducer(state2, action);

    expect(spy).toHaveBeenCalledTimes(1);
});
it('REOPEN_ORDER does nothing if order is not placed', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.REOPEN_ORDER,
        'payload': { 'orderId': '1' }
    };
    const spy = jest.spyOn(helperFunctions, 'reopenOrder');
    let result = dataReducer(beginState, action);

    expect(result).toEqual(beginState);
    expect(spy).not.toBeCalled();
});
it('REOPEN_ORDER should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    beginState.orders[0].hasBeenPlaced = true;

    const action = {
        'type': types.REOPEN_ORDER,
        'payload': { 'orderId': '1' }
    };
    let result = dataReducer(beginState, action);
    expect(result).not.toEqual(beginState);
});

it('DELETE_PRODUCT deletes a product', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.DELETE_PRODUCT,
        'payload': { 'orderId': '1', 'productId': 'B102' }
    };
    let result = dataReducer(beginState, action);
    expect(result.orders[0].items).toHaveLength(0);
});


it('DELETE_PRODUCT deleting a already deleted item should not explode', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.DELETE_PRODUCT,
        'payload': { 'orderId': '1', 'productId': 'fakeId' }
    };
    let result = dataReducer(beginState, action);

    expect(result.orders[0].items).toHaveLength(1);
});

it('DELETE_PRODUCT should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.DELETE_PRODUCT,
        'payload': { 'orderId': '1', 'productId': 'B102' }
    };
    let result = dataReducer(beginState, action);
    expect(result).not.toEqual(beginState);
});


it('DELETE_PRODUCT should recalculate the total', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.DELETE_PRODUCT,
        'payload': { 'orderId': '1', 'productId': 'B102' }
    };
    const spy = jest.spyOn(helperFunctions, 'getTotal');
    dataReducer(beginState, action);
    expect(spy).toHaveBeenCalled();
});

it('CHECK_FOR_DISCOUNT_SUCCESS should add discount', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.CHECK_FOR_DISCOUNT_SUCCESS,
        'payload': { 'order': { priceWithDiscount: '9', id: '1', discount: '1' } }
    };
    let result = dataReducer(beginState, action);

    expect(result.orders[0].priceWithDiscount).toBe('9');
    expect(result.orders[0].discount).toBe('1');
});

it('CHECK_FOR_DISCOUNT_SUCCESS should not add discount if timestamp is older than timestamp on current order', () => {
    let orders = mocks.getOrders();
    orders.map(o => o.timestamp = 10);

    const beginState = {
        orders
    };
    const action = {
        'type': types.CHECK_FOR_DISCOUNT_SUCCESS,
        'payload': { 'order': { priceWithDiscount: '9', timestamp: 9, id: '1', discount: '1' } }
    };
    let result = dataReducer(beginState, action);

    expect(result.orders[0].priceWithDiscount).toBe(undefined);
    expect(result.orders[0].discount).toBe(undefined);
});

it('CHECK_FOR_DISCOUNT_SUCCESS should add discount if timestamp is newer than timestamp on current order', () => {
    let orders = mocks.getOrders();
    orders.map(o => o.timestamp = 10);

    const beginState = {
        orders
    };
    const action = {
        'type': types.CHECK_FOR_DISCOUNT_SUCCESS,
        'payload': { 'order': { priceWithDiscount: '9', timestamp: 11, id: '1', discount: '1' } }
    };
    let result = dataReducer(beginState, action);

    expect(result.orders[0].priceWithDiscount).toBe('9');
    expect(result.orders[0].discount).toBe('1');
});

it('CHECK_FOR_DISCOUNT_SUCCESS should always add discount if timestamp on current order does not yet exist (initial state)', () => {
    let orders = mocks.getOrders();
    orders.map(o => o.timestamp = undefined);

    const beginState = {
        orders
    };
    const action = {
        'type': types.CHECK_FOR_DISCOUNT_SUCCESS,
        'payload': { 'order': { priceWithDiscount: '9', timestamp: 0, id: '1', discount: '1' } }
    };
    let result = dataReducer(beginState, action);

    expect(result.orders[0].priceWithDiscount).toBe('9');
    expect(result.orders[0].discount).toBe('1');
});

it('CHECK_FOR_DISCOUNT_SUCCESS should not add discount if discount is 0', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.CHECK_FOR_DISCOUNT_SUCCESS,
        'payload': { 'order': { priceWithDiscount: '9', id: '1', discount: '0' } }
    };
    let result = dataReducer(beginState, action);

    expect(result.orders[0].priceWithDiscount).toBeUndefined();
    expect(result.orders).toEqual(beginState.orders);

});

it('CHECK_FOR_DISCOUNT_SUCCESS should set discount to undefined if discount is 0', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    let action = {
        'type': types.CHECK_FOR_DISCOUNT_SUCCESS,
        'payload': { 'order': { priceWithDiscount: '9', id: '1', discount: '10' } }
    };
    let result = dataReducer(beginState, action);

    action = {
        'type': types.CHECK_FOR_DISCOUNT_SUCCESS,
        'payload': { 'order': { priceWithDiscount: '9', id: '1', discount: '0' } }
    };
    let result2 = dataReducer(result, action);


    expect(result2.orders[0].priceWithDiscount).toBeUndefined();

});


it('CHECK_FOR_DISCOUNT_SUCCESS should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.CHECK_FOR_DISCOUNT_SUCCESS,
        'payload': { 'order': { priceWithDiscount: '9', id: '1', discount: '1' } }
    };
    let result = dataReducer(beginState, action);

    expect(result).not.toEqual(beginState);
});

it('SET_SELECTED_ORDER should set order as selected', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.SET_SELECTED_ORDER,
        'payload': { orderId: 2 }
    };

    let result = dataReducer(beginState, action);

    expect(result.selectedOrder).toEqual(helperFunctions.returnOrderById(2, beginState.orders));
});

it('SET_SELECTED_ORDER should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.SET_SELECTED_ORDER,
        'payload': { orderId: 2 }
    };

    let result = dataReducer(beginState, action);

    expect(result).not.toEqual(beginState);
});

it('should return new id', () => {
    let orders = mocks.getOrders();

    let result = helperFunctions.getNewId(orders);
    expect(result).toBe('4');
});


it('should return new id of 1 for empty list', () => {
    let orders = [];

    let result = helperFunctions.getNewId(orders);
    expect(result).toBe('1');
});

it('should get order by id', () => {
    let orders = mocks.getOrders();
    let result = helperFunctions.returnOrderById(1, orders);
    expect(result.id).toBe('1');
});
it('should get order by id empty orders: return undefined', () => {
    let orders = [];
    let result = helperFunctions.returnOrderById(1, orders);
    expect(result).toBe(undefined);
});

it('should get order by id, wrong id: return undefined', () => {
    let orders = mocks.getOrders();
    let result = helperFunctions.returnOrderById(34, orders);
    expect(result).toBe(undefined);
});


it('ADD_ORDER should add a new order', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.ADD_ORDER,
        'payload': { customerId: 2 }
    };

    let result = dataReducer(beginState, action);

    expect(result.orders).toHaveLength(beginState.orders.length + 1);
});


it('ADD_ORDER should add a new order, with correct customerId', () => {
    const beginState = {
        orders: []
    };
    const action = {
        'type': types.ADD_ORDER,
        'payload': { customerId: 22 }
    };

    let result = dataReducer(beginState, action);

    expect(result.orders[0]['customer-id']).toBe('22');
});

it('ADD_ORDER should add a new order, with no items and total 0', () => {
    const beginState = {
        orders: []
    };
    const action = {
        'type': types.ADD_ORDER,
        'payload': { customerId: 2 }
    };

    let result = dataReducer(beginState, action);

    expect(result.orders[0].items).toEqual([]);
    expect(result.orders[0].total).toBe('0');
});

it('ADD_ORDER should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.ADD_ORDER,
        'payload': { customerId: 2 }
    };

    let result = dataReducer(beginState, action);

    expect(result).not.toEqual(beginState);
});

it('ADD_TOAST should be immutable', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.ADD_TOAST,
        'payload': { msg: 'helllooowkes', type: 'info' }
    };

    let result = dataReducer(beginState, action);

    expect(result).not.toEqual(beginState);
});

it('ADD_TOAST should set toast of state', () => {
    const beginState = {
        orders: mocks.getOrders()
    };
    const action = {
        'type': types.ADD_TOAST,
        'payload': { msg: 'helllooowkes', type: 'info' }
    };

    let result = dataReducer(beginState, action);

    expect(result.toast.msg).toBe('helllooowkes');
    expect(result.toast.type).toBe('info');

});

it('test mocks get toast', () => {
    const beginState = {
        toast: mocks.getToast()
    };

    expect(beginState.toast.msg).toBe('hello this is a toast');
    expect(beginState.toast.type).toBe('info');
});

it('CLEAR_TOAST clears toast message', () => {
    const beginState = {
        toast: mocks.getToast()
    };
    const action = {
        'type': types.CLEAR_TOAST,
    };

    let result = dataReducer(beginState, action);

    expect(result.toast.msg).toBe(undefined);
    expect(result.toast.type).toBe('info');
});

it('CLEAR_TOAST should be immutable', () => {
    const beginState = {
        toast: mocks.getToast()
    };
    const action = {
        'type': types.CLEAR_TOAST,
    };

    let result = dataReducer(beginState, action);

    expect(result).not.toEqual(beginState);
});