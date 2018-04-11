import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Orders from './../Orders/Orders';
import Detail from './../Detail/Detail';
import Help from './../Help/Help';
import NotFound from './../../components/NotFound/NotFound';

import Routes from './Routes';

import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as mocks from './../../test-helpers/mocks';
import { Provider } from 'react-redux';


const mockStore = configureStore();
let store;
let initialState;

beforeEach(() => {
    jest.clearAllMocks();

    const mockClearToast = jest.fn();

    initialState = {
        data: {
            orders: mocks.getOrders(),
            selectedOrder: mocks.getOrders()[0],
            products: mocks.getProducts(),
            customers: mocks.getCustomers(),
            toast: mocks.getToast(),
            clearToast: mockClearToast,
        }
    };
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState);
});

it('test', () => {
    expect(true).toBeTruthy();
});
it('/ should redirect to Orders component', () => {

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/']}>
                <Routes />
            </MemoryRouter>
        </Provider>
    );
    //  console.log(wrapper.text());

    expect(wrapper.find(Orders)).toHaveLength(1);
});

it('/Help should redirect to Help component', () => {

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/Help']}>
                <Routes />
            </MemoryRouter>
        </Provider>
    );
    //   console.log(wrapper.text());

    expect(wrapper.find(Help)).toHaveLength(1);
});


it('/Detail/id should redirect to Detail component', () => {

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/Detail/1']}>
                <Routes />
            </MemoryRouter>
        </Provider>
    );
    //  console.log(wrapper.text());

    expect(wrapper.find(Detail)).toHaveLength(1);
});


it('/wrongInput should give to NotFound component', () => {

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/WrongInput???666']}>
                <Routes />
            </MemoryRouter>
        </Provider>
    );
    //  console.log(wrapper.text());

    expect(wrapper.find(NotFound)).toHaveLength(1);
});
