/**
 * @file Login sagas
 * @author Created by geekzwb on 2017/10/14.
 */
import { put, takeLatest, call } from 'redux-saga/effects';
import HTTPUtil from '../../../utils/Http';

import { LOGIN_REQUEST, LOGIN_FAILED, loginSuccess, loginFailed } from '../actions';

function login(payload) {
  return HTTPUtil.post('login', payload);
}

function* loginRequest({type, payload = {}}) {
  const response = yield call(login, payload);
  if (response.status === 'error') {
    yield put(loginFailed(response));
  } else {
    yield put(loginSuccess(response));
  }
}

export default function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
}
