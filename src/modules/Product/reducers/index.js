/**
 * @file Product reducer
 * @author Created by geekzwb on 2017/10/31.
 */
// lib
import { fromJS } from 'immutable';

// action types
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,

  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,

  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,

  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
} from '../actions';

const $$initialState = fromJS({
  status: 'product_wait',
  message: '',
  total: 0,
  products: {
    total: 0,
    data: [],
    current_page: 1,
    per_page: 10
  },
});

const productsReducer = ($$state = $$initialState, {type, payload}) => {
  switch (type) {
    case GET_PRODUCTS_REQUEST: {
      return $$state.set('status', 'product_request');
    }
    case GET_PRODUCTS_SUCCESS: {
      return $$state.set('status', 'product_success').set('products', fromJS(payload));
    }
    case GET_PRODUCTS_FAILED: {
      return $$state.set('status', 'product_failed').set('message', payload.message);
    }

    // 更新
    case UPDATE_PRODUCT_REQUEST: {
      return $$state.set('status', 'update_request').set('message', '');
    }
    case UPDATE_PRODUCT_SUCCESS: {
      return $$state.set('status', 'update_success').set('message', '');
    }
    case UPDATE_PRODUCT_FAILED: {
      return $$state.set('status', 'update_fail').set('message', payload.message);
    }

    // 新增
    case ADD_PRODUCT_REQUEST: {
      return $$state.set('status', 'add_request').set('message', '');
    }
    case ADD_PRODUCT_SUCCESS: {
      return $$state.set('status', 'add_success').set('message', '');
    }
    case ADD_PRODUCT_FAILED: {
      return $$state.set('status', 'add_fail').set('message', payload.message);
    }

    // 删除
    case DELETE_PRODUCT_REQUEST: {
      return $$state.set('status', 'delete_request').set('message', '');
    }
    case DELETE_PRODUCT_SUCCESS: {
      return $$state.set('status', 'delete_success').set('message', '');
    }
    case DELETE_PRODUCT_FAILED: {
      return $$state.set('status', 'delete_fail').set('message', payload.message);
    }

    default:
      return $$state;
  }
};

export default productsReducer;