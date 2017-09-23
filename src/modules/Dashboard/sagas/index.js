/**
 * Created by geekzwb on 2017/8/9.
 * What for: dashboard sagas
 */
import {put, call, take, fork} from 'redux-saga/effects';

// 被saga监听的action
import {DASHBOARD_TEST_REQUEST} from '../actions';
import {dashboardTestSuccess} from '../actions';

/**
 * 注意这里data是immutable， 要转成JSD
 * @param data
 * @returns {Promise}
 */
function getData(data) {
  // return fetch()  通常进行异步的请求数据，返回 promise
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('get data success');
    }, 2000);
  })
}

/**
 * must be function*  被fork
 * @param data
 */
function* dashboardRequest(data) {
  const response = yield call(getData, data);
  console.log('response: ', response);
  // 处理 response 逻辑， 如状态码， 数据格式验证等等。
  // and then put action, 从而调用对应的reducer， 改变store🌲
  // 需要注意的是， put之前， 获取数据要转成immutable
  yield put(dashboardTestSuccess(response));
}

/**
 * saga 监听 action
 * export saga
 */
export function* watchLoadDashboard() {
  while (true) {
    // 监听 DASHBOARD_TEST_REQUEST action by name
    yield take(DASHBOARD_TEST_REQUEST);
    // 监听后要触发的 function*
    yield fork(dashboardRequest);

    // 如果需要获取 DASHBOARD_TEST_REQUEST 的数据(create action 返回的), 如下
    //const resquestData = yield take(DASHBOARD_TEST_REQUEST); // get action ?
    //yield fork(dashboardRequest, resquestData.payload);
  }
}