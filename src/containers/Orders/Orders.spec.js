import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedOrders, { Orders } from './Orders';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import * as mocks from './../../test-helpers/mocks';
import OrderList from '../OrderList/OrderList';
import renderer from 'react-test-renderer';


const mockStore = configureStore();
let wrapper;
let store;
let initialState;

beforeEach(() => {
    jest.clearAllMocks();

    initialState = {
        data: {
            orders: mocks.getOrders(),
            products: mocks.getProducts(),
            customers: mocks.getCustomers()
        }
    };
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedOrders /></Provider>);
});

it('snapshot', () => {
    const tree = renderer
        .create(<Provider store={store}><ConnectedOrders /></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ConnectedOrders /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('should show loader if orders are empty', () => {
    initialState.data.orders = [];
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedOrders /></Provider>);

    expect(wrapper.find('Loader')).toHaveLength(1);
});

it('should not show loader if orders is not empty', () => {
    initialState.data.orders = mocks.getOrders();
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedOrders /></Provider>);

    expect(wrapper.find('Loader')).toHaveLength(0);
});

it('title ORDERBOOK is renderd', () => {
    expect(wrapper.contains('ORDERBOOK')).toBe(true);
});

it('should render a LIST for each order', () => {
    expect(wrapper.find(OrderList)).toHaveLength(initialState.data.orders.length);
});

it('should render a second LIST for each order that has been placed (0)', () => {
    expect(wrapper.find('.placed-order')).toHaveLength(0);
});

it('should not render a placed list header if orders have not been placed', () => {
    expect(wrapper.find('.placed-orders-header')).toHaveLength(0);
});

it('should render a placed list header if orders have been placed', () => {
    initialState.data.orders = mocks.getOrders();
    initialState.data.orders[0].hasBeenPlaced = true;
    initialState.data.orders[1].hasBeenPlaced = true;
    // console.log(initialState.data.orders);

    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedOrders /></Provider>);
    expect(wrapper.find('.placed-orders-header')).toHaveLength(1);
});

it('should render a second LIST for each order that has been placed', () => {
    initialState.data.orders = mocks.getOrders();
    initialState.data.orders[0].hasBeenPlaced = true;
    initialState.data.orders[1].hasBeenPlaced = true;

    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedOrders /></Provider>);
    expect(wrapper.find(OrderList).at(0).hasClass('placed-order')).toBe(false);
    expect(wrapper.find(OrderList).at(1).hasClass('placed-order')).toBe(true);
    expect(wrapper.find(OrderList).at(2).hasClass('placed-order')).toBe(true);
});
it('correct name should be shown', () => {
    expect(wrapper.contains('Coca Cola')).toBe(true);
});

it('modal should not be shown initially', () => {
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
});

it('modal should not be rendered if customers have not been loaded', () => {
    initialState.data.customers = [];
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedOrders /></Provider>);

    expect(wrapper.find('.modal')).toHaveLength(0);
});

it('modal should be rendered if customers have been loaded', () => {
    expect(wrapper.find('.modal')).toHaveLength(1);
});

it('modal should be shown after click on add order button', () => {
    wrapper.find('#add-order-button').simulate('click');
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(true);
});

it('modal should not be shown if clicked on modal backdrop', () => {
    wrapper.find('#add-order-button').simulate('click');
    wrapper.find('.modal-back-drop').simulate('click');

    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
});

it('modal should not be shown if clicked on cancel button', () => {
    wrapper.find('#add-order-button').simulate('click');
    wrapper.find('#cancel-button').simulate('click');

    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
});

it('modal should not be shown if clicked on ok button', () => {
    wrapper.find('#add-order-button').simulate('click');
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(true);
    wrapper.find('#ok-button').simulate('click');

    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
});

it('toggleModal function should be triggered on click', () => {
    wrapper = shallow(<Orders customers={mocks.getCustomers()} orders={[]} />);
    const spy = jest.spyOn(Orders.prototype, 'toggleModal');
    wrapper.find('#add-order-button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
});

it('addOrder function should be triggered on click add order', () => {
    wrapper = shallow(<Orders customers={mocks.getCustomers()} orders={[]} addOrder={() => { }} />);
    Orders.prototype.selectCustomer = { value: 'thomas' };

    const spy = jest.spyOn(Orders.prototype, 'addOrder');
    wrapper.find('#ok-button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
});

it('addOrder function of props should be triggered on click add order', () => {
    const mockAddOrder = jest.fn();
    wrapper = shallow(<Orders customers={mocks.getCustomers()} orders={[]} addOrder={() => { mockAddOrder(); }} />);
    Orders.prototype.selectCustomer = { value: 'thomas' };

    wrapper.find('#ok-button').simulate('click');
    expect(mockAddOrder).toHaveBeenCalledTimes(1);
});

it('help should be pushed on history on click go to help button', () => {
    const mock = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    wrapper = shallow(<Orders customers={mocks.getCustomers()} orders={[]} history={mockHistory} />);

    wrapper.find('#go-to-help-button').simulate('click');
    expect(history).toHaveLength(1);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(history[0]).toBe('/help');
});

it('should not crash if cant find customer, but show ? instead of name', () => {
    initialState.data.customers = [];
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedOrders /></Provider>);

    expect(wrapper.contains('?')).toBe(true);
});