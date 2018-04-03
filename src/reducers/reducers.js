import { combineReducers } from 'redux';
import orders from './orderReducer';
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
    // short hand property names
    orders,
    router: routerReducer
})

export default rootReducer;