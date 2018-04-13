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
    },
    reopenOrder(order) {
        order.hasBeenPlaced = false;
        console.log('ORDER HAS BEEN REOPEND: ');
        console.log(order);
    },
    getNewId(orders) {
        let o = orders.sort((a, b) => { return parseInt(a.id, 10) < parseInt(b.id, 10); })[0];

        return (o && (parseInt(o.id, 10) + 1).toString()) || '1';
    },
    returnOrderById(id, orders) {
        return orders.find(o => parseInt(o.id, 10) === parseInt(id, 10));
    }
};

export default function dataReducer(state = initialState.data, action) {


    let order;
    let item;

    switch (action.type) {
        case types.LOAD_ORDERS_SUCCESS:
            //  const newState = JSON.parse(JSON.stringify(state)); 
            state = {
                ...state,
                orders: action.orders//
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
            state = JSON.parse(JSON.stringify(state));

            order = helperFunctions.returnOrderById(action.payload.orderId, state.orders);

            if (!order.hasBeenPlaced) {
                item = order.items.find(i => i['product-id'] === action.payload.productId);
                item.quantity = (parseInt(item.quantity, 10) + parseInt(action.payload.quantity, 10)).toString();

                if (parseInt(item.quantity, 10) < 0) {
                    item.quantity = '0';
                }

                item.total = item['unit-price'] * parseInt(item.quantity, 10);

                order.total = helperFunctions.getTotal(order);

                state.selectedOrder = order;
            }
            return state;

        case types.ADD_PRODUCT:
            state = JSON.parse(JSON.stringify(state));
            order = helperFunctions.returnOrderById(action.payload.orderId, state.orders);

            if (!order.hasBeenPlaced && !order.items.find(i => i['product-id'] === action.payload.product.id)) {

                order.items.push({
                    'product-id': action.payload.product.id,
                    'quantity': '1',
                    'unit-price': action.payload.product.price,
                    'total': action.payload.product.price
                });

                order.total = helperFunctions.getTotal(order);
                state.selectedOrder = order;

            }

            return state;

        case types.PLACE_ORDER:
            state = JSON.parse(JSON.stringify(state));
            order = helperFunctions.returnOrderById(action.payload.orderId, state.orders);
            if (!order.hasBeenPlaced) {
                helperFunctions.placeOrder(order);
                state.selectedOrder = order;

            }

            return state;

        case types.REOPEN_ORDER:
            state = JSON.parse(JSON.stringify(state));
            order = helperFunctions.returnOrderById(action.payload.orderId, state.orders);
            if (order.hasBeenPlaced) {
                helperFunctions.reopenOrder(order);
                state.selectedOrder = order;

            }

            return state;

        case types.DELETE_PRODUCT:
            state = JSON.parse(JSON.stringify(state));
            order = helperFunctions.returnOrderById(action.payload.orderId, state.orders);
            order.items = order.items.filter(i => i['product-id'] !== action.payload.productId);
            order.total = helperFunctions.getTotal(order);
            state.selectedOrder = order;

            return state;

        case types.CHECK_FOR_DISCOUNT_SUCCESS:
            state = JSON.parse(JSON.stringify(state));

            order = helperFunctions.returnOrderById(action.payload.order.id, state.orders);

            if (action.payload.order.discount !== '0') {
                if (!order.timestamp || order.timestamp < action.payload.order.timestamp) {
                    order.discount = action.payload.order.discount;
                    order.priceWithDiscount = action.payload.order.priceWithDiscount;
                }

            }
            if (action.payload.order.discount === '0') {
                order.discount = undefined;
                order.priceWithDiscount = undefined;
            }

            if (state.selectedOrder && state.selectedOrder.id === order.id) {
                state.selectedOrder = order;
            }

            return state;
        case types.SET_SELECTED_ORDER:
            state = JSON.parse(JSON.stringify(state));
            order = helperFunctions.returnOrderById(action.payload.orderId, state.orders);

            state.selectedOrder = order;

            return state;

        case types.ADD_ORDER:
            state = JSON.parse(JSON.stringify(state));
            order = {
                'customer-id': action.payload.customerId.toString(),
                id: helperFunctions.getNewId(state.orders),
                items: [],
                total: '0'
            };
            state.orders.push(order);

            return state;

        case types.ADD_TOAST:
            
            state = JSON.parse(JSON.stringify(state));
            state.toast = { msg: action.payload.msg, type: action.payload.type };
            return state;

        case types.CLEAR_TOAST:
            state = JSON.parse(JSON.stringify(state));
            state.toast.msg = undefined;
            return state;

        default:
            return state;
    }
}