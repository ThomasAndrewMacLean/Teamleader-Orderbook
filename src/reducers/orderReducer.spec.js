import * as types from './../actions/actions';
import orderReducer from './orderReducer';
import initialState from './../store/initialState';
import * as mocks from './../mock-data/mocks';

it('should return initial state with empty input', () => {
    expect(orderReducer(undefined, { type: undefined })).toEqual(initialState.orders);
});


it('should add orders when type is LOAD_ORDERS_SUCCESS', () => {

    let orders = mocks.getOrders();
    let type = types.LOAD_ORDERS_SUCCESS;

    let result = orderReducer(undefined, { type, orders });
    expect(result.orders).toHaveLength(3);
});
