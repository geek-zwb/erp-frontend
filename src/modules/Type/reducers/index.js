/**
 * @file Type reducer
 * @author Created by geekzwb on 2017/10/28.
 */
// lib
import { fromJS } from 'immutable';

// action types
import {
  GET_TYPES_REQUEST,
  GET_TYPES_SUCCESS,
  GET_TYPES_FAILED,

  UPDATE_TYPE_REQUEST,
  UPDATE_TYPE_SUCCESS,
  UPDATE_TYPE_FAILED,

  ADD_TYPE_REQUEST,
  ADD_TYPE_SUCCESS,
  ADD_TYPE_FAILED,

  DELETE_TYPE_REQUEST,
  DELETE_TYPE_SUCCESS,
  DELETE_TYPE_FAILED,
} from '../actions';

const $$initialState = fromJS({
  status: 'wait',
  message: '',
  types: [],
});

const typesReducer = ($$state = $$initialState, {type, payload}) => {
  switch (type) {
    case GET_TYPES_REQUEST: {
      return $$state.set('status', 'request');
    }
    case GET_TYPES_SUCCESS: {
      return $$state.set('status', 'success').set('types', fromJS(payload));
    }
    case GET_TYPES_FAILED: {
      return $$state.set('status', 'failed').set('message', payload.message);
    }

    // 更新
    case UPDATE_TYPE_REQUEST: {
      return $$state.set('status', 'update_request');
    }
    case UPDATE_TYPE_SUCCESS: {
      return $$state.set('status', 'update_success').set('types', payload);
    }
    case UPDATE_TYPE_FAILED: {
      return $$state.set('status', 'update_fail').set('message', payload.message);
    }

    // 新增
    case ADD_TYPE_REQUEST: {
      return $$state.set('status', 'add_request');
    }
    case ADD_TYPE_SUCCESS: {
      const $$newTypes = $$state.get('types').push(fromJS(payload));
      return $$state.set('status', 'add_success').set('types', $$newTypes);
    }
    case ADD_TYPE_FAILED: {
      return $$state.set('status', 'add_fail').set('message', payload.message);
    }

    // 删除
    case DELETE_TYPE_REQUEST: {
      return $$state.set('status', 'delete_request');
    }
    case DELETE_TYPE_SUCCESS: {
      const $$newTypes = $$state.get('types').delete(payload.index);
      return $$state.set('status', 'delete_success').set('types', $$newTypes);
    }
    case DELETE_TYPE_FAILED: {
      return $$state.set('status', 'delete_fail').set('message', payload.message);
    }

    default:
      return $$state;
  }
};

export default typesReducer;