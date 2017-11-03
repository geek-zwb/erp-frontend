/**
 * @file Product sagas
 * @author Created by geekzwb on 2017/10/31.
 */
import { put, takeLatest, call } from 'redux-saga/effects';
import HTTPUtil from '../../../utils/Http';

import {
  GET_PRODUCTS_REQUEST,
  getProducts,
  getProductSuccess,
  getProductFailed,

  UPDATE_PRODUCT_REQUEST,
  updateProductSuccess,
  updateProductFailed,

  ADD_PRODUCT_REQUEST,
  addProductSuccess,
  addProductFailed,

  DELETE_PRODUCT_REQUEST,
  deleteProductSuccess,
  deleteProductFailed,
} from '../actions';

function getProduct(params = {}) {
  return HTTPUtil.get('product', params);
}

function* getProductRequest({payload}) {
  const params = payload || {};
  const response = yield call(getProduct, params);
  if (response.status === 'success') {
    yield put(getProductSuccess(response.data));
  } else {
    yield put(getProductFailed(response));
  }
}

// update products
function update(id, data) {
  return HTTPUtil.put(`product/${id}`, data);
}
function* updateProduct({payload}) {
  const {$$productsUpdated, index} = payload;
  const productUpdated = $$productsUpdated.get(index).toJS();

  const id = productUpdated.id;
  const response = yield call(update, id, productUpdated);

  if (response.status === 'success') {
    yield put(updateProductSuccess());
    yield put(getProducts({page: payload.currentPage, ...payload.dateLimit}));
  } else {
    yield put(updateProductFailed(response));
  }
}

// add product
function add(data) {
  return HTTPUtil.post(`product`, data);
}
function* addProduct({payload}) {
  const response = yield call(add, payload);

  if (response.status === 'success') {
    yield put(addProductSuccess());
    // 跳转到第一页(即新增页)
    yield put(getProducts({page: 1, ...payload.dateLimit}));
  } else {
    yield put(addProductFailed(response));
  }
}

// delete one product
function deleteReq({id}) {
  return HTTPUtil.delete(`product/${id}`);
}
function* deleteProduct({payload}) {
  const response = yield call(deleteReq, payload);
  console.log('response', response);
  if (response.status === 'success') {
    yield put(deleteProductSuccess(payload));

    // 刷新当前页
    yield put(getProducts({page: payload.currentPage, ...payload.dateLimit}));
  } else {
    yield put(deleteProductFailed(response));
  }
}

export function* watchDeleteProduct() {
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProduct);
}
export function* watchAddProduct() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProduct)
}
export function* watchUpdateProduct() {
  yield takeLatest(UPDATE_PRODUCT_REQUEST, updateProduct)
}
export function* watchGetProducts() {
  yield takeLatest(GET_PRODUCTS_REQUEST, getProductRequest);
}
