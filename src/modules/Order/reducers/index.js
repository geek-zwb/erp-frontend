/**
 * @file Order reducer
 * @author Created by geekzwb on 2017/10/30.
 */
// lib
import { fromJS } from 'immutable';

// action types
import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,

  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_FAILED,

  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILED,

  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILED,
} from '../actions';

const $$initialState = fromJS({
  status: 'order_wait',
  message: '',
  total: 0,
  orders: {
    total: 0,
    data: [],
    current_page: 1,
    per_page: 10
  },
});

const ordersReducer = ($$state = $$initialState, {type, payload}) => {
  switch (type) {
    case GET_ORDERS_REQUEST: {
      return $$state.set('status', 'order_request');
    }
    case GET_ORDERS_SUCCESS: {
      return $$state.set('status', 'order_success').set('orders', fromJS(payload));
    }
    case GET_ORDERS_FAILED: {
      return $$state.set('status', 'order_failed').set('message', payload.message);
    }

    // 更新
    case UPDATE_ORDERS_REQUEST: {
      return $$state.set('status', 'update_request').set('message', '');
    }
    case UPDATE_ORDERS_SUCCESS: {
      return $$state.set('status', 'update_success').set('message', '');
    }
    case UPDATE_ORDERS_FAILED: {
      return $$state.set('status', 'update_fail').set('message', payload.message);
    }

    // 新增
    case ADD_ORDER_REQUEST: {
      return $$state.set('status', 'add_request').set('message', '');
    }
    case ADD_ORDER_SUCCESS: {
      return $$state.set('status', 'add_success').set('message', '');
    }
    case ADD_ORDER_FAILED: {
      return $$state.set('status', 'add_fail').set('message', payload.message);
    }

    // 删除
    case DELETE_ORDER_REQUEST: {
      return $$state.set('status', 'delete_request').set('message', '');
    }
    case DELETE_ORDER_SUCCESS: {
      return $$state.set('status', 'delete_success').set('message', '');
    }
    case DELETE_ORDER_FAILED: {
      return $$state.set('status', 'delete_fail').set('message', payload.message);
    }

    default:
      return $$state;
  }
};

export default ordersReducer;