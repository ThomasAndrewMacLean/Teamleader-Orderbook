import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedList, { List } from './List';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import * as mocks from './../../test-helpers/mocks';
import renderer from 'react-test-renderer';

const mockStore = configureStore();

let initialState;
let store;
let wrapper;

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
    // wrapper = mount(<Provider store={store}><ConnectedList /></Provider>);
    wrapper = shallow(<List order={mocks.getOrders()[0]} customers={mocks.getCustomers()} />);
});

it('snapshot', () => {
    const tree = renderer
        .create(<List />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('snapshot2', () => {
    const tree = renderer
        .create(<Provider store={store}><ConnectedList /></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ConnectedList /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders .... if no order is set', () => {
    wrapper = shallow(<List customers={mocks.getCustomers()} />);
    expect(wrapper.contains('....')).toBeTruthy();
});

it('renders .... if no customers are loaded', () => {
    wrapper = shallow(<List customers={[]} order={mocks.getOrders()[0]} />);
    expect(wrapper.contains('....')).toBeTruthy();
});

it('does not render .... if customers are loaded and order is set', () => {
    expect(wrapper.contains('....')).toBeFalsy();
});

it('renders count of items in order', () => {
    let order ={
        items:[{},{},{},{},{}],
    };

    wrapper = shallow(<List order={order} customers={[{}]} />);
    expect(wrapper.text()).toContain('5');
});

it('renders orderID', () => {
    let order ={
        items:[],
        id:'orderID'
    };

    wrapper = shallow(<List order={order} customers={[{}]} />);
    expect(wrapper.text()).toContain('orderID');
});

it('renders name from customer array', () => {
    let order ={
        items:[],
        'customer-id':999
    };
    let customer = {
        id:999,
        name:'Thomas MacLean'
    };

    wrapper = shallow(<List order={order} customers={[customer]} />);
    expect(wrapper.text()).toContain('Thomas MacLean');
});

it('renders ? from customer array if cant find id', () => {
    let order ={
        items:[]
    };
    order['customer-id']='non existing id';
    wrapper = shallow(<List order={order} customers={mocks.getCustomers()} />);
    expect(wrapper.text()).toContain('?');
});

it('renders price with nice formatting', () => {
    expect(wrapper.text()).toContain('€');
});

it('click gotoDetailbutton sets selected order', () => {

    const mock = jest.fn();
    const mockSetSelectedOrder = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    wrapper = shallow(<List setSelectedOrder={mockSetSelectedOrder} order={mocks.getOrders()[0]} customers={mocks.getCustomers()} history={mockHistory} />);
    wrapper.find('.go-to-details-button').simulate('click');

    expect(mockSetSelectedOrder).toHaveBeenCalledTimes(1);
});

it('click gotoDetailbutton sets pushes detail and id on history', () => {

    const mock = jest.fn();
    const mockSetSelectedOrder = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    wrapper = shallow(<List setSelectedOrder={mockSetSelectedOrder} order={mocks.getOrders()[0]} customers={mocks.getCustomers()} history={mockHistory} />);

    wrapper.find('.go-to-details-button').simulate('click');

    let id = mocks.getOrders()[0].id;
    expect(history).toHaveLength(1);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(history[0]).toBe('/detail/' + id);
});

