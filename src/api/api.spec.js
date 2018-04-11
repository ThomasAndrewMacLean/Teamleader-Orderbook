import Api, * as endpoints from './api';


beforeEach(() => {
    fetch.resetMocks();
});



it('getAllOrders return json', () => {
    fetch.mockResponseOnce(JSON.stringify({ order: '12345' }));

    Api.getAllOrders().then(res => {

        expect(res.order).toBe('12345');
    });

    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(endpoints.apiEndpointOrders);
});

it('getAllProducts return json', () => {
    fetch.mockResponseOnce(JSON.stringify({ products: '12345' }));

    Api.getAllProducts().then(res => {

        expect(res.products).toBe('12345');
    });

    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(endpoints.apiEndpointProducts);
});

it('getAllCustomers return json', () => {
    fetch.mockResponseOnce(JSON.stringify({ customer: '12345' }));

    Api.getAllCustomers().then(res => {

        expect(res.customer).toBe('12345');
    });

    expect(fetch.mock.calls).toHaveLength(1);
    expect(fetch.mock.calls[0][0]).toEqual(endpoints.apiEndpointCustomers);
});

it('checkForDiscount checks for discount', () => {

    let order = { id: 1, name: 'hello' };
    fetch.mockResponseOnce(JSON.stringify(order));

    Api.checkForDiscount(order).then(res => {

        expect(res.name).toBe('hello');
    });

    expect(fetch.mock.calls).toHaveLength(1);

    expect(fetch.mock.calls[0][0]).toBe(endpoints.apiEndpointCheckForDiscount);
    expect(fetch.mock.calls[0][1].headers.Accept).toBe('application/json');
    expect(fetch.mock.calls[0][1].headers['Content-Type']).toBe('application/json');
    expect(fetch.mock.calls[0][1].method).toBe('POST');
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ order }));

    
});