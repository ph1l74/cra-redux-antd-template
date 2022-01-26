import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initState } from '../constants';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const configureStore = () =>
    createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)))


export default configureStore;