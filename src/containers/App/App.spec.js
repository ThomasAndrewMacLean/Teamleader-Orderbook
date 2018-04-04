import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const initialState = {
    orders: {
        orders: [],
        products: [],
        users: []
    }
};

// {
//   'id': '1',
//   'customer-id': '1',
//   'items': [{
//       'product-id': 'B102',
//       'quantity': '10',
//       'unit-price': '4.99',
//       'total': '49.90'
//   }],
//   'total': '49.90'
// }

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

