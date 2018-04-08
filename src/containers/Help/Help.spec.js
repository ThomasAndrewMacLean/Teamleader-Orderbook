import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedHelp, { Help } from './Help';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import * as mocks from './../../test-helpers/mocks';

const mockStore = configureStore();

let initialState;
let store;
let wrapper;
const mockDeleteProduct = jest.fn();
const mockAddQuantity = jest.fn();
beforeEach(() => {
    jest.clearAllMocks();
    Help.prototype._slider = { addEventListener };

    initialState = {
        data: {
            orders: mocks.getOrders(),
            products: mocks.getProducts(),
            customers: mocks.getCustomers()
        }
    };
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState);
    // wrapper = mount(<Provider store={store}><ConnectedList /></Provider>);
    wrapper = shallow(<Help order={mocks.getOrders()[0]} item={mocks.getOrders()[0].items[0]} products={mocks.getProducts()} addQuantity={mockAddQuantity} deleteProduct={mockDeleteProduct} />);
});

it('snapshot', () => {
    const tree = wrapper;
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ConnectedHelp /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
it('renders HELP titel in header', () => {
    expect(wrapper.find('.App-header').text()).toContain('HELP');
});

it('renders back button in header', () => {
    expect(wrapper.find('.App-header').text()).toContain('BACK');
});

it('renders list of helpitems', () => {
    expect(wrapper.find('ul')).toHaveLength(1);
});
it('renders list of helpitems with class info-list', () => {
    expect(wrapper.find('ul').hasClass('info-list')).toBeTruthy();
});
it('back button calls function goHome', () => {
    const mock = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    wrapper = shallow(<Help history={mockHistory} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    const spy = jest.spyOn(Help.prototype, 'goHome');
    wrapper.find('#back-button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
});

it('back button pushes / on history', () => {
    const mock = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    wrapper = shallow(<Help history={mockHistory} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    wrapper.find('#back-button').simulate('click');
    expect(history).toHaveLength(1);
    expect(history[0]).toBe('/');
});