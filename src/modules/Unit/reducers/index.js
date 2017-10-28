/**
 * @file Unit reducer
 * @author Created by geekzwb on 2017/10/28.
 */
// lib
import { fromJS } from 'immutable';

// action types
import {
  GET_UNITS_REQUEST,
  GET_UNITS_SUCCESS,
  GET_UNITS_FAILED,

  UPDATE_UNIT_REQUEST,
  UPDATE_UNIT_SUCCESS,
  UPDATE_UNIT_FAILED,

  ADD_UNIT_REQUEST,
  ADD_UNIT_SUCCESS,
  ADD_UNIT_FAILED,

  DELETE_UNIT_REQUEST,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILED,
} from '../actions';

const $$initialState = fromJS({
  status: 'wait',
  message: '',
  units: [],
});

const unitsReducer = ($$state = $$initialState, {type, payload}) => {
  switch (type) {
    case GET_UNITS_REQUEST: {
      return $$state.set('status', 'request');
    }
    case GET_UNITS_SUCCESS: {
      return $$state.set('status', 'success').set('units', fromJS(payload));
    }
    case GET_UNITS_FAILED: {
      return $$state.set('status', 'failed').set('message', payload.message);
    }

    // 更新
    case UPDATE_UNIT_REQUEST: {
      return $$state.set('status', 'update_request');
    }
    case UPDATE_UNIT_SUCCESS: {
      return $$state.set('status', 'update_success').set('units', payload);
    }
    case UPDATE_UNIT_FAILED: {
      return $$state.set('status', 'update_fail').set('message', payload.message);
    }

    // 新增
    case ADD_UNIT_REQUEST: {
      return $$state.set('status', 'add_request');
    }
    case ADD_UNIT_SUCCESS: {
      const $$newUnits = $$state.get('units').push(fromJS(payload));
      return $$state.set('status', 'add_success').set('units', $$newUnits);
    }
    case ADD_UNIT_FAILED: {
      return $$state.set('status', 'add_fail').set('message', payload.message);
    }

    // 删除
    case DELETE_UNIT_REQUEST: {
      return $$state.set('status', 'delete_request');
    }
    case DELETE_UNIT_SUCCESS: {
      const $$newUnits = $$state.get('units').delete(payload.index);
      return $$state.set('status', 'delete_success').set('units', $$newUnits);
    }
    case DELETE_UNIT_FAILED: {
      return $$state.set('status', 'delete_fail').set('message', payload.message);
    }

    default:
      return $$state;
  }
};

export default unitsReducer;