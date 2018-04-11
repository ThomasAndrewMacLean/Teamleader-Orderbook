import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedDetail, { Detail } from './Detail';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import * as mocks from './../../test-helpers/mocks';

const mockStore = configureStore();

let initialState;
let store;
let wrapper;

beforeEach(() => {
    jest.clearAllMocks();
    Detail.prototype._slider = { addEventListener };

    initialState = {
        data: {
            orders: mocks.getOrders(),
            products: mocks.getProducts(),
            customers: mocks.getCustomers(),
            selectedOrder: mocks.getOrders()[0]
        }
    };
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState);
    //wrapper = mount(<Provider store={store}><ConnectedList /></Provider>);
    wrapper = shallow(<Detail order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);
});

it('test', () => {
    expect(wrapper).toBeTruthy();
});

it('snapshot', () => {
    const tree = wrapper;
    expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><ConnectedDetail /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders orderId in header', () => {
    expect(wrapper.find('.App-header').text()).toContain('id: 1');
});

it('renders customername in header', () => {
    expect(wrapper.find('.App-header').text()).toContain('customer: Coca Cola');
});

it('renders total in header', () => {
    expect(wrapper.find('.App-header').text()).toContain('49.90');
});

it('renders total with discount in header, if order has discount', () => {
    let order = mocks.getOrders()[0];
    order.priceWithDiscount = '66.66';
    order.discount = true;
    wrapper = shallow(<Detail order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    expect(wrapper.find('.App-header').text()).toContain('66.66');
});

it('doesnt add class discount, if order has no discount', () => {
    expect(wrapper.find('.discount')).toHaveLength(0);
});

it('adds class discount, if order has discount', () => {
    let order = mocks.getOrders()[0];
    order.priceWithDiscount = '66.66';
    order.discount = true;
    wrapper = shallow(<Detail order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    expect(wrapper.find('.discount')).toHaveLength(1);
});

it('doesnt renders total with discount in header, if order has no discount', () => {
    let order = mocks.getOrders()[0];
    order.priceWithDiscount = '66.66';
    order.discount = 0;
    wrapper = shallow(<Detail order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    expect(wrapper.find('.App-header').text()).not.toContain('66.66');
});

it('renders back button in header', () => {
    expect(wrapper.find('.App-header').text()).toContain('BACK');
});

it('back button calls function goHome', () => {
    const mock = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    wrapper = shallow(<Detail history={mockHistory} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    const spy = jest.spyOn(Detail.prototype, 'goHome');
    wrapper.find('#back-button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
});

it('if detail id is not correct it calls function goHome', () => {
    const mock = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    let order = mocks.getOrders()[0];

    let match = {
        params: {
            id: '666'
        }
    };
    const spy = jest.spyOn(Detail.prototype, 'goHome');
    let node = document.createElement('div');
    ReactDOM.render(<Provider test={'foo'} store={store}><Detail store={store} match={match} history={mockHistory} orders={mocks.getOrders()} order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} /></Provider>, node);
    order.id = undefined;

    ReactDOM.render(<Provider test={'bar'} store={store}><Detail store={store} match={match} history={mockHistory} orders={mocks.getOrders()} order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} /></Provider>, node);

    expect(spy).toHaveBeenCalledTimes(1);
});


it('if detail id is correct it calls function setSelectedOrder', () => {
    const mock = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    const mockSetSelected = jest.fn();

    let order = mocks.getOrders()[0];

    let match = {
        params: {
            id: '1'
        }
        
    };

    let node = document.createElement('div');
    ReactDOM.render(<Provider test={'foo'} store={store}><Detail setSelectedOrder={mockSetSelected} store={store} match={match} history={mockHistory} orders={mocks.getOrders()} order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} /></Provider>, node);
    order.id = undefined;

    ReactDOM.render(<Provider test={'bar'} store={store}><Detail setSelectedOrder={mockSetSelected} store={store} match={match} history={mockHistory} orders={mocks.getOrders()} order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} /></Provider>, node);

    expect(mockSetSelected).toHaveBeenCalledTimes(1);
});


it('back button pushes / on history', () => {
    const mock = jest.fn();
    let history = [];
    const mockHistory = { push: (x) => mock(history.push(x)) };

    wrapper = shallow(<Detail history={mockHistory} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    wrapper.find('#back-button').simulate('click');
    expect(history).toHaveLength(1);
    expect(history[0]).toBe('/');
});

it('modal isnt shown initially', () => {
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
});

it('modal is shown after add product button click', () => {
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
    wrapper.find('#add-product-button').simulate('click');
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(true);
});

it('modal is no longer shown after cancel button click', () => {
    wrapper.find('#add-product-button').simulate('click');
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(true);
    wrapper.find('#cancel-button').simulate('click');
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
});

it('modal only shows products not in items', () => {
    let productsOnModal = [];
    wrapper.find('.add-product-list').forEach(apl => productsOnModal.push(apl.text()));

    mocks.getOrders()[0].items.forEach(item => {
        expect(productsOnModal.includes(item.description)).not.toBeTruthy();
    });

});

it('add product button fires function add product', () => {
    const mockcheckForDiscount = jest.fn();
    const mockaddProduct = jest.fn();
    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} addProduct={mockaddProduct} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    wrapper.find('.add-product-list').first().simulate('click');

    expect(mockaddProduct).toHaveBeenCalled();
});

it('add product button fires function check for discount', () => {
    const mockcheckForDiscount = jest.fn();
    const mockaddProduct = jest.fn();
    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} addProduct={mockaddProduct} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    wrapper.find('.add-product-list').first().simulate('click');

    expect(mockcheckForDiscount).toHaveBeenCalled();
});

