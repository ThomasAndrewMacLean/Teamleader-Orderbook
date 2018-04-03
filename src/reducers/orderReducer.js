import * as types from './../actions/actions';
import initialState from './../store/initialState';
// import { browserHistory } from 'react-router';


export default function orderReducer(state = initialState.orders, action) {
    switch (action.type) {
        case types.LOAD_ORDERS_SUCCESS:
            //  const newState = JSON.parse(JSON.stringify(state)); 
            state = {
                ...state,
                orders: action.orders
            }

            return state;
        case types.LOAD_PRODUCTS_SUCCESS:
            //  const newState = JSON.parse(JSON.stringify(state)); 
            state = {
                ...state,
                products: action.products
            }

            return state
        case types.LOAD_USERS_SUCCESS:
            //  const newState = JSON.parse(JSON.stringify(state)); 
            state = {
                ...state,
                users: action.users
            }

            return state
        case types.ADD_QUANTITY:
            const newState = JSON.parse(JSON.stringify(state));

            let order = newState.orders.find(o => parseInt(o.id, 10) === parseInt(action.payload.orderId, 10));
            let item = order.items.find(i => i['product-id'] === action.payload.productId);

            item.quantity = parseInt(item.quantity, 10) + parseInt(action.payload.quantity, 10);
            item.total = item['unit-price'] * item.quantity;

            order.total = order.items.reduce((a, b) => a += parseFloat(b.total, 10), 0)
            return newState;

        case types.ADD_PRODUCT:
            state = JSON.parse(JSON.stringify(state));
            order = state.orders.find(o => parseInt(o.id, 10) === parseInt(action.payload.orderId, 10));

            order.items.push({
                'product-id': action.payload.product.id,
                'quantity': '1',
                'unit-price': action.payload.product.price,
                'total': action.payload.product.price
            })

            order.total = order.items.reduce((a, b) => a += parseFloat(b.total, 10), 0)

            return state;

        case types.PLACE_ORDER:
            state = JSON.parse(JSON.stringify(state));
            order = state.orders.find(o => parseInt(o.id, 10) === parseInt(action.payload.orderId, 10));
            console.log('ORDER HAS BEEN PLACED: ');
            console.log(order);

            return state;

        case types.DELETE_PRODUCT:
            state = JSON.parse(JSON.stringify(state));
            order = state.orders.find(o => parseInt(o.id, 10) === parseInt(action.payload.orderId, 10));
            order.items = order.items.filter(i => i['product-id'] !== action.payload.productId)
            order.total = order.items.reduce((a, b) => a += parseFloat(b.total, 10), 0)

            return state;
        default:
            return state;
    }
}