/**
 * @file Customer action
 * @author Created by geekzwb on 2017/10/23.
 */

// action types
export const GET_CUSTOMERS_REQUEST = 'GET_CUSTOMERS_REQUEST';
export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS';
export const GET_CUSTOMERS_FAILED = 'GET_CUSTOMERS_FAILED';

export const UPDATE_CUSTOMER_REQUEST = 'UPDATE_CUSTOMER_REQUEST';
export const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS';
export const UPDATE_CUSTOMER_FAILED = 'UPDATE_CUSTOMER_FAILED';

export const ADD_CUSTOMER_REQUEST = 'ADD_CUSTOMER_REQUEST';
export const ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS';
export const ADD_CUSTOMER_FAILED = 'ADD_CUSTOMER_FAILED';

export const DELETE_CUSTOMER_REQUEST = 'DELETE_CUSTOMER_REQUEST';
export const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS';
export const DELETE_CUSTOMER_FAILED = 'DELETE_CUSTOMER_FAILED';

// actions creator
// get customers belongs to current system
/**
 *
 * @param payload
 * @returns {{type: string, payload: {page: number}}}
 */
export const getCustomers = (payload) => {
  return {
    type: GET_CUSTOMERS_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getCustomerSuccess = (payload) => {
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getCustomerFailed = (payload) => {
  return {
    type: GET_CUSTOMERS_FAILED,
    payload
  }
};

/**
 *
 * @param payload {{$$customersUpdated: List, index: Number, currentPage: Number}}  index 被修改数据的索引 index
 * @returns {{type: string, payload: *}}
 */
export const updateCustomer = (payload) => {
  return {
    type: UPDATE_CUSTOMER_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateCustomerSuccess = (payload) => {
  return {
    type: UPDATE_CUSTOMER_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const updateCustomerFailed = (payload) => {
  return {
    type: UPDATE_CUSTOMER_FAILED,
    payload
  }
};

// add customer
/**
 * @param payload {{name: string, slug: string, phone: string, pwd: string, roles: array}}
 */
export const addCustomer = (payload) => {
  return {
    type: ADD_CUSTOMER_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{}}
 * @returns {{type: string, payload: *}}
 */
export const addCustomerSuccess = (payload = {}) => {
  return {
    type: ADD_CUSTOMER_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const addCustomerFailed = (payload) => {
  return {
    type: ADD_CUSTOMER_FAILED,
    payload
  }
};

// delete one customer by id
/**
 * @param payload {{id: number, index: number}}
 */
export const deleteCustomer = (payload) => {
  return {
    type: DELETE_CUSTOMER_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, index: number}}
 * @returns {{type: string, payload: *}}
 */
export const deleteCustomerSuccess = (payload) => {
  return {
    type: DELETE_CUSTOMER_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const deleteCustomerFailed = (payload) => {
  return {
    type: DELETE_CUSTOMER_FAILED,
    payload
  }
};