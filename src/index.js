import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import {history} from './redux/store';
import store from './redux/store';

// routes
import Routes from './routes';

// global styles
import './styles/icon.css';
import './styles/global.css';

console.log('store', store.getState().get('auth'));

// ================================
// 将根组件挂载到 DOM，启动！
// ================================
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes isAuthenticated={store.getState().getIn(['auth', 'isAuthenticated'])} />
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));

// 渐进式增强
registerServiceWorker();
