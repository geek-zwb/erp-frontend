/**
 * @file Purchase reducer
 * @author Created by geekzwb on 2017/10/23.
 */
// lib
import { fromJS } from 'immutable';

// action types
import {
  GET_PURCHASES_REQUEST,
  GET_PURCHASES_SUCCESS,
  GET_PURCHASES_FAILED,

  UPDATE_PURCHASES_REQUEST,
  UPDATE_PURCHASES_SUCCESS,
  UPDATE_PURCHASES_FAILED,

  ADD_PURCHASE_REQUEST,
  ADD_PURCHASE_SUCCESS,
  ADD_PURCHASE_FAILED,

  DELETE_PURCHASE_REQUEST,
  DELETE_PURCHASE_SUCCESS,
  DELETE_PURCHASE_FAILED,
} from '../actions';

const $$initialState = fromJS({
  status: 'purchase_wait',
  message: '',
  total: 0,
  purchases: {
    total: 0,
    data: [],
    current_page: 1,
    per_page: 10
  },
});

const purchasesReducer = ($$state = $$initialState, {type, payload}) => {
  switch (type) {
    case GET_PURCHASES_REQUEST: {
      return $$state.set('status', 'purchase_request');
    }
    case GET_PURCHASES_SUCCESS: {
      return $$state.set('status', 'purchase_success').set('purchases', fromJS(payload));
    }
    case GET_PURCHASES_FAILED: {
      return $$state.set('status', 'purchase_failed').set('message', payload.message);
    }

    // 更新
    case UPDATE_PURCHASES_REQUEST: {
      return $$state.set('status', 'update_request').set('message', '');
    }
    case UPDATE_PURCHASES_SUCCESS: {
      return $$state.set('status', 'update_success').set('message', '');
    }
    case UPDATE_PURCHASES_FAILED: {
      return $$state.set('status', 'update_fail').set('message', payload.message);
    }

    // 新增
    case ADD_PURCHASE_REQUEST: {
      return $$state.set('status', 'add_request').set('message', '');
    }
    case ADD_PURCHASE_SUCCESS: {
      return $$state.set('status', 'add_success').set('message', '');
    }
    case ADD_PURCHASE_FAILED: {
      return $$state.set('status', 'add_fail').set('message', payload.message);
    }

    // 删除
    case DELETE_PURCHASE_REQUEST: {
      return $$state.set('status', 'delete_request').set('message', '');
    }
    case DELETE_PURCHASE_SUCCESS: {
      return $$state.set('status', 'delete_success').set('message', '');
    }
    case DELETE_PURCHASE_FAILED: {
      return $$state.set('status', 'delete_fail').set('message', payload.message);
    }

    default:
      return $$state;
  }
};

export default purchasesReducer;