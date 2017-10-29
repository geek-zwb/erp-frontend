/**
 * @file Warehouse action
 * @author Created by geekzwb on 2017/10/28.
 */

// action types
export const GET_WAREHOUSES_REQUEST = 'GET_WAREHOUSES_REQUEST';
export const GET_WAREHOUSES_SUCCESS = 'GET_WAREHOUSES_SUCCESS';
export const GET_WAREHOUSES_FAILED = 'GET_WAREHOUSES_FAILED';

export const UPDATE_WAREHOUSE_REQUEST = 'UPDATE_WAREHOUSE_REQUEST';
export const UPDATE_WAREHOUSE_SUCCESS = 'UPDATE_WAREHOUSE_SUCCESS';
export const UPDATE_WAREHOUSE_FAILED = 'UPDATE_WAREHOUSE_FAILED';

export const ADD_WAREHOUSE_REQUEST = 'ADD_WAREHOUSE_REQUEST';
export const ADD_WAREHOUSE_SUCCESS = 'ADD_WAREHOUSE_SUCCESS';
export const ADD_WAREHOUSE_FAILED = 'ADD_WAREHOUSE_FAILED';

export const DELETE_WAREHOUSE_REQUEST = 'DELETE_WAREHOUSE_REQUEST';
export const DELETE_WAREHOUSE_SUCCESS = 'DELETE_WAREHOUSE_SUCCESS';
export const DELETE_WAREHOUSE_FAILED = 'DELETE_WAREHOUSE_FAILED';

// actions creator
// get warehouses belongs to current user
export const getWarehouses = (payload) => {
  return {
    type: GET_WAREHOUSES_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getWarehouseSuccess = (payload) => {
  return {
    type: GET_WAREHOUSES_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getWarehouseFailed = (payload) => {
  return {
    type: GET_WAREHOUSES_FAILED,
    payload
  }
};

/**
 *
 * @param payload {{$$warehousesUpdated: List, index: Number}}  index 被修改数据的索引 index
 * @returns {{type: string, payload: *}}
 */
export const updateWarehouse = (payload) => {
  return {
    type: UPDATE_WAREHOUSE_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{$$warehousesUpdated: List}}
 * @returns {{type: string, payload: *}}
 */
export const updateWarehouseSuccess = (payload) => {
  return {
    type: UPDATE_WAREHOUSE_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const updateWarehouseFailed = (payload) => {
  return {
    type: UPDATE_WAREHOUSE_FAILED,
    payload
  }
};

// add warehouse
/**
 * @param payload {{name: string, description: string}}
 */
export const addWarehouse = (payload) => {
  return {
    type: ADD_WAREHOUSE_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, name: string, description: string}}
 * @returns {{type: string, payload: *}}
 */
export const addWarehouseSuccess = (payload) => {
  return {
    type: ADD_WAREHOUSE_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const addWarehouseFailed = (payload) => {
  return {
    type: ADD_WAREHOUSE_FAILED,
    payload
  }
};

// delete one warehouse by id
/**
 * @param payload {{id: number, index: number}}
 */
export const deleteWarehouse = (payload) => {
  return {
    type: DELETE_WAREHOUSE_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, index: number}}
 * @returns {{type: string, payload: *}}
 */
export const deleteWarehouseSuccess = (payload) => {
  return {
    type: DELETE_WAREHOUSE_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const deleteWarehouseFailed = (payload) => {
  return {
    type: DELETE_WAREHOUSE_FAILED,
    payload
  }
};