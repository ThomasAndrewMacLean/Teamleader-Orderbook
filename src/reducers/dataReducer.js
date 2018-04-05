import * as types from './../actions/actions';
import initialState from './../store/initialState';
// import { browserHistory } from 'react-router';

export const helperFunctions = {
    getTotal(order) {
        let result = order.items.reduce((a, b) => a += parseFloat(b.total, 10), 0);
        return result.toString();
    },
    placeOrder(order) {
        order.hasBeenPlaced = true;
        console.log('ORDER HAS BEEN PLACED: ');
        console.log(order);
    }
};

export default function dataReducer(state = initialState.data, action) {

    let newState;
    let order;
    let item;

    switch (action.type) {
    case types.LOAD_ORDERS_SUCCESS:
        //  const newState = JSON.parse(JSON.stringify(state)); 
        state = {
            ...state,
            orders: action.orders
        };

        return state;
    case types.LOAD_PRODUCTS_SUCCESS:
        //  const newState = JSON.parse(JSON.stringify(state)); 
        state = {
            ...state,
            products: action.products
        };

        return state;
    case types.LOAD_CUSTOMERS_SUCCESS:
        //  const newState = JSON.parse(JSON.stringify(state)); 
        state = {
            ...state,
            customers: action.customers
        };

        return state;
    case types.ADD_QUANTITY:
        newState = JSON.parse(JSON.stringify(state));

        order = newState.orders.find(o => parseInt(o.id, 10) === parseInt(action.payload.orderId, 10));
       
        if(!order.hasBeenPlaced){   
            item = order.items.find(i => i['product-id'] === action.payload.productId);
            item.quantity = (parseInt(item.quantity, 10) + parseInt(action.payload.quantity, 10)).toString();
            item.total = item['unit-price'] * item.quantity;
            
            order.total = helperFunctions.getTotal(order);
        }
        return newState;

    case types.ADD_PRODUCT:
        state = JSON.parse(JSON.stringify(state));
        order = state.orders.find(o => parseInt(o.id, 10) === parseInt(action.payload.orderId, 10));

        if (!order.hasBeenPlaced && !order.items.find(i => i['product-id'] === action.payload.product.id)) {

            order.items.push({
                'product-id': action.payload.product.id,
                'quantity': '1',
                'unit-price': action.payload.product.price,
                'total': action.payload.product.price
            });

            order.total = helperFunctions.getTotal(order);
        }

        return state;

    case types.PLACE_ORDER:
        state = JSON.parse(JSON.stringify(state));
        order = state.orders.find(o => parseInt(o.id, 10) === parseInt(action.payload.orderId, 10));
        if (!order.hasBeenPlaced) {
            helperFunctions.placeOrder(order);
        }

        return state;

    case types.DELETE_PRODUCT:
        state = JSON.parse(JSON.stringify(state));
        order = state.orders.find(o => parseInt(o.id, 10) === parseInt(action.payload.orderId, 10));
        order.items = order.items.filter(i => i['product-id'] !== action.payload.productId);
        order.total = helperFunctions.getTotal(order);

        return state;
    default:
        return state;
    }
}