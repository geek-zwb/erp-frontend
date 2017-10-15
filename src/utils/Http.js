/**
 * @file http 请求封装
 * @author Created by geekzwb on 2017/10/14.
 */
/* eslint-disable no-console */
import axios from 'axios';
import store from 'store';
//import { authLogout } from '../store/actions/auth'


axios.defaults.baseURL = URL.API_URL;
axios.defaults.headers.common.Accept = 'application/json';
// axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      //store.dispatch(authLogout())
    }
    return Promise.reject(error);
  });

export default class HTTPUtil {
  static setOptions() {
    if (store.get('access_token')) {
      axios.defaults.headers.common.Authorization = `Bearer ${store.get('access_token')}`;
    }
     // axios.defaults.headers.['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  static get(url, config) {
    HTTPUtil.setOptions();
    return axios.get(url, config)
      .then(function (response) {
        console.log('response', response);
        return response;
      })
      .catch(function (error) {
        return {
          status: 'error',
          message: error
        }
      });
  }

  static post(url, data, config) {

    HTTPUtil.setOptions();
    return axios.post(url, data, config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return {
          status: 'error',
          message: error
        }
      });
  }

  static put(url, data, config) {
    HTTPUtil.setOptions();
    return axios.put(url, data, config);
  }

  static delete(url, config) {
    HTTPUtil.setOptions();
    return axios.delete(url, config);
  }
}