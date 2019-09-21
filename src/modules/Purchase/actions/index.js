/**
 * @file Purchase action
 * @author Created by geekzwb on 2017/10/23.
 */

// action types
export const GET_PURCHASES_REQUEST = 'GET_PURCHASES_REQUEST';
export const GET_PURCHASES_SUCCESS = 'GET_PURCHASES_SUCCESS';
export const GET_PURCHASES_FAILED = 'GET_PURCHASES_FAILED';

export const UPDATE_PURCHASES_REQUEST = 'UPDATE_PURCHASES_REQUEST';
export const UPDATE_PURCHASES_SUCCESS = 'UPDATE_PURCHASES_SUCCESS';
export const UPDATE_PURCHASES_FAILED = 'UPDATE_PURCHASES_FAILED';

export const ADD_PURCHASE_REQUEST = 'ADD_PURCHASE_REQUEST';
export const ADD_PURCHASE_SUCCESS = 'ADD_PURCHASE_SUCCESS';
export const ADD_PURCHASE_FAILED = 'ADD_PURCHASE_FAILED';

export const DELETE_PURCHASE_REQUEST = 'DELETE_PURCHASE_REQUEST';
export const DELETE_PURCHASE_SUCCESS = 'DELETE_PURCHASE_SUCCESS';
export const DELETE_PURCHASE_FAILED = 'DELETE_PURCHASE_FAILED';

// actions creator
// get purchases belongs to current system
/**
 *
 * @param payload
 * @returns {{type: string, payload: {page: number}}}
 */
export const getPurchases = (payload) => {
  return {
    type: GET_PURCHASES_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getPurchaseSuccess = (payload) => {
  return {
    type: GET_PURCHASES_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getPurchaseFailed = (payload) => {
  return {
    type: GET_PURCHASES_FAILED,
    payload
  }
};

/**
 *
 * @param payload {{$$purchasesUpdated: List, index: Number, currentPage: Number}}  index 被修改数据的索引 index
 * @returns {{type: string, payload: *}}
 */
export const updatePurchases = (payload) => {
  return {
    type: UPDATE_PURCHASES_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updatePurchasesSuccess = (payload) => {
  return {
    type: UPDATE_PURCHASES_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const updatePurchasesFailed = (payload) => {
  return {
    type: UPDATE_PURCHASES_FAILED,
    payload
  }
};

// add purchase
/**
 * @param payload {{name: string, slug: string, phone: string, pwd: string, roles: array}}
 */
export const addPurchase = (payload) => {
  return {
    type: ADD_PURCHASE_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{}}
 * @returns {{type: string, payload: *}}
 */
export const addPurchaseSuccess = (payload = {}) => {
  return {
    type: ADD_PURCHASE_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const addPurchaseFailed = (payload) => {
  return {
    type: ADD_PURCHASE_FAILED,
    payload
  }
};

// delete one purchase by id
/**
 * @param payload {{id: number, index: number}}
 */
export const deletePurchase = (payload) => {
  return {
    type: DELETE_PURCHASE_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, index: number}}
 * @returns {{type: string, payload: *}}
 */
export const deletePurchaseSuccess = (payload) => {
  return {
    type: DELETE_PURCHASE_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const deletePurchaseFailed = (payload) => {
  return {
    type: DELETE_PURCHASE_FAILED,
    payload
  }
};