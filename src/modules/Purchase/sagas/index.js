/**
 * @file Purchase sagas
 * @author Created by geekzwb on 2017/10/24.
 */
import store from 'store';
import { put, takeLatest, call } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import HTTPUtil from '../../../utils/Http';

import {
  GET_PURCHASES_REQUEST,
  getPurchases,
  getPurchaseSuccess,
  getPurchaseFailed,

  UPDATE_PURCHASES_REQUEST,
  updatePurchasesSuccess,
  updatePurchasesFailed,

  ADD_PURCHASE_REQUEST,
  addPurchaseSuccess,
  addPurchaseFailed,

  DELETE_PURCHASE_REQUEST,
  deletePurchaseSuccess,
  deletePurchaseFailed,
} from '../actions';

function getPurchase(page = '') {
  return HTTPUtil.get(`purchase?page=${page}`);
}

function* getPurchaseRequest({payload}) {
  const response = yield call(getPurchase, payload && payload.page);
  if (response.status === 'success') {
    yield put(getPurchaseSuccess(response.data));
  } else {
    yield put(getPurchaseFailed(response));
  }
}

// update purchases
function update(id, data) {
  return HTTPUtil.put(`purchase/${id}`, data);
}
function* updatePurchase({payload}) {
  const {$$purchasesUpdated, index} = payload;
  const purchaseUpdated = $$purchasesUpdated.get(index).toJS();

  const id = purchaseUpdated.id;
  const response = yield call(update, id, purchaseUpdated);

  if (response.status === 'success') {
    yield put(updatePurchasesSuccess());
    yield put(getPurchases({page: payload.currentPage}));
  } else {
    yield put(updatePurchasesFailed(response));
  }
}

// add purchase
function add(data) {
  return HTTPUtil.post(`purchase`, data);
}
function* addPurchase({payload}) {
  const response = yield call(add, payload);

  if (response.status === 'success') {
    yield put(addPurchaseSuccess());
    // 跳转到最后一页(即新增页)
    yield put(getPurchases({page: payload.lastPage}));
  } else {
    yield put(addPurchaseFailed(response));
  }
}

// delete one purchase
function deleteReq({id}) {
  return HTTPUtil.delete(`purchase/${id}`);
}
function* deletePurchase({payload}) {
  const response = yield call(deleteReq, payload);
  console.log('response', response);
  if (response.status === 'success') {
    yield put(deletePurchaseSuccess(payload));

    // 刷新当前页
    yield put(getPurchases({page: payload.currentPage}));
  } else {
    yield put(deletePurchaseFailed(response));
  }
}

export function* watchDeletePurchase() {
  yield takeLatest(DELETE_PURCHASE_REQUEST, deletePurchase);
}
export function* watchAddPurchase() {
  yield takeLatest(ADD_PURCHASE_REQUEST, addPurchase)
}
export function* watchUpdatePurchase() {
  yield takeLatest(UPDATE_PURCHASES_REQUEST, updatePurchase)
}
export function* watchGetPurchases() {
  yield takeLatest(GET_PURCHASES_REQUEST, getPurchaseRequest);
}
