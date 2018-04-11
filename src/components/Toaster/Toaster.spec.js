import React from 'react';
import ReactDOM from 'react-dom';

import ConnectedToaster, { Toaster } from './Toaster';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import * as mocks from './../../test-helpers/mocks';
import renderer from 'react-test-renderer';


const mockStore = configureStore();

let initialState;
let store;
let wrapper;
let shallowWrapper;

const mockClearToast = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    initialState = {
        data: {
            toast: {}
        }
    };
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedToaster /></Provider>);
    shallowWrapper = shallow(<Toaster clearToast={mockClearToast} toast={mocks.getToast()} />);
});

it('snapshot', () => {
    const tree = renderer
        .create(<Provider store={store}><ConnectedToaster /></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('snapshot2', () => {
    store.toast = mocks.getToast();
    const tree = renderer
        .create(<Provider store={store}><ConnectedToaster /></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('should not be visible if toast msg is empty', () => {
    expect(wrapper.find('.toast').hasClass('show-toast')).toBeFalsy();
});

it('should  be visible if toast msg is not empty', () => {
    initialState = {
        data: {
            toast: mocks.getToast()
        }
    };
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedToaster /></Provider>);
    expect(wrapper.find('.toast').hasClass('show-toast')).toBeTruthy();
});

it('should display the message in the toast msg div', () => {
    expect(shallowWrapper.find('.toast-msg').text()).toBe('hello this is a toast');
});


it('function to clear toast runs after 3000 timeout', () => {

    let toast = { msg: 'foo', type: 'info' };
    let node = document.createElement('div');
    ReactDOM.render(<Toaster toast={toast} />, node);

    toast.msg = 'bar';
    ReactDOM.render(<Toaster toast={toast} />, node);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
});


it('should  have the class as defined in the type', () => {
    initialState = {
        data: {
            toast: mocks.getToast()
        }
    };
    initialState.data.toast.type = 'blablabla';
    store = mockStore(initialState);
    wrapper = mount(<Provider store={store}><ConnectedToaster /></Provider>);
    expect(wrapper.find('.toast-msg').hasClass('blablabla')).toBeTruthy();
});