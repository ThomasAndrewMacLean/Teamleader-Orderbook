import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { loadOrders, loadProducts, loadCustomers } from './actions/actions';


import { ConnectedRouter } from 'react-router-redux';

import Routes from './containers/Routes/Routes';
import createHistory from 'history/createBrowserHistory';
import './index.css';

const history = createHistory();
const store = configStore();

// // TURN ON FOR DEBUGGING STATE
// store.subscribe(() => {
//     console.log(store.getState());
// });

store.dispatch(loadProducts());
store.dispatch(loadOrders());
store.dispatch(loadCustomers());


ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
        <Routes />
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
