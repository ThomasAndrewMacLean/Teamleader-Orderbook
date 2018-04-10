import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import Detail from './containers/Detail/Detail';
import Help from './containers/Help/Help';
import Loader from './components/Loader/Loader';
import Toaster from './components/Toaster/Toaster';

import { Provider } from 'react-redux';
import configStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { loadOrders, loadProducts, loadCustomers } from './actions/actions';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
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
        <div>
            <Route exact path="/" component={App} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/help" component={Help} />
            <Route path="/loader" component={Loader} />
            <Toaster />
        </div>
    </ConnectedRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
