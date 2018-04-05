import { combineReducers } from 'redux';
import data from './dataReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
    // short hand property names
    data,
    router: routerReducer
});

export default rootReducer;