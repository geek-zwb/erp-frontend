/**
 * @file Supplier sagas
 * @author Created by geekzwb on 2017/10/28.
 */
import { put, takeLatest, call } from 'redux-saga/effects';
import HTTPUtil from '../../../utils/Http';

import {
  GET_SUPPLIERS_REQUEST,
  getSupplierSuccess,
  getSupplierFailed,

  UPDATE_SUPPLIER_REQUEST,
  updateSupplierSuccess,
  updateSupplierFailed,

  ADD_SUPPLIER_REQUEST,
  addSupplierSuccess,
  addSupplierFailed,

  DELETE_SUPPLIER_REQUEST,
  deleteSupplierSuccess,
  deleteSupplierFailed,
} from '../actions';

function getSupplier() {
  return HTTPUtil.get('supplier');
}

function* getSupplierRequest() {
  const response = yield call(getSupplier);
  if (response.status === 'success') {
    yield put(getSupplierSuccess(response.data));
  } else {
    yield put(getSupplierFailed(response));
  }
}

// update suppliers
function update(id, data) {
  return HTTPUtil.put(`supplier/${id}`, data);
}
function* updateSupplier({payload}) {
  const {$$suppliersUpdated, index} = payload;
  const supplierUpdated = $$suppliersUpdated.get(index).toJS();

  const id = supplierUpdated.id;
  const response = yield call(update, id, supplierUpdated);

  if (response.status === 'success') {
    yield put(updateSupplierSuccess($$suppliersUpdated));
  } else {
    yield put(updateSupplierFailed(response));
  }
}

// add supplier
function add(data) {
  return HTTPUtil.post('supplier', data);
}
function* addSupplier({payload}) {
  const response = yield call(add, payload);

  if (response.status === 'success') {
    yield put(addSupplierSuccess(response.data));
  } else {
    yield put(addSupplierFailed(response));
  }
}

// delete one supplier
function deleteReq({id}) {
  return HTTPUtil.delete(`supplier/${id}`);
}
function* deleteSupplier({payload}) {
  const response = yield call(deleteReq, payload);
  if (response.status === 'success') {
    yield put(deleteSupplierSuccess(payload));
  } else {
    yield put(deleteSupplierFailed(response));
  }
}

export function* watchDeleteSupplier() {
  yield takeLatest(DELETE_SUPPLIER_REQUEST, deleteSupplier);
}
export function* watchAddSupplier() {
  yield takeLatest(ADD_SUPPLIER_REQUEST, addSupplier)
}
export function* watchUpdateSupplier() {
  yield takeLatest(UPDATE_SUPPLIER_REQUEST, updateSupplier)
}
export function* watchGetSuppliers() {
  yield takeLatest(GET_SUPPLIERS_REQUEST, getSupplierRequest);
}
