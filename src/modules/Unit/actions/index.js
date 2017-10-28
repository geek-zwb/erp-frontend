/**
 * @file Unit action
 * @author Created by geekzwb on 2017/10/28.
 */

// action types
export const GET_UNITS_REQUEST = 'GET_UNITS_REQUEST';
export const GET_UNITS_SUCCESS = 'GET_UNITS_SUCCESS';
export const GET_UNITS_FAILED = 'GET_UNITS_FAILED';

export const UPDATE_UNIT_REQUEST = 'UPDATE_UNIT_REQUEST';
export const UPDATE_UNIT_SUCCESS = 'UPDATE_UNIT_SUCCESS';
export const UPDATE_UNIT_FAILED = 'UPDATE_UNIT_FAILED';

export const ADD_UNIT_REQUEST = 'ADD_UNIT_REQUEST';
export const ADD_UNIT_SUCCESS = 'ADD_UNIT_SUCCESS';
export const ADD_UNIT_FAILED = 'ADD_UNIT_FAILED';

export const DELETE_UNIT_REQUEST = 'DELETE_UNIT_REQUEST';
export const DELETE_UNIT_SUCCESS = 'DELETE_UNIT_SUCCESS';
export const DELETE_UNIT_FAILED = 'DELETE_UNIT_FAILED';

// actions creator
// get units belongs to current user
export const getUnits = (payload) => {
  return {
    type: GET_UNITS_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getUnitSuccess = (payload) => {
  return {
    type: GET_UNITS_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getUnitFailed = (payload) => {
  return {
    type: GET_UNITS_FAILED,
    payload
  }
};

/**
 *
 * @param payload {{$$unitsUpdated: List, index: Number}}  index 被修改数据的索引 index
 * @returns {{type: string, payload: *}}
 */
export const updateUnit = (payload) => {
  return {
    type: UPDATE_UNIT_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{$$unitsUpdated: List}}
 * @returns {{type: string, payload: *}}
 */
export const updateUnitSuccess = (payload) => {
  return {
    type: UPDATE_UNIT_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const updateUnitFailed = (payload) => {
  return {
    type: UPDATE_UNIT_FAILED,
    payload
  }
};

// add unit
/**
 * @param payload {{name: string, description: string}}
 */
export const addUnit = (payload) => {
  return {
    type: ADD_UNIT_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, name: string, description: string}}
 * @returns {{type: string, payload: *}}
 */
export const addUnitSuccess = (payload) => {
  return {
    type: ADD_UNIT_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const addUnitFailed = (payload) => {
  return {
    type: ADD_UNIT_FAILED,
    payload
  }
};

// delete one unit by id
/**
 * @param payload {{id: number, index: number}}
 */
export const deleteUnit = (payload) => {
  return {
    type: DELETE_UNIT_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, index: number}}
 * @returns {{type: string, payload: *}}
 */
export const deleteUnitSuccess = (payload) => {
  return {
    type: DELETE_UNIT_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const deleteUnitFailed = (payload) => {
  return {
    type: DELETE_UNIT_FAILED,
    payload
  }
};