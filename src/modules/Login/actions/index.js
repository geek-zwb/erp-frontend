/**
 * @file Login action
 * @author Created by geekzwb on 2017/10/13.
 */

// action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

// actions creator

export const login = (credentials) => {
  return {
    type: LOGIN_REQUEST,
    payload: credentials
  }
};

/**
 *
 * @param payload 如 {token_type: 'Bearer', expires_in: '', access_token: 'eyJ0...', 'refresh_token': 'def5...'}
 * @returns {{type: string, payload: *}}
 */
export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload
  }
};

/**
 *
 * @param payload 如 {status:"error",code:200,message:{username:["The selected username is invalid."]}}
 * @returns {{type: string, payload: *}}
 */
export const loginFailed = (payload) => {
  return {
    type: LOGIN_FAILED,
    payload
  }
};