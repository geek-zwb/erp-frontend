/**
 * @file Type action
 * @author Created by geekzwb on 2017/10/28.
 */

// action types
export const GET_TYPES_REQUEST = 'GET_TYPES_REQUEST';
export const GET_TYPES_SUCCESS = 'GET_TYPES_SUCCESS';
export const GET_TYPES_FAILED = 'GET_TYPES_FAILED';

export const UPDATE_TYPE_REQUEST = 'UPDATE_TYPE_REQUEST';
export const UPDATE_TYPE_SUCCESS = 'UPDATE_TYPE_SUCCESS';
export const UPDATE_TYPE_FAILED = 'UPDATE_TYPE_FAILED';

export const ADD_TYPE_REQUEST = 'ADD_TYPE_REQUEST';
export const ADD_TYPE_SUCCESS = 'ADD_TYPE_SUCCESS';
export const ADD_TYPE_FAILED = 'ADD_TYPE_FAILED';

export const DELETE_TYPE_REQUEST = 'DELETE_TYPE_REQUEST';
export const DELETE_TYPE_SUCCESS = 'DELETE_TYPE_SUCCESS';
export const DELETE_TYPE_FAILED = 'DELETE_TYPE_FAILED';

// actions creator
// get types belongs to current user
export const getTypes = (payload) => {
  return {
    type: GET_TYPES_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getTypeSuccess = (payload) => {
  return {
    type: GET_TYPES_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getTypeFailed = (payload) => {
  return {
    type: GET_TYPES_FAILED,
    payload
  }
};

/**
 *
 * @param payload {{$$typesUpdated: List, index: Number}}  index 被修改数据的索引 index
 * @returns {{type: string, payload: *}}
 */
export const updateType = (payload) => {
  return {
    type: UPDATE_TYPE_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{$$typesUpdated: List}}
 * @returns {{type: string, payload: *}}
 */
export const updateTypeSuccess = (payload) => {
  return {
    type: UPDATE_TYPE_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const updateTypeFailed = (payload) => {
  return {
    type: UPDATE_TYPE_FAILED,
    payload
  }
};

// add type
/**
 * @param payload {{name: string, description: string}}
 */
export const addType = (payload) => {
  return {
    type: ADD_TYPE_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, name: string, description: string}}
 * @returns {{type: string, payload: *}}
 */
export const addTypeSuccess = (payload) => {
  return {
    type: ADD_TYPE_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const addTypeFailed = (payload) => {
  return {
    type: ADD_TYPE_FAILED,
    payload
  }
};

// delete one type by id
/**
 * @param payload {{id: number, index: number}}
 */
export const deleteType = (payload) => {
  return {
    type: DELETE_TYPE_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, index: number}}
 * @returns {{type: string, payload: *}}
 */
export const deleteTypeSuccess = (payload) => {
  return {
    type: DELETE_TYPE_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const deleteTypeFailed = (payload) => {
  return {
    type: DELETE_TYPE_FAILED,
    payload
  }
};