/**
 * @file Customer reducer
 * @author Created by geekzwb on 2017/10/23.
 */
// lib
import { fromJS } from 'immutable';

// action types
import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILED,

  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILED,

  ADD_CUSTOMER_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAILED,

  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILED,
} from '../actions';

const $$initialState = fromJS({
  status: 'customer_wait',
  message: '',
  total: 0,
  customers: {
    total: 0,
    data: [],
    current_page: 1,
    per_page: 10
  },
});

const customersReducer = ($$state = $$initialState, {type, payload}) => {
  switch (type) {
    case GET_CUSTOMERS_REQUEST: {
      return $$state.set('status', 'customer_request');
    }
    case GET_CUSTOMERS_SUCCESS: {
      return $$state.set('status', 'customer_success').set('customers', fromJS(payload)).set('message', '');
    }
    case GET_CUSTOMERS_FAILED: {
      return $$state.set('status', 'customer_failed').set('message', payload.message);
    }

    // 更新
    case UPDATE_CUSTOMER_REQUEST: {
      return $$state.set('status', 'update_request').set('message', '');
    }
    case UPDATE_CUSTOMER_SUCCESS: {
      return $$state.set('status', 'update_success').set('message', '');
    }
    case UPDATE_CUSTOMER_FAILED: {
      return $$state.set('status', 'update_fail').set('message', payload.message);
    }

    // 新增
    case ADD_CUSTOMER_REQUEST: {
      return $$state.set('status', 'add_request').set('message', '');
    }
    case ADD_CUSTOMER_SUCCESS: {
      return $$state.set('status', 'add_success').set('message', '');
    }
    case ADD_CUSTOMER_FAILED: {
      return $$state.set('status', 'add_fail').set('message', payload.message);
    }

    // 删除
    case DELETE_CUSTOMER_REQUEST: {
      return $$state.set('status', 'delete_request').set('message', '');
    }
    case DELETE_CUSTOMER_SUCCESS: {
      return $$state.set('status', 'delete_success').set('message', '');
    }
    case DELETE_CUSTOMER_FAILED: {
      return $$state.set('status', 'delete_fail').set('message', payload.message);
    }

    default:
      return $$state;
  }
};

export default customersReducer;