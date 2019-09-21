/**
 * @file Order action
 * @author Created by geekzwb on 2017/10/30.
 */

// action types
export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILED = 'GET_ORDERS_FAILED';

export const UPDATE_ORDERS_REQUEST = 'UPDATE_ORDERS_REQUEST';
export const UPDATE_ORDERS_SUCCESS = 'UPDATE_ORDERS_SUCCESS';
export const UPDATE_ORDERS_FAILED = 'UPDATE_ORDERS_FAILED';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED';

export const DELETE_ORDER_REQUEST = 'DELETE_ORDER_REQUEST';
export const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS';
export const DELETE_ORDER_FAILED = 'DELETE_ORDER_FAILED';

// actions creator
// get orders belongs to current system
/**
 *
 * @param payload
 * @returns {{type: string, payload: {page: number}}}
 */
export const getOrders = (payload) => {
  return {
    type: GET_ORDERS_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getOrderSuccess = (payload) => {
  return {
    type: GET_ORDERS_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getOrderFailed = (payload) => {
  return {
    type: GET_ORDERS_FAILED,
    payload
  }
};

/**
 *
 * @param payload {{$$ordersUpdated: List, index: Number, currentPage: Number}}  index 被修改数据的索引 index
 * @returns {{type: string, payload: *}}
 */
export const updateOrders = (payload) => {
  return {
    type: UPDATE_ORDERS_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateOrdersSuccess = (payload) => {
  return {
    type: UPDATE_ORDERS_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const updateOrdersFailed = (payload) => {
  return {
    type: UPDATE_ORDERS_FAILED,
    payload
  }
};

// add order
/**
 * @param payload {{name: string, slug: string, phone: string, pwd: string, roles: array}}
 */
export const addOrder = (payload) => {
  return {
    type: ADD_ORDER_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{}}
 * @returns {{type: string, payload: *}}
 */
export const addOrderSuccess = (payload = {}) => {
  return {
    type: ADD_ORDER_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const addOrderFailed = (payload) => {
  return {
    type: ADD_ORDER_FAILED,
    payload
  }
};

// delete one order by id
/**
 * @param payload {{id: number, index: number}}
 */
export const deleteOrder = (payload) => {
  return {
    type: DELETE_ORDER_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, index: number}}
 * @returns {{type: string, payload: *}}
 */
export const deleteOrderSuccess = (payload) => {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const deleteOrderFailed = (payload) => {
  return {
    type: DELETE_ORDER_FAILED,
    payload
  }
};