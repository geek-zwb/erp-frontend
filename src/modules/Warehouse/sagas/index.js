/**
 * @file Warehouse sagas
 * @author Created by geekzwb on 2017/10/28.
 */
import { put, takeLatest, call } from 'redux-saga/effects';
import HTTPUtil from '../../../utils/Http';

import {
  GET_WAREHOUSES_REQUEST,
  getWarehouseSuccess,
  getWarehouseFailed,

  UPDATE_WAREHOUSE_REQUEST,
  updateWarehouseSuccess,
  updateWarehouseFailed,

  ADD_WAREHOUSE_REQUEST,
  addWarehouseSuccess,
  addWarehouseFailed,

  DELETE_WAREHOUSE_REQUEST,
  deleteWarehouseSuccess,
  deleteWarehouseFailed,
} from '../actions';

function getWarehouse() {
  return HTTPUtil.get('warehouse');
}

function* getWarehouseRequest() {
  const response = yield call(getWarehouse);
  if (response.status === 'success') {
    yield put(getWarehouseSuccess(response.data));
  } else {
    yield put(getWarehouseFailed(response));
  }
}

// update warehouses
function update(id, data) {
  return HTTPUtil.put(`warehouse/${id}`, data);
}
function* updateWarehouse({payload}) {
  const {$$warehousesUpdated, index} = payload;
  const warehouseUpdated = $$warehousesUpdated.get(index).toJS();

  const id = warehouseUpdated.id;
  const response = yield call(update, id, warehouseUpdated);

  if (response.status === 'success') {
    yield put(updateWarehouseSuccess($$warehousesUpdated));
  } else {
    yield put(updateWarehouseFailed(response));
  }
}

// add warehouse
function add(data) {
  return HTTPUtil.post('warehouse', data);
}
function* addWarehouse({payload}) {
  const response = yield call(add, payload);

  if (response.status === 'success') {
    yield put(addWarehouseSuccess(response.data));
  } else {
    yield put(addWarehouseFailed(response));
  }
}

// delete one warehouse
function deleteReq({id}) {
  return HTTPUtil.delete(`warehouse/${id}`);
}
function* deleteWarehouse({payload}) {
  const response = yield call(deleteReq, payload);
  if (response.status === 'success') {
    yield put(deleteWarehouseSuccess(payload));
  } else {
    yield put(deleteWarehouseFailed(response));
  }
}

export function* watchDeleteWarehouse() {
  yield takeLatest(DELETE_WAREHOUSE_REQUEST, deleteWarehouse);
}
export function* watchAddWarehouse() {
  yield takeLatest(ADD_WAREHOUSE_REQUEST, addWarehouse)
}
export function* watchUpdateWarehouse() {
  yield takeLatest(UPDATE_WAREHOUSE_REQUEST, updateWarehouse)
}
export function* watchGetWarehouses() {
  yield takeLatest(GET_WAREHOUSES_REQUEST, getWarehouseRequest);
}
