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
      store.clearAll();
      window.location.href = '/login';
      //store.dispatch(authLogout())
    }
    return Promise.reject(error);
  });

/**
 * Encode url and params to url with query string
 * @param {String} url
 * @param {Object} params
 * @return {String} url
 */
function urlBuilder(url, params) {
  if (params) {
    if (typeof params === 'string') {
      url += '?';
      url += params;
    } else if (typeof params === 'object' && Object.keys(params).length > 0) {
      // TODO: identify array
      url += '?';
      for (let prop in params) {
        //去除encodeURIComponent,如果确定要encode,自行在payload中加入
        url += prop + '=' + (params[prop] ? params[prop] : '') + '&';
      }
      url = url.replace(/&$/, '');
    }
    return url;
  } else {
    return url;
  }
}

export default class HTTPUtil {
  static setOptions() {
    if (store.get('access_token')) {
      axios.defaults.headers.common.Authorization = `Bearer ${store.get('access_token')}`;
    }
    // axios.defaults.headers.['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  static get(url, params, config) {
    const newUrl = urlBuilder(url, params);
    HTTPUtil.setOptions();
    return axios.get(newUrl, config)
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
    return axios.put(url, data, config)
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

  static delete(url, config) {
    HTTPUtil.setOptions();
    return axios.delete(url, config)
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
}