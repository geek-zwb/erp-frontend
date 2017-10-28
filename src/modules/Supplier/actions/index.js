/**
 * @file Supplier action
 * @author Created by geekzwb on 2017/10/28.
 */

// action types
export const GET_SUPPLIERS_REQUEST = 'GET_SUPPLIERS_REQUEST';
export const GET_SUPPLIERS_SUCCESS = 'GET_SUPPLIERS_SUCCESS';
export const GET_SUPPLIERS_FAILED = 'GET_SUPPLIERS_FAILED';

export const UPDATE_SUPPLIER_REQUEST = 'UPDATE_SUPPLIER_REQUEST';
export const UPDATE_SUPPLIER_SUCCESS = 'UPDATE_SUPPLIER_SUCCESS';
export const UPDATE_SUPPLIER_FAILED = 'UPDATE_SUPPLIER_FAILED';

export const ADD_SUPPLIER_REQUEST = 'ADD_SUPPLIER_REQUEST';
export const ADD_SUPPLIER_SUCCESS = 'ADD_SUPPLIER_SUCCESS';
export const ADD_SUPPLIER_FAILED = 'ADD_SUPPLIER_FAILED';

export const DELETE_SUPPLIER_REQUEST = 'DELETE_SUPPLIER_REQUEST';
export const DELETE_SUPPLIER_SUCCESS = 'DELETE_SUPPLIER_SUCCESS';
export const DELETE_SUPPLIER_FAILED = 'DELETE_SUPPLIER_FAILED';

// actions creator
// get suppliers belongs to current user
export const getSuppliers = (payload) => {
  return {
    type: GET_SUPPLIERS_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getSupplierSuccess = (payload) => {
  return {
    type: GET_SUPPLIERS_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getSupplierFailed = (payload) => {
  return {
    type: GET_SUPPLIERS_FAILED,
    payload
  }
};

/**
 *
 * @param payload {{$$suppliersUpdated: List, index: Number}}  index 被修改数据的索引 index
 * @returns {{type: string, payload: *}}
 */
export const updateSupplier = (payload) => {
  return {
    type: UPDATE_SUPPLIER_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{$$suppliersUpdated: List}}
 * @returns {{type: string, payload: *}}
 */
export const updateSupplierSuccess = (payload) => {
  return {
    type: UPDATE_SUPPLIER_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const updateSupplierFailed = (payload) => {
  return {
    type: UPDATE_SUPPLIER_FAILED,
    payload
  }
};

// add supplier
/**
 * @param payload {{name: string, description: string}}
 */
export const addSupplier = (payload) => {
  return {
    type: ADD_SUPPLIER_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, name: string, description: string}}
 * @returns {{type: string, payload: *}}
 */
export const addSupplierSuccess = (payload) => {
  return {
    type: ADD_SUPPLIER_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const addSupplierFailed = (payload) => {
  return {
    type: ADD_SUPPLIER_FAILED,
    payload
  }
};

// delete one supplier by id
/**
 * @param payload {{id: number, index: number}}
 */
export const deleteSupplier = (payload) => {
  return {
    type: DELETE_SUPPLIER_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, index: number}}
 * @returns {{type: string, payload: *}}
 */
export const deleteSupplierSuccess = (payload) => {
  return {
    type: DELETE_SUPPLIER_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const deleteSupplierFailed = (payload) => {
  return {
    type: DELETE_SUPPLIER_FAILED,
    payload
  }
};