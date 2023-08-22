import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../Reducer/reducer';
import thunkMiddleware from 'redux-thunk'
// Conectamos con la extension del navegador => REDUX DEVTOOLS
const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Hacemos peticiones a un servidor
const store = createStore(reducer, composeEnhacer(applyMiddleware(thunkMiddleware)));

export default store;