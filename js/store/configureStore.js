import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {devTools, persistState} from 'redux-devtools';
import * as reducers from '../reducers/index';
import Immutable, {Map} from 'immutable';

let createStoreWithMiddleware;

// Configure the dev tools when in DEV mode
if (__DEV__) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

let combineImmutableReducers = reducers => {
  var combined_reducers = combineReducers(reducers);

  return (state,action) => Map(combined_reducers(
      Map.isMap(state) ? state.toObject() : state,action
  ));
}

const rootReducer = combineImmutableReducers(reducers);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
