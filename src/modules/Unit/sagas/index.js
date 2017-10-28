/**
 * @file Unit sagas
 * @author Created by geekzwb on 2017/10/28.
 */
import { put, takeLatest, call } from 'redux-saga/effects';
import HTTPUtil from '../../../utils/Http';

import {
  GET_UNITS_REQUEST,
  getUnitSuccess,
  getUnitFailed,

  UPDATE_UNIT_REQUEST,
  updateUnitSuccess,
  updateUnitFailed,

  ADD_UNIT_REQUEST,
  addUnitSuccess,
  addUnitFailed,

  DELETE_UNIT_REQUEST,
  deleteUnitSuccess,
  deleteUnitFailed,
} from '../actions';

function getUnit() {
  return HTTPUtil.get('unit');
}

function* getUnitRequest() {
  const response = yield call(getUnit);
  if (response.status === 'success') {
    yield put(getUnitSuccess(response.data));
  } else {
    yield put(getUnitFailed(response));
  }
}

// update units
function update(id, data) {
  return HTTPUtil.put(`unit/${id}`, data);
}
function* updateUnit({payload}) {
  const {$$unitsUpdated, index} = payload;
  const unitUpdated = $$unitsUpdated.get(index).toJS();

  const id = unitUpdated.id;
  const response = yield call(update, id, unitUpdated);

  if (response.status === 'success') {
    yield put(updateUnitSuccess($$unitsUpdated));
  } else {
    yield put(updateUnitFailed(response));
  }
}

// add unit
function add(data) {
  return HTTPUtil.post('unit', data);
}
function* addUnit({payload}) {
  const response = yield call(add, payload);

  if (response.status === 'success') {
    yield put(addUnitSuccess(response.data));
  } else {
    yield put(addUnitFailed(response));
  }
}

// delete one unit
function deleteReq({id}) {
  return HTTPUtil.delete(`unit/${id}`);
}
function* deleteUnit({payload}) {
  const response = yield call(deleteReq, payload);
  if (response.status === 'success') {
    yield put(deleteUnitSuccess(payload));
  } else {
    yield put(deleteUnitFailed(response));
  }
}

export function* watchDeleteUnit() {
  yield takeLatest(DELETE_UNIT_REQUEST, deleteUnit);
}
export function* watchAddUnit() {
  yield takeLatest(ADD_UNIT_REQUEST, addUnit)
}
export function* watchUpdateUnit() {
  yield takeLatest(UPDATE_UNIT_REQUEST, updateUnit)
}
export function* watchGetUnits() {
  yield takeLatest(GET_UNITS_REQUEST, getUnitRequest);
}
