/**
 * @file Product action
 * @author Created by geekzwb on 2017/10/31.
 */

// action types
export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILED = 'UPDATE_PRODUCT_FAILED';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILED = 'ADD_PRODUCT_FAILED';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED';

// actions creator
// get products belongs to current system
/**
 *
 * @param payload
 * @returns {{type: string, payload: {page: number}}}
 */
export const getProducts = (payload) => {
  return {
    type: GET_PRODUCTS_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getProductSuccess = (payload) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getProductFailed = (payload) => {
  return {
    type: GET_PRODUCTS_FAILED,
    payload
  }
};

/**
 *
 * @param payload {{$$productsUpdated: List, index: Number, currentPage: Number}}  index 被修改数据的索引 index
 * @returns {{type: string, payload: *}}
 */
export const updateProduct = (payload) => {
  return {
    type: UPDATE_PRODUCT_REQUEST,
    payload
  }
};

/**
 *
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateProductSuccess = (payload) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const updateProductFailed = (payload) => {
  return {
    type: UPDATE_PRODUCT_FAILED,
    payload
  }
};

// add product
/**
 * @param payload {{name: string, slug: string, phone: string, pwd: string, roles: array}}
 */
export const addProduct = (payload) => {
  return {
    type: ADD_PRODUCT_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{}}
 * @returns {{type: string, payload: *}}
 */
export const addProductSuccess = (payload = {}) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const addProductFailed = (payload) => {
  return {
    type: ADD_PRODUCT_FAILED,
    payload
  }
};

// delete one product by id
/**
 * @param payload {{id: number, index: number}}
 */
export const deleteProduct = (payload) => {
  return {
    type: DELETE_PRODUCT_REQUEST,
    payload
  }
};

/**
 *
 * @param payload {{id: number, index: number}}
 * @returns {{type: string, payload: *}}
 */
export const deleteProductSuccess = (payload) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload {{message: string}}
 * @returns {{type: string, payload: *}}
 */
export const deleteProductFailed = (payload) => {
  return {
    type: DELETE_PRODUCT_FAILED,
    payload
  }
};