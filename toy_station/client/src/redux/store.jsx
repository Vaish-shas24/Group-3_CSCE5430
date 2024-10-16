import { createStore, combineReducers, applyMiddleware } from 'redux';
import { cartReducer } from './reducers/cartReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
