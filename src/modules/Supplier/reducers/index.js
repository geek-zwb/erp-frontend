/**
 * @file Supplier reducer
 * @author Created by geekzwb on 2017/10/28.
 */
// lib
import { fromJS } from 'immutable';

// action types
import {
  GET_SUPPLIERS_REQUEST,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_FAILED,

  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_FAILED,

  ADD_SUPPLIER_REQUEST,
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_FAILED,

  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAILED,
} from '../actions';

const $$initialState = fromJS({
  status: 'wait',
  message: '',
  suppliers: [],
});

const suppliersReducer = ($$state = $$initialState, {type, payload}) => {
  switch (type) {
    case GET_SUPPLIERS_REQUEST: {
      return $$state.set('status', 'request');
    }
    case GET_SUPPLIERS_SUCCESS: {
      return $$state.set('status', 'success').set('suppliers', fromJS(payload));
    }
    case GET_SUPPLIERS_FAILED: {
      return $$state.set('status', 'failed').set('message', payload.message);
    }

    // 更新
    case UPDATE_SUPPLIER_REQUEST: {
      return $$state.set('status', 'update_request');
    }
    case UPDATE_SUPPLIER_SUCCESS: {
      return $$state.set('status', 'update_success').set('suppliers', payload);
    }
    case UPDATE_SUPPLIER_FAILED: {
      return $$state.set('status', 'update_fail').set('message', payload.message);
    }

    // 新增
    case ADD_SUPPLIER_REQUEST: {
      return $$state.set('status', 'add_request');
    }
    case ADD_SUPPLIER_SUCCESS: {
      const $$newSuppliers = $$state.get('suppliers').push(fromJS(payload));
      return $$state.set('status', 'add_success').set('suppliers', $$newSuppliers);
    }
    case ADD_SUPPLIER_FAILED: {
      return $$state.set('status', 'add_fail').set('message', payload.message);
    }

    // 删除
    case DELETE_SUPPLIER_REQUEST: {
      return $$state.set('status', 'delete_request');
    }
    case DELETE_SUPPLIER_SUCCESS: {
      const $$newSuppliers = $$state.get('suppliers').delete(payload.index);
      return $$state.set('status', 'delete_success').set('suppliers', $$newSuppliers);
    }
    case DELETE_SUPPLIER_FAILED: {
      return $$state.set('status', 'delete_fail').set('message', payload.message);
    }

    default:
      return $$state;
  }
};

export default suppliersReducer;