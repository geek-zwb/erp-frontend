/**
 * @file Type sagas
 * @author Created by geekzwb on 2017/10/28.
 */
import { put, takeLatest, call } from 'redux-saga/effects';
import HTTPUtil from '../../../utils/Http';

import {
  GET_TYPES_REQUEST,
  getTypeSuccess,
  getTypeFailed,

  UPDATE_TYPE_REQUEST,
  updateTypeSuccess,
  updateTypeFailed,

  ADD_TYPE_REQUEST,
  addTypeSuccess,
  addTypeFailed,

  DELETE_TYPE_REQUEST,
  deleteTypeSuccess,
  deleteTypeFailed,
} from '../actions';

function getType() {
  return HTTPUtil.get('type');
}

function* getTypeRequest() {
  const response = yield call(getType);
  if (response.status === 'success') {
    yield put(getTypeSuccess(response.data));
  } else {
    yield put(getTypeFailed(response));
  }
}

// update types
function update(id, data) {
  return HTTPUtil.put(`type/${id}`, data);
}
function* updateType({payload}) {
  const {$$typesUpdated, index} = payload;
  const typeUpdated = $$typesUpdated.get(index).toJS();

  const id = typeUpdated.id;
  const response = yield call(update, id, typeUpdated);

  if (response.status === 'success') {
    yield put(updateTypeSuccess($$typesUpdated));
  } else {
    yield put(updateTypeFailed(response));
  }
}

// add type
function add(data) {
  return HTTPUtil.post('type', data);
}
function* addType({payload}) {
  const response = yield call(add, payload);

  if (response.status === 'success') {
    yield put(addTypeSuccess(response.data));
  } else {
    yield put(addTypeFailed(response));
  }
}

// delete one type
function deleteReq({id}) {
  return HTTPUtil.delete(`type/${id}`);
}
function* deleteType({payload}) {
  const response = yield call(deleteReq, payload);
  if (response.status === 'success') {
    yield put(deleteTypeSuccess(payload));
  } else {
    yield put(deleteTypeFailed(response));
  }
}

export function* watchDeleteType() {
  yield takeLatest(DELETE_TYPE_REQUEST, deleteType);
}
export function* watchAddType() {
  yield takeLatest(ADD_TYPE_REQUEST, addType)
}
export function* watchUpdateType() {
  yield takeLatest(UPDATE_TYPE_REQUEST, updateType)
}
export function* watchGetTypes() {
  yield takeLatest(GET_TYPES_REQUEST, getTypeRequest);
}
