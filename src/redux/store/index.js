/**
 * Created by geekzwb on 2017/8/8.
 * What for:
 */
import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux-immutable';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import saga from '../sagas';

// use browser history
export const history = createHistory();

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

const middlewares = [routerMiddleware(history), sagaMiddleware];

const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares), window.devToolsExtension && window.devToolsExtension()));

sagaMiddleware.run(saga);

export default store;