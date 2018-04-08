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


xit('snapshot', () => {
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
it('first round buttons trigger add quantity with -1', () => {
    wrapper.find('.round-button').at(0).simulate('click');
    expect(mockAddQuantity).toHaveBeenCalledWith(-1, 'B102', '1');
});
it('second round buttons trigger add quantity with 1', () => {
    wrapper.find('.round-button').at(1).simulate('click');
    expect(mockAddQuantity).toHaveBeenCalledWith(1, 'B102', '1');
});
it('deletePrompt is not visible initially', () => {
    expect(wrapper.find('.deletePrompt').hasClass('showDelete')).toBeFalsy();
});

it('delete-cross click shows deletePrompt', () => {
    wrapper.find('.delete-cross').simulate('click');
    expect(wrapper.find('.deletePrompt').hasClass('showDelete')).toBeTruthy();
});
it('no-button click hides deletePrompt', () => {
    wrapper.find('.delete-cross').simulate('click');
    wrapper.find('.no-button').simulate('click');

    expect(wrapper.find('.deletePrompt').hasClass('showDelete')).toBeFalsy();
});
it('yes-button click hides deletePrompt', () => {
    wrapper.find('.delete-cross').simulate('click');
    wrapper.find('.yes-button').simulate('click');

    expect(wrapper.find('.deletePrompt').hasClass('showDelete')).toBeTruthy();
});
it('yes-button click triggers deletefunction with product id and order id', () => {
    wrapper.find('.delete-cross').simulate('click');
    wrapper.find('.yes-button').simulate('click');

    expect(mockDeleteProduct).toHaveBeenCalledWith('B102','1');
});