it('add product button closes modal', () => {
    const mockcheckForDiscount = jest.fn();
    const mockaddProduct = jest.fn();

    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} addProduct={mockaddProduct} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);
    wrapper.find('#add-product-button').simulate('click');
    wrapper.find('.add-product-list').first().simulate('click');
    expect(wrapper.find('.modal').hasClass('show-modal')).toBe(false);
});

it('place order button places order', () => {
    const mockcheckForDiscount = jest.fn();
    const mockplaceOrder = jest.fn();
    const mockAddToast = jest.fn();
    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} addToast={mockAddToast} placeOrder={mockplaceOrder}
        order={mocks.getOrders()[0]} products={mocks.getProducts()}
        customers={mocks.getCustomers()} />);
    wrapper.find('#place-order-button').simulate('click');
    expect(mockplaceOrder).toHaveBeenCalled();
});


it('place order button checks discount', () => {
    const mockcheckForDiscount = jest.fn();
    const mockplaceOrder = jest.fn();
    const mockAddToast = jest.fn();

    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} addToast={mockAddToast} placeOrder={mockplaceOrder} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);
    wrapper.find('#place-order-button').simulate('click');
    expect(mockcheckForDiscount).toHaveBeenCalled();
});

it('place order button adds toast', () => {
    const mockcheckForDiscount = jest.fn();
    const mockplaceOrder = jest.fn();
    const mockAddToast = jest.fn();

    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} addToast={mockAddToast} placeOrder={mockplaceOrder} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);
    wrapper.find('#place-order-button').simulate('click');
    expect(mockAddToast).toHaveBeenCalled();
});

it('reopen order button reopens order', () => {
    const mockcheckForDiscount = jest.fn();
    const mockreopenOrder = jest.fn();

    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} reopenOrder={mockreopenOrder} order={mocks.getOrders()[0]} products={mocks.getProducts()} customers={mocks.getCustomers()} />);
    wrapper.find('#reopen-order-button').simulate('click');
    expect(mockreopenOrder).toHaveBeenCalled();
});

it('order has not been placed no extra class added to place order button', () => {
    expect(wrapper.find('#place-order-button').hasClass('order-placed-hide')).toBe(false);
});

it('order has been placed adds class to place order button', () => {
    const mockcheckForDiscount = jest.fn();
    const mockplaceOrder = jest.fn();
    let order = mocks.getOrders()[0];
    order.hasBeenPlaced = true;
    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} placeOrder={mockplaceOrder} order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    expect(wrapper.find('#place-order-button').hasClass('order-placed-hide')).toBe(true);
});

it('order has not been placed no extra class added to add product button', () => {
    expect(wrapper.find('#add-product-button').hasClass('order-placed-hide')).toBe(false);
});

it('order has been placed adds class to add product button', () => {
    const mockcheckForDiscount = jest.fn();
    const mockplaceOrder = jest.fn();
    let order = mocks.getOrders()[0];
    order.hasBeenPlaced = true;
    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} placeOrder={mockplaceOrder} order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    expect(wrapper.find('#add-product-button').hasClass('order-placed-hide')).toBe(true);
});
it('order has not been placed adds extra class added to reopen order button', () => {
    expect(wrapper.find('#reopen-order-button').hasClass('order-placed-hide')).toBe(true);
});

it('order has been placed adds no extra class to reopen order button', () => {
    const mockcheckForDiscount = jest.fn();
    const mockplaceOrder = jest.fn();
    let order = mocks.getOrders()[0];
    order.hasBeenPlaced = true;
    wrapper = shallow(<Detail checkForDiscount={mockcheckForDiscount} placeOrder={mockplaceOrder} order={order} products={mocks.getProducts()} customers={mocks.getCustomers()} />);

    expect(wrapper.find('#reopen-order-button').hasClass('order-placed-hide')).toBe(false);
});
