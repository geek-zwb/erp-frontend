/**
 * @file Customer sagas
 * @author Created by geekzwb on 2017/10/24.
 */
import { put, takeLatest, call } from 'redux-saga/effects';
import HTTPUtil from '../../../utils/Http';

import {
  GET_CUSTOMERS_REQUEST,
  getCustomers,
  getCustomerSuccess,
  getCustomerFailed,

  UPDATE_CUSTOMER_REQUEST,
  updateCustomerSuccess,
  updateCustomerFailed,

  ADD_CUSTOMER_REQUEST,
  addCustomerSuccess,
  addCustomerFailed,

  DELETE_CUSTOMER_REQUEST,
  deleteCustomerSuccess,
  deleteCustomerFailed,
} from '../actions';

function getCustomer(page = '') {
  return HTTPUtil.get(`customer?page=${page}`);
}

function* getCustomerRequest({payload}) {
  const response = yield call(getCustomer, payload && payload.page);
  if (response.status === 'success') {
    yield put(getCustomerSuccess(response.data));
  } else {
    yield put(getCustomerFailed(response));
  }
}

// update customers
function update(id, data) {
  return HTTPUtil.put(`customer/${id}`, data);
}
function* updateCustomer({payload}) {
  const {$$customersUpdated, index} = payload;
  const customerUpdated = $$customersUpdated.get(index).toJS();

  const id = customerUpdated.id;
  const response = yield call(update, id, customerUpdated);

  if (response.status === 'success') {
    yield put(updateCustomerSuccess());
    yield put(getCustomers({page: payload.currentPage}));
  } else {
    yield put(updateCustomerFailed(response));
  }
}

// add customer
function add(data) {
  return HTTPUtil.post(`customer`, data);
}
function* addCustomer({payload}) {
  const response = yield call(add, payload);

  if (response.status === 'success') {
    yield put(addCustomerSuccess());
    // 跳转到第一页 第一条显示 last id
    yield put(getCustomers({page: 1}));
  } else {
    yield put(addCustomerFailed(response));
  }
}

// delete one customer
function deleteReq({id}) {
  return HTTPUtil.delete(`customer/${id}`);
}
function* deleteCustomer({payload}) {
  const response = yield call(deleteReq, payload);
  console.log('response', response);
  if (response.status === 'success') {
    yield put(deleteCustomerSuccess(payload));

    // 刷新当前页
    yield put(getCustomers({page: payload.currentPage}));
  } else {
    yield put(deleteCustomerFailed(response));
  }
}

export function* watchDeleteCustomer() {
  yield takeLatest(DELETE_CUSTOMER_REQUEST, deleteCustomer);
}
export function* watchAddCustomer() {
  yield takeLatest(ADD_CUSTOMER_REQUEST, addCustomer)
}
export function* watchUpdateCustomer() {
  yield takeLatest(UPDATE_CUSTOMER_REQUEST, updateCustomer)
}
export function* watchGetCustomers() {
  yield takeLatest(GET_CUSTOMERS_REQUEST, getCustomerRequest);
}
