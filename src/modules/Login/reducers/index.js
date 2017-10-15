/**
 * @file Login reducer
 * @author Created by geekzwb on 2017/10/13.
 */
// lib
import {fromJS} from 'immutable';
import store from 'store';

// action types
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED} from '../actions';

const $$initialState = fromJS({
  status: 'wait',
  isAuthenticated: !!store.get('access_token'),
  message: '',
  user: {
    id: '',
    name: '',
    email: '',
    createdAt: '',
    updatedAt: ''
  }
});

const authReducer = ($$state = $$initialState, {type, payload = {}}) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return $$state.set('status', 'request');
    }
    case LOGIN_SUCCESS: {
      store.set('access_token', payload.access_token);
      store.set('refresh_token', payload.refresh_token);
      return $$state.set('status', 'success').set('isAuthenticated', true);
    }
    case LOGIN_FAILED: {
      store.clearAll();
      return $$state.set('status', 'failed').set('message', payload.message);
    }
    default:
      return $$state;
  }
};

export default authReducer;