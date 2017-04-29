import {
	applyMiddleware,
	createStore,
	combineReducers,
	compose,
} from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';
import thunkMiddleware from 'redux-thunk';

let middleware = [thunkMiddleware];

if (__DEV__) {
	middleware = [
		...middleware,
		createLogger(),
	];
}

const createStoreWithMiddleware = compose(
	applyMiddleware(...middleware),
)(createStore);

const reducer = combineReducers(rootReducer);
const store = createStoreWithMiddleware(reducer);

export default store;
