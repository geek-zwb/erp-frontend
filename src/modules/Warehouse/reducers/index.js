/**
 * @file Warehouse reducer
 * @author Created by geekzwb on 2017/10/28.
 */
// lib
import { fromJS } from 'immutable';

// action types
import {
  GET_WAREHOUSES_REQUEST,
  GET_WAREHOUSES_SUCCESS,
  GET_WAREHOUSES_FAILED,

  UPDATE_WAREHOUSE_REQUEST,
  UPDATE_WAREHOUSE_SUCCESS,
  UPDATE_WAREHOUSE_FAILED,

  ADD_WAREHOUSE_REQUEST,
  ADD_WAREHOUSE_SUCCESS,
  ADD_WAREHOUSE_FAILED,

  DELETE_WAREHOUSE_REQUEST,
  DELETE_WAREHOUSE_SUCCESS,
  DELETE_WAREHOUSE_FAILED,
} from '../actions';

const $$initialState = fromJS({
  status: 'wait',
  message: '',
  warehouses: [],
});

const warehousesReducer = ($$state = $$initialState, {type, payload}) => {
  switch (type) {
    case GET_WAREHOUSES_REQUEST: {
      return $$state.set('status', 'request');
    }
    case GET_WAREHOUSES_SUCCESS: {
      return $$state.set('status', 'success').set('warehouses', fromJS(payload));
    }
    case GET_WAREHOUSES_FAILED: {
      return $$state.set('status', 'failed').set('message', payload.message);
    }

    // 更新
    case UPDATE_WAREHOUSE_REQUEST: {
      return $$state.set('status', 'update_request');
    }
    case UPDATE_WAREHOUSE_SUCCESS: {
      return $$state.set('status', 'update_success').set('warehouses', payload);
    }
    case UPDATE_WAREHOUSE_FAILED: {
      return $$state.set('status', 'update_fail').set('message', payload.message);
    }

    // 新增
    case ADD_WAREHOUSE_REQUEST: {
      return $$state.set('status', 'add_request');
    }
    case ADD_WAREHOUSE_SUCCESS: {
      const $$newWarehouses = $$state.get('warehouses').push(fromJS(payload));
      return $$state.set('status', 'add_success').set('warehouses', $$newWarehouses);
    }
    case ADD_WAREHOUSE_FAILED: {
      return $$state.set('status', 'add_fail').set('message', payload.message);
    }

    // 删除
    case DELETE_WAREHOUSE_REQUEST: {
      return $$state.set('status', 'delete_request');
    }
    case DELETE_WAREHOUSE_SUCCESS: {
      const $$newWarehouses = $$state.get('warehouses').delete(payload.index);
      return $$state.set('status', 'delete_success').set('warehouses', $$newWarehouses);
    }
    case DELETE_WAREHOUSE_FAILED: {
      return $$state.set('status', 'delete_fail').set('message', payload.message);
    }

    default:
      return $$state;
  }
};

export default warehousesReducer;