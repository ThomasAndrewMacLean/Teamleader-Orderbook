import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import * as mocks from './../../test-helpers/mocks';
import List from '../List/List';


let mockOrders = mocks.getOrders();
mockOrders[0]['customer-id'] = 999;

let mockCustomers = mocks.getCustomers();
mockCustomers[0].id = 999;
mockCustomers[0].name = 'TESTNAME';

const initialState = {
    data: {
        orders: mockOrders,
        products: mocks.getProducts(),
        customers: mockCustomers
    }
};

const mockStore = configureStore();
let wrapper;
let store;

beforeEach(() => {
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><App /></Provider>);
    //wrapper = shallow(<App store={store} />)
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('title ORDERBOOK is renderd', () => {
    expect(wrapper.contains('ORDERBOOK')).toBe(true);
});

it('should render a LIST for each order', () => {
    expect(wrapper.find(List)).toHaveLength(initialState.data.orders.length);
});

it('correct name should be shown', () => {
    expect(wrapper.contains('TESTNAME')).toBe(true);
});

it('should not crash if cant find customer, but show ? instead of name', () => {
    initialState.data.customers = [];
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><App /></Provider>);

    expect(wrapper.contains('?')).toBe(true);
});