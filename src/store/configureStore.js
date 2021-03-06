import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './../reducers/reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';



const logger = createLogger({
    collapsed: true
});

const history = createHistory();
const routerMw = routerMiddleware(history);

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

//es
const middleware = process.env.NODE_ENV !== 'production' ? // eslint-disable-line no-undef
    [require('redux-immutable-state-invariant').default(), routerMw, logger, thunk] :
    [routerMw, logger, thunk];

export default function configureStore() {
    return createStore(

        rootReducer,
        composeEnhancers(
            applyMiddleware(...middleware))
    );
}
