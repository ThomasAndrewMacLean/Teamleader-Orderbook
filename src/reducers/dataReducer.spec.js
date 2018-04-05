import * as types from './../actions/actions';
import dataReducer from './dataReducer';
import initialState from './../store/initialState';
import * as mocks from './../test-helpers/mocks';

it('should return initial state with empty input', () => {
    expect(dataReducer(undefined, { type: undefined })).toEqual(initialState.data);
});


it('should add orders when type is LOAD_ORDERS_SUCCESS', () => {

    let orders = mocks.getOrders();
    let type = types.LOAD_ORDERS_SUCCESS;

    let result = dataReducer(undefined, { type, orders });
    expect(result.orders).toHaveLength(3);
});
