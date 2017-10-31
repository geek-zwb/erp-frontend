/**
 * @file Order sagas
 * @author Created by geekzwb on 2017/10/30.
 */
import { put, takeLatest, call } from 'redux-saga/effects';
import HTTPUtil from '../../../utils/Http';

import {
  GET_ORDERS_REQUEST,
  getOrders,
  getOrderSuccess,
  getOrderFailed,

  UPDATE_ORDERS_REQUEST,
  updateOrdersSuccess,
  updateOrdersFailed,

  ADD_ORDER_REQUEST,
  addOrderSuccess,
  addOrderFailed,

  DELETE_ORDER_REQUEST,
  deleteOrderSuccess,
  deleteOrderFailed,
} from '../actions';

function getOrder(page = '') {
  return HTTPUtil.get(`order?page=${page}`);
}

function* getOrderRequest({payload}) {
  const response = yield call(getOrder, payload && payload.page);
  if (response.status === 'success') {
    yield put(getOrderSuccess(response.data));
  } else {
    yield put(getOrderFailed(response));
  }
}

// update orders
function update(id, data) {
  return HTTPUtil.put(`order/${id}`, data);
}
function* updateOrder({payload}) {
  const {$$ordersUpdated, index} = payload;
  const orderUpdated = $$ordersUpdated.get(index).toJS();

  const id = orderUpdated.id;
  const response = yield call(update, id, orderUpdated);

  if (response.status === 'success') {
    yield put(updateOrdersSuccess());
    yield put(getOrders({page: payload.currentPage}));
  } else {
    yield put(updateOrdersFailed(response));
  }
}

// add order
function add(data) {
  return HTTPUtil.post(`order`, data);
}
function* addOrder({payload}) {
  const response = yield call(add, payload);

  if (response.status === 'success') {
    yield put(addOrderSuccess());
    // 跳转到最后一页(即新增页)
    yield put(getOrders({page: payload.lastPage}));
  } else {
    yield put(addOrderFailed(response));
  }
}

// delete one order
function deleteReq({id}) {
  return HTTPUtil.delete(`order/${id}`);
}
function* deleteOrder({payload}) {
  const response = yield call(deleteReq, payload);
  console.log('response', response);
  if (response.status === 'success') {
    yield put(deleteOrderSuccess(payload));

    // 刷新当前页
    yield put(getOrders({page: payload.currentPage}));
  } else {
    yield put(deleteOrderFailed(response));
  }
}

export function* watchDeleteOrder() {
  yield takeLatest(DELETE_ORDER_REQUEST, deleteOrder);
}
export function* watchAddOrder() {
  yield takeLatest(ADD_ORDER_REQUEST, addOrder)
}
export function* watchUpdateOrder() {
  yield takeLatest(UPDATE_ORDERS_REQUEST, updateOrder)
}
export function* watchGetOrders() {
  yield takeLatest(GET_ORDERS_REQUEST, getOrderRequest);
}
