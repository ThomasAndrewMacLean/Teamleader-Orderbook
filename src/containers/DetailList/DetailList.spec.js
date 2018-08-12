import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedDetailList, { DetailList } from './DetailList';
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
    jest.useFakeTimers();
    DetailList.prototype._slider = { addEventListener };

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
    wrapper = shallow(<DetailList order={mocks.getOrders()[0]} item={mocks.getOrders()[0].items[0]} products={mocks.getProducts()} addQuantity={mockAddQuantity} deleteProduct={mockDeleteProduct} />);
});


it('snapshot', () => {
    const tree = wrapper;
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ConnectedDetailList /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});


it('renders .... if no item is set', () => {
    wrapper = shallow(<DetailList order={mocks.getOrders()[0]} products={mocks.getProducts()} addQuantity={mockAddQuantity} deleteProduct={mockDeleteProduct} />);
    expect(wrapper.contains('....')).toBeTruthy();
});
it('renders .... if no products are loaded', () => {
    wrapper = shallow(<DetailList order={mocks.getOrders()[0]} products={[]} item={mocks.getOrders()[0].items[0]} addQuantity={mockAddQuantity} deleteProduct={mockDeleteProduct} />);
    expect(wrapper.contains('....')).toBeTruthy();
});
it('does not render .... if all is set', () => {
    expect(wrapper.contains('....')).toBeFalsy();
});
it('does render productId if all is set', () => {
    expect(wrapper.contains('B102')).toBeTruthy();
});
it('does render productName if all is set', () => {
    expect(wrapper.contains('Press button')).toBeTruthy();
});
it('does render quantity if all is set', () => {
    expect(wrapper.contains('10')).toBeTruthy();
});
it('does render unit price if all is set', () => {  
    expect(wrapper.html().includes('4.99')).toBeTruthy();
});
it('does render totalPrice if all is set', () => {
    expect(wrapper.html().includes('49.90')).toBeTruthy();
});
it('first round buttons trigger add quantity with -1', () => {
    wrapper.find('.round-button').at(0).simulate('click');
    expect(mockAddQuantity).toHaveBeenCalledWith(-1, 'B102', '1');
});
it('second round buttons trigger add quantity with 1', () => {
    wrapper.find('.round-button').at(1).simulate('click');
    expect(mockAddQuantity).toHaveBeenCalledWith(1, 'B102', '1');
});
it('deletePrompt is not visible initially', () => {
    expect(wrapper.find('.delete-prompt').hasClass('show-delete')).toBeFalsy();
});

it('delete-cross click shows deletePrompt', () => {
    wrapper.find('.delete-cross').simulate('click');
    expect(wrapper.find('.delete-prompt').hasClass('show-delete')).toBeTruthy();
});
it('no-button click hides deletePrompt', () => {
    wrapper.find('.delete-cross').simulate('click');
    wrapper.find('.no-button').simulate('click');

    expect(wrapper.find('.delete-prompt').hasClass('show-delete')).toBeFalsy();
});
it('yes-button click hides deletePrompt', () => {
    wrapper.find('.delete-cross').simulate('click');
    wrapper.find('.yes-button').simulate('click');

    expect(wrapper.find('.delete-prompt').hasClass('show-delete')).toBeFalsy();
});
it('yes-button click triggers deletefunction with product id and order id', () => {
    wrapper.find('.delete-cross').simulate('click');
    wrapper.find('.yes-button').simulate('click');



    //setTimeout(() => {
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 300);
    // }, 300);
});

it('yes-button click does not trigger deletefunction if product has been placed', () => {
    let order = mocks.getOrders()[0];
    order.hasBeenPlaced = true;
    wrapper = shallow(<DetailList order={order} item={mocks.getOrders()[0].items[0]} products={mocks.getProducts()} addQuantity={mockAddQuantity} deleteProduct={mockDeleteProduct} />);

    wrapper.find('.delete-cross').simulate('click');
    wrapper.find('.yes-button').simulate('click');

    //setTimeout(() => {
    expect(setTimeout).not.toHaveBeenCalled(); //done();
    //}, 300);
});

it('yes-button click does not trigger setTimeout if product has been placed', () => {
    jest.useFakeTimers();
    let order = mocks.getOrders()[0];
    order.hasBeenPlaced = true;
    wrapper = shallow(<DetailList order={order} item={mocks.getOrders()[0].items[0]} products={mocks.getProducts()} addQuantity={mockAddQuantity} deleteProduct={mockDeleteProduct} />);

    wrapper.find('.delete-cross').simulate('click');
    wrapper.find('.yes-button').simulate('click');

    expect(setTimeout).not.toHaveBeenCalled();
});
